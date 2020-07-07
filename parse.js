const parse = require('csv-parse/lib/sync')

// Sample CSV data 
const input = `
ReportId,SubmitterName,Number,Percent,YesNo,Scale,Text
1,Alpha,4.6,100,Yes,7,"Lorem ipsum dolor sit amet, consectetur adipiscing elit."
2,Beta,3.2,75,No,5,"Mauris porta diam quam, a rhoncus elit ullamcorper a. Etiam ut felis finibus ipsum tempor tincidunt id vel turpis."
3,Gamma,1.8,25,Yes,4,Phasellus sapien ligula.
4,Delta,5.1,0,No,0,"Donec feugiat sodales euismod. Praesent vehicula lectus sit amet vehicula commodo. Proin vel varius urna. Nullam tempus vel tellus eu scelerisque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer laoreet tempus diam. Etiam neque turpis, sollicitudin sed dignissim sit amet, hendrerit pharetra risus. Nunc egestas, quam vitae imperdiet vehicula, risus ex suscipit ex, id mollis dolor dolor a enim. Duis tempor felis tortor, eget efficitur justo maximus a. Suspendisse non rhoncus arcu. Cras ac ligula eget odio ullamcorper fermentum ac non elit. Nam non est mollis nisl pulvinar rutrum et ut massa."
`

// Parse from CSV into an array of objects
const records = parse(input, {
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

