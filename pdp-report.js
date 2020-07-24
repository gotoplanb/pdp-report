const os = require('os');
const fspdf = require('fs');
const fs = require('fs').promises;
const parse = require('csv-parse/lib/sync');
const PDFDocument = require('pdfkit');
const now = Date.now();

const breaks =    [true, true, false, false, false, false, false, false, false, false, false, false, true, false];
const verticals = [100,  100,  150,  200,  250,  300,  350,  400,  450,  500,  550,  600,  100,  150];

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
    
    const reportId = record['ReportId']

    // Counter to know which column/index to check for breaks and vertical position
    let i = 0;

    // Create a document and pipe output
    const doc = new PDFDocument;
    doc.pipe(fspdf.createWriteStream(`output/pdp-report-${reportId}.pdf`));

    // Example output
    doc.fontSize(14)
        .text('Plastics Disclosure Project', 100, 100)
        .text('Report Format v0.0.1', 100, 200)
        .text(`Generated at ${now}`, 100, 300);
    doc.moveTo(100, 400)
        .lineTo(400, 400)
        .lineTo(400, 500)
        .lineTo(100, 500)
        .fill("#FF3300");

    // Real keys
    for (const [key, value] of Object.entries(record)) {
      // console.log(`${key}: ${value}`);
      // console.log(i)
      if (breaks[i] == true) {
        doc.addPage()
          .fontSize(14)
          .text(`${key}: ${value}`, 100, verticals[i]);
      } else {
        doc.text(`${key}: ${value}`, 100, verticals[i]);
      };
      i += 1;
    }

    doc.end();
    // console.log("\n\n");

  });

})()