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

    const searchBlock = `          <div className="v2-footer-card">
            <h5>For Sales</h5>
            <a className="v2-footer-card-strong" href="mailto:Sales@codelixitsolutions.com">
              Sales@codelixitsolutions.com
            </a>
          </div>
          <div className="v2-footer-card">
            <h5>HR</h5>
            <a className="v2-footer-card-strong" href="mailto:hr@codelixitsolutions.com">
              hr@codelixitsolutions.com
            </a>
          </div>
          <div className="v2-footer-card">
            <h5>General</h5>
            <a className="v2-footer-card-strong" href="mailto:info@codelixitsolutions.com">
              info@codelixitsolutions.com
            </a>
          </div>
          <div className="v2-footer-card">
            <h5>Looking For Jobs</h5>
            <a className="v2-footer-card-strong" href="/careers-v2">View openings →</a>
          </div>`;

    const replaceBlock = `          <div className="v2-footer-card">
            <h5>Looking For Jobs</h5>
            <a className="v2-footer-card-strong" href="/careers-v2">View openings →</a>
          </div>
          <div className="v2-footer-card">
            <h5>HR</h5>
            <a className="v2-footer-card-strong" href="mailto:hr@codelixitsolutions.com">
              hr@codelixitsolutions.com
            </a>
          </div>
          <div className="v2-footer-card">
            <h5>General</h5>
            <a className="v2-footer-card-strong" href="mailto:info@codelixitsolutions.com">
              info@codelixitsolutions.com
            </a>
          </div>
          <div className="v2-footer-card">
            <h5>For Sales</h5>
            <a className="v2-footer-card-strong" href="mailto:Sales@codelixitsolutions.com">
              Sales@codelixitsolutions.com
            </a>
          </div>`;

    if (content.includes(searchBlock)) {
        content = content.replace(searchBlock, replaceBlock);
        fs.writeFileSync(file, content, 'utf8');
        changedCount++;
        console.log("Updated: " + file);
    }
}

console.log("Total files updated with exact match: " + changedCount);
