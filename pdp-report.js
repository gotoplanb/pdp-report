const os = require('os');
const fs = require('fs').promises;
const parse = require('csv-parse/lib/sync');

(async function(){
  // Read the content
  const content = await fs.readFile(`pdp-data.csv`)
  // Parse the CSV content
  const records = parse(content, {
    columns: true,
    skip_empty_lines: true
  })
  // Iterate through the records array
  records.forEach(element => {
    for (const [key, value] of Object.entries(element)) {
      console.log(`${key}: ${value}`);
    }
    console.log('-----------------')
  });

})()