import fs from 'fs';
import path from 'path';

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('MyComponents', function(filePath) {
  if (filePath.endsWith('.jsx')) {
    let content = fs.readFileSync(filePath, 'utf-8');
    let original = content;

    // Change import to testimonialsData
    content = content.replace(/import\s+\{\s*STATIC_TESTIMONIALS\s*\}\s+from\s+['"][^'"]+staticTestimonials['"];?/g, 'import { STATIC_TESTIMONIALS } from "../../data/testimonialsData";');

    // For HomepageV2: remove inline const STATIC_TESTIMONIALS = [ ... ];
    const inlineStaticTestimonialsRegex = /\/\*[\s\S]*?\*\/\s*const STATIC_TESTIMONIALS = \[[\s\S]*?\];/;
    if (inlineStaticTestimonialsRegex.test(content)) {
      content = content.replace(inlineStaticTestimonialsRegex, '');
      if (!content.includes('import { STATIC_TESTIMONIALS }')) {
        let relPath = '../../data/testimonialsData';
        if (filePath.includes('HomepageV2')) {
          relPath = '../data/testimonialsData'; // one level less? HomepageV2 is inside MyComponents
        }
        // Let's dynamically calculate
        const fileDir = path.dirname(filePath);
        let relativePath = path.relative(fileDir, 'data/testimonialsData');
        relativePath = relativePath.replace(/\\/g, '/');
        if (!relativePath.startsWith('.')) relativePath = './' + relativePath;

        content = `import { STATIC_TESTIMONIALS } from '${relativePath}';\n` + content;
      }
    }

    // For TeamV2 and AboutV2: remove inline const STATIC_QUOTE = [ ... ];
    const inlineStaticQuoteRegex = /\/\*[\s\S]*?\*\/\s*const STATIC_QUOTE = \[[\s\S]*?\];/;
    if (inlineStaticQuoteRegex.test(content)) {
      content = content.replace(inlineStaticQuoteRegex, '');
      content = content.replace(/STATIC_QUOTE/g, 'STATIC_TESTIMONIALS');
      if (!content.includes('import { STATIC_TESTIMONIALS }')) {
        const fileDir = path.dirname(filePath);
        let relativePath = path.relative(fileDir, 'data/testimonialsData');
        relativePath = relativePath.replace(/\\/g, '/');
        if (!relativePath.startsWith('.')) relativePath = './' + relativePath;

        content = `import { STATIC_TESTIMONIALS } from '${relativePath}';\n` + content;
      }
    }

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf-8');
      console.log('Updated ' + filePath);
    }
  }
});
