import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIR = path.join(__dirname, 'src/MyComponents');

function walk(dir, callback) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath, callback);
    } else if (fullPath.endsWith('.jsx')) {
      callback(fullPath);
    }
  }
}

let modifiedCount = 0;

walk(DIR, (filePath) => {
  if (filePath.includes('Shared')) return;
  let content = fs.readFileSync(filePath, 'utf8');
  
  const originalContent = content;

  // Find where ScrollSentence is defined
  const funcStart = content.indexOf('function ScrollSentence({ words, tone }) {');
  if (funcStart !== -1) {
    // We need to find the matching closing brace.
    // However, it's easier to just match the well-known start and end strings.
    // The component always ends with `  );` followed by `}`.
    const endStr = '\n}\n';
    let nextEnd = content.indexOf(endStr, funcStart);
    if (nextEnd !== -1) {
       const toRemove = content.substring(funcStart, nextEnd + endStr.length);
       // Just to be sure, check if toRemove contains "cancelAnimationFrame" which is unique to it
       if (toRemove.includes('cancelAnimationFrame')) {
         content = content.replace(toRemove, '');
       }
    }
  }
  
  // Add the import if it's missing and we use it
  if (originalContent.includes('<ScrollSentence') && !content.includes('import ScrollSentence')) {
    // Find last import
    const lastImportIndex = content.lastIndexOf('import ');
    const lineEnd = content.indexOf('\n', lastImportIndex);
    
    // Relative path to Shared
    // DIR is src/MyComponents
    // So relative from filePath to src/MyComponents/Shared
    const relativePath = path.relative(path.dirname(filePath), path.join(DIR, 'Shared', 'ScrollSentence'));
    let importPath = relativePath.replace(/\\/g, '/');
    if (!importPath.startsWith('.')) {
      importPath = './' + importPath;
    }
    
    const importStatement = `\nimport ScrollSentence from '${importPath}';`;
    content = content.slice(0, lineEnd) + importStatement + content.slice(lineEnd);
  }

  // Add centered={true} if it has sd2-sentence
  if (originalContent.includes('sd2-sentence')) {
    content = content.replace(/<ScrollSentence([^>]+)>/g, (match, p1) => {
      if (!p1.includes('centered')) {
        return `<ScrollSentence${p1} centered={true} />`;
      }
      return match;
    });
  }

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    modifiedCount++;
    console.log('Updated', filePath);
  }
});

console.log('Modified', modifiedCount, 'files.');
