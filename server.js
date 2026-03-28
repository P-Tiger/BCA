const inputDir = './scales';
const outputDir = './output';

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function resizeImage(inputPath, outputPath, options = {}) {
  const {
    width = 800,
    height = null, // giữ tỉ lệ nếu null
    quality = 80,
    format = 'jpeg', // jpeg | png | webp
  } = options;

  try {
    let transformer = sharp(inputPath).resize(width, height);

    if (format === 'jpeg') {
      transformer = transformer.jpeg({ quality });
    } else if (format === 'png') {
      transformer = transformer.png({ quality });
    } else if (format === 'webp') {
      transformer = transformer.webp({ quality });
    }

    await transformer.toFile(outputPath);

    console.log(`✅ Done: ${outputPath}`);
  } catch (err) {
    console.error('❌ Error:', err);
  }
}

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

fs.readdirSync(inputDir).forEach((file) => {
  const inputPath = path.join(inputDir, file);
  const outputPath = path.join(outputDir, file);

  resizeImage(inputPath, outputPath, {
    width: 800,
    quality: 90,
    format: 'webp',
  });
});
