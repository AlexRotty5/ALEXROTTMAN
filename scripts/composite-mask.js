const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');

// Combine sharp RGB from a high-res photo with the clean alpha from an
// ML-segmented (but lower-res, upscaled) cutout of the same photo.
const rgbPath = process.argv[2];
const maskPath = process.argv[3];
const outPath = process.argv[4];
const pad = process.argv[5] ? Number(process.argv[5]) : 10;
// Erode the mask edge slightly to avoid a light background fringe.
const ERODE = process.argv[6] ? Number(process.argv[6]) : 1;

const rgb = PNG.sync.read(fs.readFileSync(rgbPath));
const mask = PNG.sync.read(fs.readFileSync(maskPath));
const width = Math.min(rgb.width, mask.width);
const height = Math.min(rgb.height, mask.height);

const alphaAt = (x, y) => mask.data[(y * mask.width + x) * 4 + 3];

const out = new PNG({ width, height });
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const ri = (y * rgb.width + x) * 4;
    const oi = (y * width + x) * 4;
    out.data[oi] = rgb.data[ri];
    out.data[oi + 1] = rgb.data[ri + 1];
    out.data[oi + 2] = rgb.data[ri + 2];
    let a = alphaAt(x, y);
    if (ERODE > 0) {
      for (let dy = -ERODE; dy <= ERODE; dy++) {
        for (let dx = -ERODE; dx <= ERODE; dx++) {
          const nx = x + dx, ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= mask.width || ny >= mask.height) {
            a = 0;
            continue;
          }
          a = Math.min(a, alphaAt(nx, ny));
        }
      }
    }
    out.data[oi + 3] = a;
  }
}

let minX = width, minY = height, maxX = 0, maxY = 0;
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    if (out.data[(y * width + x) * 4 + 3] > 12) {
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

const cropped = new PNG({ width: cw, height: ch });
for (let y = 0; y < ch; y++) {
  for (let x = 0; x < cw; x++) {
    const si = ((y + minY) * width + (x + minX)) * 4;
    const di = (y * cw + x) * 4;
    cropped.data[di] = out.data[si];
    cropped.data[di + 1] = out.data[si + 1];
    cropped.data[di + 2] = out.data[si + 2];
    cropped.data[di + 3] = out.data[si + 3];
  }
}

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, PNG.sync.write(cropped));
console.log(`Composited ${width}x${height} -> cropped ${cw}x${ch}. Wrote ${outPath}`);
