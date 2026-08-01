const fs = require('fs');
const path = require('path');

const dir = 'c:\\Websites\\Codelix_new\\Codelix-new\\codelix-new\\src\\MyComponents';

function replaceInDir(currentDir) {
  const files = fs.readdirSync(currentDir);
  for (const file of files) {
    const fullPath = path.join(currentDir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      replaceInDir(fullPath);
    } else if (file.endsWith('V2.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('v2-footer-keywords')) {
        let changed = false;
        
        const targetService = `<span className="v2-footer-keyword" key={i}>{k}</span>`;
        const replService = `<a href={k.path} className="v2-footer-keyword" key={i}>{k.label}</a>`;
        
        if (content.includes(targetService)) {
          content = content.replaceAll(targetService, replService);
          changed = true;
        }

        if (changed) {
          fs.writeFileSync(fullPath, content, 'utf8');
          console.log(`Updated ${file}`);
        }
      }
    }
  }
}

replaceInDir(dir);
console.log('Done');
