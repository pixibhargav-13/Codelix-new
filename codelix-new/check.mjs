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
let needingUpdate = [];

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    
    let salesIndex = content.indexOf('<h5>For Sales</h5>');
    let jobsIndex = content.indexOf('<h5>Looking For Jobs</h5>');
    
    if (salesIndex !== -1 && jobsIndex !== -1) {
        if (salesIndex < jobsIndex) {
            needingUpdate.push(file);
        }
    }
}

console.log("Files needing update (For Sales before Looking For Jobs):");
console.log(needingUpdate.join('\n'));
