import fs from 'fs';
import path from 'path';

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('.', function(filePath) {
  if (filePath.endsWith('.jsx') && !filePath.includes('Shared')) {
    let content = fs.readFileSync(filePath, 'utf-8');
    let original = content;

    // 1. Remove openFaq and revealedFaqs
    content = content.replace(/.*const \[openFaq, setOpenFaq\] = useState.*?\n/, '');
    content = content.replace(/.*const \[revealedFaqs, setRevealedFaqs\] = useState.*?\n/, '');

    // 2. Remove GSAP FAQ accordion logic
    // We will look for: /* FAQ accordion height animation */ ... }, [openFaq]);
    // Note: Some files might not have it exactly this way, or they might have different whitespace.
    content = content.replace(/\s*\/\*\s*FAQ accordion height animation\s*\*\/[\s\S]*?}, \[openFaq\]\);/g, '');

    // 3. Remove intersection observer special case for v2-faq-item
    const observerMatch = content.match(/if \(el\.classList\.contains\("v2-faq-item"\)\) \{[\s\S]*?\} else \{([\s\S]*?)\}/);
    if (observerMatch) {
      content = content.replace(/if \(el\.classList\.contains\("v2-faq-item"\)\) \{[\s\S]*?\} else \{([\s\S]*?)\}/, `$1`);
    }

    // 4. Replace the JSX section
    // Use a regex that captures everything from <section className="..." id="faq"> to </section>
    const sectionRegex = /<section\s+className="([^"]*)"\s+id="faq"[\s\S]*?<\/section>/;
    const match = content.match(sectionRegex);
    if (match) {
      let className = match[1].replace('v2-section', '').trim();
      let replacement = `<FaqSection faqs={FAQS} ${className ? `className="${className}" ` : ''}/>`;
      content = content.replace(sectionRegex, replacement);

      // Add import
      if (!content.includes('import FaqSection')) {
        // Find last import
        const lastImportIndex = content.lastIndexOf('import ');
        const endOfLastImport = content.indexOf('\n', lastImportIndex);
        
        // Calculate relative path to Shared
        const fileDir = path.dirname(filePath);
        // Assuming MyComponents is the root of this script
        let relativePath = path.relative(fileDir, 'Shared/FaqSection');
        if (!relativePath.startsWith('.')) relativePath = './' + relativePath;
        relativePath = relativePath.replace(/\\/g, '/'); // Windows compat
        
        content = content.substring(0, endOfLastImport + 1) +
          `import FaqSection from '${relativePath}';\n` +
          content.substring(endOfLastImport + 1);
      }
    }

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf-8');
      console.log(`Updated ${filePath}`);
    }
  }
});
