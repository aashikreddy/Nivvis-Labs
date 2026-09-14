const fs = require('fs');
const content = fs.readFileSync('src/Products/productsData.js', 'utf8');

// 1. Find all JPG imports and their names
const jpgImports = [];
const importRegex = /^import\s+([a-zA-Z0-9_]+)\s+from\s+['"](\.\/productimages\/[^'"]+)['"];/gm;
let match;
while ((match = importRegex.exec(content)) !== null) {
  jpgImports.push({ varName: match[1], path: match[2] });
}

console.log('Found ' + jpgImports.length + ' JPG imports');

// 2. Map WebPs
let newImports = '';
jpgImports.forEach(imp => {
  // We want to generate the WebP import line if it doesn't exist
  // e.g. import tTrio50_2_thumb from '../assets/optimized/products/TELSYDAY TRIO 50_2.webp';
  // The WebP filename is the same as the JPG basename but with .webp extension.
  const pathParts = imp.path.split('/');
  let filename = pathParts.pop();
  filename = filename.replace(/\.jpg$|\.png$/, '.webp');
  
  // check if this thumb is already imported
  const expectedVar = imp.varName + '_thumb';
  const expectedImport = `import ${expectedVar} from '../assets/optimized/products/${filename}';`;
  if (!content.includes(expectedImport)) {
    newImports += expectedImport + '\n';
  }
});

console.log('Need to add ' + newImports.split('\n').filter(l=>l).length + ' imports');

// 3. Rewrite gallery array
let newContent = content;

if (newImports.length > 0) {
  // Inject imports after the last import of optimized products
  const lastThumbImportIdx = newContent.lastIndexOf(`import `); 
  // actually let's just put it before "export const categories"
  newContent = newContent.replace('export const categories = [', newImports + '\nexport const categories = [');
}

// Rewrite gallery: [var1, var2] -> gallery: [ { optimized: var1_thumb, original: var1 }, ... ]
const galleryRegex = /gallery:\s*\[([^\]]+)\]/g;
newContent = newContent.replace(galleryRegex, (match, arrayContent) => {
  const vars = arrayContent.split(',').map(v => v.trim()).filter(v => v);
  const newArrayContent = vars.map(v => {
    return `{ optimized: ${v}_thumb, original: ${v} }`;
  }).join(', ');
  return `gallery: [\n          ${newArrayContent}\n        ]`;
});

fs.writeFileSync('src/Products/productsData.js', newContent);
console.log('Done modifying productsData.js');
