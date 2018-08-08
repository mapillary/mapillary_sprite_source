/* 
 * WARN: Run this before checking in new svgs to the repository!
 * This scripts adds bounds and contains an svg within a square
 */

const fs       = require('fs');
const window   = require('svgdom');
const SVG      = require('svg.js');

const file = process.argv[2].replace(/\u001b\[.*?m/g, '')

const effs = function (filename) {
    const Svg = SVG(window);
    const draw = Svg(window.document.documentElement);
    const file = fs.readFileSync(filename, 'utf8');
    const group = draw.group()
    const imported = group.svg(file);
    const rbox = imported.rbox();
    const maxSide = Math.max(rbox.w, rbox.h) + 4;
    const g = group.rbox();
    draw.rect(maxSide, maxSide).attr({ fill: 'rgba(0, 0, 0, 0)'})
    const d = draw.rbox();
    const ox = (d.w - g.w) / 2;
    const oy = (d.h - g.h) / 2;
    group.move(ox, oy)
    const outPath = filename.split('/')
    const outName = outPath[outPath.length - 1];
    fs.writeFileSync(filename, draw.svg())
    process.exit(0)
}

effs(file)
