const fs = require('fs');
const path = require('path');
const { PDFParse } = require('pdf-parse');

async function extractPDF() {
  const pdfPath = path.join(__dirname, '..', 'public', 'catalog', 'SOTYA_Catalogue_2026_Couverture V2-14-07-2026.pdf');
  const dataBuffer = fs.readFileSync(pdfPath);
  
  const parser = new PDFParse();
  const data = await parser.loadPDF(dataBuffer);
  
  console.log('=== PDF INFO ===');
  console.log('Pages:', data.Pages ? data.Pages.length : 'N/A');
  console.log('');
  
  // Try to get all text from all pages
  if (data.Pages) {
    data.Pages.forEach((page, idx) => {
      console.log(`\n=== PAGE ${idx + 1} ===`);
      if (page.Texts) {
        page.Texts.forEach(t => {
          if (t.R) {
            t.R.forEach(r => {
              if (r.T) {
                console.log(decodeURIComponent(r.T));
              }
            });
          }
        });
      }
    });
  }
}

extractPDF().catch(console.error);
