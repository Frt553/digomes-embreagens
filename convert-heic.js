const fs = require('fs');
const path = require('path');
const convert = require('heic-convert');

const dir = __dirname;
const outDir = path.join(dir, 'images');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

const files = fs.readdirSync(dir).filter(f => f.toLowerCase().endsWith('.heic'));

(async () => {
  for (const file of files) {
    const inputBuffer = fs.readFileSync(path.join(dir, file));
    try {
      const outputBuffer = await convert({
        buffer: inputBuffer,
        format: 'JPEG',
        quality: 0.85
      });
      const outName = file.replace(/\.HEIC$/i, '.jpg');
      fs.writeFileSync(path.join(outDir, outName), outputBuffer);
      console.log('Converted', file, '->', outName);
    } catch (e) {
      console.error('Failed', file, e.message);
    }
  }
})();
