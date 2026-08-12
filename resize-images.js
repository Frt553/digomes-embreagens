const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const srcDir = path.join(__dirname, 'images');
const outDir = path.join(__dirname, 'images', 'web');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

// map original -> semantic name, orientation crop hint
const map = {
  'IMG_7979.jpg': 'mecanico-troca-embreagem-belo-horizonte',
  'IMG_7984.jpg': 'servico-suspensao-cambio-oficina-bh',
  'IMG_7972.jpg': 'tecnico-manutencao-embreagem-graca-bh',
  'IMG_8014.jpg': 'recepcao-oficina-di-gomes-embreagens',
  'IMG_7959.jpg': 'kit-embreagem-luk-nova',
  'IMG_7948.jpg': 'kit-embreagem-valeo-nova',
  'IMG_7952.jpg': 'disco-plato-embreagem-original',
  'IMG_7976.jpg': 'estoque-platos-embreagem-bh',
  'IMG_7991.jpg': 'pecas-cambio-desmontado-revisao',
  'IMG_7969.jpg': 'fachada-patio-oficina-di-gomes'
};

const sizes = [
  { suffix: '-lg', width: 1600 },
  { suffix: '-md', width: 900 },
  { suffix: '-sm', width: 480 }
];

(async () => {
  for (const [orig, name] of Object.entries(map)) {
    const inputPath = path.join(srcDir, orig);
    if (!fs.existsSync(inputPath)) { console.warn('missing', orig); continue; }
    for (const size of sizes) {
      const jpgOut = path.join(outDir, `${name}${size.suffix}.jpg`);
      const webpOut = path.join(outDir, `${name}${size.suffix}.webp`);
      await sharp(inputPath).rotate().resize({ width: size.width }).jpeg({ quality: 78, mozjpeg: true }).toFile(jpgOut);
      await sharp(inputPath).rotate().resize({ width: size.width }).webp({ quality: 72 }).toFile(webpOut);
      console.log('done', jpgOut);
    }
  }
})();
