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

    const sectionRegex = /<section\s+className="([^"]*v2-cta-shell[^"]*)"[^>]*>[\s\S]*?<div\s+className="v2-cta"[^>]*>([\s\S]*?)<\/div>[\s\S]*?(?:<aside\s+className="v2-cta-visual">[\s\S]*?<CtaVisual\s*\/>[\s\S]*?<\/aside>|<CtaVisual\s*\/>)[\s\S]*?<\/section>/;
    
    let match;
    while ((match = content.match(sectionRegex)) !== null) {
      let fullClassName = match[1];
      let innerText = match[2];
      
      // We pass the className excluding the base parts CtaSection already includes
      // CtaSection has: "v2-section v2-cta-shell"
      let customClass = fullClassName
        .replace('v2-section', '')
        .replace('v2-cta-shell', '')
        .trim();
        
      let replacement = `<CtaSection${customClass ? ` className="${customClass}"` : ''}>\n        ${innerText}\n      </CtaSection>`;
      content = content.replace(sectionRegex, replacement);
    }

    if (content !== original) {
      // 1. Remove import CtaVisual from "..."
      content = content.replace(/import\s+CtaVisual\s+from\s+['"][^'"]+CtaVisual['"];?\n?/g, '');
      
      // 2. Add import CtaSection from Shared/CtaSection
      if (!content.includes('import CtaSection')) {
        const lastImportIndex = content.lastIndexOf('import ');
        const endOfLastImport = content.indexOf('\n', lastImportIndex);
        const fileDir = path.dirname(filePath);
        let relativePath = path.relative(fileDir, 'Shared/CtaSection');
        if (!relativePath.startsWith('.')) relativePath = './' + relativePath;
        relativePath = relativePath.replace(/\\/g, '/');
        
        content = content.substring(0, endOfLastImport + 1) +
          `import CtaSection from '${relativePath}';\n` +
          content.substring(endOfLastImport + 1);
      }
      
      fs.writeFileSync(filePath, content, 'utf-8');
      console.log(`Updated ${filePath}`);
    }
  }
});
