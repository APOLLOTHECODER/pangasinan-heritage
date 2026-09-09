const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const edge = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const chrome = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const browser = fs.existsSync(chrome) ? chrome : edge;

const tempDir = 'C:\\Users\\Clark\\AppData\\Local\\Temp';

function render(htmlPath, outPaths) {
  const tempPdf = path.join(tempDir, 'deliv_' + Date.now() + '.pdf');
  const fileUrl = 'file:///' + path.resolve(htmlPath).replace(/\\/g, '/');
  
  console.log('Rendering:', fileUrl, '->', tempPdf);
  const res = spawnSync(browser, [
    '--headless',
    '--disable-gpu',
    '--no-sandbox',
    '--no-pdf-header-footer',
    `--print-to-pdf=${tempPdf}`,
    fileUrl,
  ], { encoding: 'utf-8' });

  if (res.error) {
    console.error('Spawn error:', res.error);
  }
  if (res.stderr) {
    console.log('Stderr:', res.stderr.trim());
  }

  // Wait up to 3 seconds if needed for file lock release
  let exists = false;
  for (let i = 0; i < 30; i++) {
    if (fs.existsSync(tempPdf)) {
      exists = true;
      break;
    }
    const start = Date.now();
    while (Date.now() - start < 100) {}
  }

  if (!exists) {
    console.error('Failed to create PDF at', tempPdf);
    return false;
  }

  const data = fs.readFileSync(tempPdf);
  console.log('PDF generated successfully, size:', data.length);

  for (const out of outPaths) {
    const dir = path.dirname(out);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(out, data);
    console.log('Saved to:', out, '(', data.length, 'bytes)');
  }

  try {
    fs.unlinkSync(tempPdf);
  } catch (e) {}

  return true;
}

const success1 = render('report/Framework-Selection-Report.html', [
  'report/Framework-Selection-Report.pdf',
  'report/framework-selection-report.pdf',
]);

const success2 = render('documentation/Atomic-Design-System-Manual.html', [
  'documentation/Atomic-Design-System-Manual.pdf',
  'documentation/atomic-design-system-manual.pdf',
]);

console.log('Done. Overall success:', success1 && success2);

