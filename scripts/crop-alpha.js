const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');

// Crop a transparent PNG to the bounding box of its visible pixels (+ padding).
const inPath = process.argv[2];
const outPath = process.argv[3];
const pad = process.argv[4] ? Number(process.argv[4]) : 10;

const png = PNG.sync.read(fs.readFileSync(inPath));
const { width, height, data } = png;

let minX = width, minY = height, maxX = 0, maxY = 0;
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    if (data[(y * width + x) * 4 + 3] > 12) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}
minX = Math.max(0, minX - pad);
minY = Math.max(0, minY - pad);
maxX = Math.min(width - 1, maxX + pad);
maxY = Math.min(height - 1, maxY + pad);
const cw = maxX - minX + 1;
const ch = maxY - minY + 1;

const out = new PNG({ width: cw, height: ch });
for (let y = 0; y < ch; y++) {
  for (let x = 0; x < cw; x++) {
    const si = ((y + minY) * width + (x + minX)) * 4;
    const di = (y * cw + x) * 4;
    out.data[di] = data[si];
    out.data[di + 1] = data[si + 1];
    out.data[di + 2] = data[si + 2];
    out.data[di + 3] = data[si + 3];
  }
}
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, PNG.sync.write(out));
console.log(`Cropped ${width}x${height} -> ${cw}x${ch}. Wrote ${outPath}`);
