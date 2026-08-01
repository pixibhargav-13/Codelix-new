const fs = require('fs');
const path = require('path');

const dir = 'c:\\Websites\\Codelix_new\\Codelix-new\\codelix-new\\src\\MyComponents';

const oldUrl = 'href="https://www.google.com/maps/place/Codelix+IT+Solutions+Pvt+Ltd/@23.0095811,72.5203036,17z"';
const newUrl = 'href="https://www.google.com/maps/place/Codelix+IT+Solutions+Pvt+Ltd/@23.009586,72.5203036,17z/data=!3m1!4b1!4m6!3m5!1s0x395e856f394696fd:0x69f60cf69bf7dd43!8m2!3d23.0095811!4d72.5228785!16s%2Fg%2F11z61zmnv5?entry=ttu&g_ep=EgoyMDI2MDcyOS4wIKXMDSoASAFQAw%3D%3D"';

function replaceInDir(currentDir) {
  const files = fs.readdirSync(currentDir);
  for (const file of files) {
    const fullPath = path.join(currentDir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      replaceInDir(fullPath);
    } else if (file.endsWith('V2.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      if (content.includes(oldUrl)) {
        content = content.replaceAll(oldUrl, newUrl);
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated maps URL in ${file}`);
      }
    }
  }
}

replaceInDir(dir);
console.log('Done');
