const os = require('os');
const fspdf = require('fs');
const fs = require('fs').promises;
const parse = require('csv-parse/lib/sync');
const PDFDocument = require('pdfkit');

(async function(){
  // Read the content
  const content = await fs.readFile(`pdp-data.csv`)
  // Parse the CSV content
  const records = parse(content, {
    columns: true,
    skip_empty_lines: true
  })
  // Iterate through the records array
  records.forEach(record => {
    
    // Create a document and pipe output
    const doc = new PDFDocument;
    doc.pipe(fspdf.createWriteStream(`output/pdp-report.pdf`));

    // Example output
    doc.fontSize(25)
        .text('foo', 100, 100)
        .text('bar', 100, 200)
        .text('baz', 100, 300);
        
    doc.addPage();
    doc.moveTo(100, 100)
        .lineTo(400, 100)
        .lineTo(400, 200)
        .lineTo(100, 200)
        .fill("#FF3300");

    // Real keys
    for (const [key, value] of Object.entries(record)) {
      console.log(`${key}: ${value}`);
      doc.addPage()
          .fontSize(25)
          .text(`${key}: ${value}`, 100, 100);
    }

    doc.end();
    console.log("\n\n");

  });

})()