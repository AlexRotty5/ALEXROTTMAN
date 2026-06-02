const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');

const inPath = process.argv[2];
const outPath = process.argv[3];
// Pixels brighter than this (all channels) are treated as background candidates.
const THRESHOLD = process.argv[4] ? Number(process.argv[4]) : 236;
// Soft edge band: pixels between SOFT and THRESHOLD get partial alpha.
const SOFT = process.argv[5] ? Number(process.argv[5]) : 215;
// Optional: crop bottom rows (fraction of cropped height) to trim a base halo.
const BOTTOM_TRIM = process.argv[6] ? Number(process.argv[6]) : 0;

const png = PNG.sync.read(fs.readFileSync(inPath));
const { width, height, data } = png;

const idx = (x, y) => (y * width + x) * 4;
const isBright = (x, y) => {
  const i = idx(x, y);
  return data[i] >= THRESHOLD && data[i + 1] >= THRESHOLD && data[i + 2] >= THRESHOLD;
};

// Flood fill from the borders so only the connected outer background is removed,
// preserving any light highlights inside the device.
const visited = new Uint8Array(width * height);
const stack = [];
const pushIf = (x, y) => {
  if (x < 0 || y < 0 || x >= width || y >= height) return;
  const p = y * width + x;
  if (visited[p]) return;
  visited[p] = 1;
  if (isBright(x, y)) stack.push(x, y);
};

for (let x = 0; x < width; x++) {
  pushIf(x, 0);
  pushIf(x, height - 1);
}
for (let y = 0; y < height; y++) {
  pushIf(0, y);
  pushIf(width - 1, y);
}

const bg = new Uint8Array(width * height);
while (stack.length) {
  const y = stack.pop();
  const x = stack.pop();
  bg[y * width + x] = 1;
  pushIf(x + 1, y);
  pushIf(x - 1, y);
  pushIf(x, y + 1);
  pushIf(x, y - 1);
}

let cleared = 0;
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const p = y * width + x;
    if (!bg[p]) continue;
    const i = p * 4;
    const lum = Math.min(data[i], data[i + 1], data[i + 2]);
    if (lum >= THRESHOLD) {
      data[i + 3] = 0;
      cleared++;
    } else if (lum >= SOFT) {
      // feather the soft edge
      const a = Math.round(((THRESHOLD - lum) / (THRESHOLD - SOFT)) * 255);
      data[i + 3] = Math.min(data[i + 3], a);
    }
  }
}

// Auto-crop to the bounding box of visible (non-transparent) pixels, with padding.
let minX = width, minY = height, maxX = 0, maxY = 0;
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    if (data[(y * width + x) * 4 + 3] > 8) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}
const pad = 12;
minX = Math.max(0, minX - pad);
minY = Math.max(0, minY - pad);
maxX = Math.min(width - 1, maxX + pad);
maxY = Math.min(height - 1, maxY + pad);
if (BOTTOM_TRIM > 0) {
  maxY = Math.max(minY, Math.round(maxY - (maxY - minY) * BOTTOM_TRIM));
}
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
console.log(`Cleared ${cleared} px. Cropped ${width}x${height} -> ${cw}x${ch}. Wrote ${outPath}`);
