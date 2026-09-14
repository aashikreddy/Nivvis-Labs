const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// ---------------------------------------------------------
// CONFIGURATION
// ---------------------------------------------------------
const WEBP_QUALITY = 80;

// The 8 active UI images manually identified from component imports
const uiSources = [
  'src/images/products/image.jpg',
  'src/images/products/img1.jpg',
  'src/images/products/img13.png',
  'src/images/products/img4.jpg',
  'src/images/products/logo.jpg',
  'src/images/products/mn.jpg',
  'src/images/products/name.jpg',
  'src/images/products/names.png'
];

// Dynamically parse productsData.js to get all 107 active product images
function getActiveProductImageSources() {
  const productsDataContent = fs.readFileSync(path.join(__dirname, '../src/Products/productsData.js'), 'utf-8');
  const lines = productsDataContent.split('\n');
  const sources = [];
  
  for (const line of lines) {
    if (line.trim().startsWith('//')) continue; // skip commented imports
    const match = line.match(/import\s+[a-zA-Z0-9_]+\s+from\s+['"](\.\/productimages\/[^'"]+)['"]/);
    if (match) {
      const relativePath = match[1]; // e.g. ./productimages/antihyp/ROSUFAME 10/ROSUFAME 10_1.jpg
      const fullPath = relativePath.replace('./', 'src/Products/');
      sources.push(fullPath);
    }
  }
  return sources;
}

// ---------------------------------------------------------
// UTILS
// ---------------------------------------------------------
async function ensureDir(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

async function processImage(task, defaultWidth = null, defaultHeight = null) {
  const { src, dest, width = defaultWidth, height = defaultHeight } = task;

  const srcPath = path.resolve(process.cwd(), src);
  const destPath = path.resolve(process.cwd(), dest);

  if (!fs.existsSync(srcPath)) {
    console.error(`❌ ERROR: Source image missing: ${src}`);
    process.exit(1);
  }

  await ensureDir(destPath);

  try {
    const info = await sharp(srcPath)
      .resize({
        width: width,
        height: height,
        fit: sharp.fit.inside,
        withoutEnlargement: true
      })
      .webp({ quality: WEBP_QUALITY })
      .toFile(destPath);

    const origSize = fs.statSync(srcPath).size;
    console.log(`✅ SUCCESS: ${path.basename(src)} -> ${path.basename(dest)}`);
    console.log(`   Size: ${(origSize / 1024).toFixed(1)} KB -> ${(info.size / 1024).toFixed(1)} KB`);
    console.log(`   Dimensions: ${info.width}x${info.height}`);
  } catch (err) {
    console.error(`❌ ERROR processing ${src}:`, err);
    process.exit(1);
  }
}

// ---------------------------------------------------------
// MAIN
// ---------------------------------------------------------
async function run() {
  console.log('--- GENERATING UI DERIVATIVES ---');
  for (const src of uiSources) {
    const parsed = path.parse(src);
    const dest = `src/assets/optimized/ui/${parsed.name}.webp`;
    await processImage({ src, dest, width: 1350, height: 900 });
  }

  const productSources = getActiveProductImageSources();
  console.log(`\n--- GENERATING ${productSources.length} PRODUCT THUMBNAILS ---`);
  
  for (const src of productSources) {
    const parsed = path.parse(src);
    // Since some product images might share the same basename in different directories, 
    // it's safer to keep them flat if their names are already unique (e.g., ROSUFAME 10_1.webp).
    // The previous Phase 6.2B used `src/assets/optimized/products/BASENAME.webp`.
    const dest = `src/assets/optimized/products/${parsed.name}.webp`;
    await processImage({ src, dest }, 960, 440);
  }
  
  console.log('\n✅ PIPELINE RUN COMPLETE.');
}

run();
