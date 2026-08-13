import fs from 'fs';
let code = fs.readFileSync('src/App.jsx', 'utf8');
code = code.replace(/const (\w+)\s*=\s*lazy\(\(\)\s*=>\s*import\((['"].*?['"])\)\);/g, 'import $1 from $2;');
fs.writeFileSync('src/App.server.jsx', code);
