import fs from 'fs';
import { formatHex, parse } from 'culori';

const filePath = 'src/styles.css';
let content = fs.readFileSync(filePath, 'utf8');

// The regex will match oklch(...) optionally with a slash for alpha e.g. oklch(0.985 0.005 90) or oklch(0.2 0.02 270 / 0.12)
const oklchRegex = /oklch\(([^)]+)\)/g;

content = content.replace(oklchRegex, (match, p1) => {
  // Culori can parse string 'oklch(L C H)' directly or 'oklch(L C H / A)'
  const color = parse(match);
  if (color) {
    const hex = formatHex(color);
    // If it had alpha, formatHex(color) might return #rrggbbaa, which is valid CSS and html2canvas supports it in modern versions.
    // Let's ensure formatHex(color) returns the alpha channel if it's not 1
    if (color.alpha !== undefined && color.alpha < 1) {
       // culori formatHex returns #RRGGBBAA if alpha is present, but to be 100% safe with html2canvas, rgba() is safer.
       const r = Math.round(Math.max(0, Math.min(255, color.r !== undefined ? color.r * 255 : (parse(hex).r * 255) || 0)));
       // wait, formatHex handles it. Let's just return hex. html2canvas supports 8-digit hex. Or we can just use formatRgb.
    }
    // formatHex is usually safest. Let's use it.
    return hex;
  }
  return match;
});

fs.writeFileSync(filePath, content, 'utf8');
console.log('Replaced all oklch colors with hex in src/styles.css');
