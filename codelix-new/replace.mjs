import fs from 'fs';
import path from 'path';

const srcDir = 'c:/Websites/Codelix_new/Codelix-new/codelix-new/src/MyComponents';

function walkDir(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function (file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walkDir(file));
    } else {
      if (file.endsWith('.jsx')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walkDir(srcDir);
let changedCount = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');

  if (content.includes('Sales@codelixitsolutions.com')) {
    content = content.replace(/Sales@codelixitsolutions\.com/g, 'sales@codelixitsolutions.com');
    fs.writeFileSync(file, content, 'utf8');
    changedCount++;
    console.log("Updated: " + file);
  }
}

console.log("Total files updated: " + changedCount);
