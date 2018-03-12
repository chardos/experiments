const fs = require('fs');

const states = fs.createReadStream('./states.txt');

states.on('data', x => {
    console.log(x.toString());
})

// states.pipe(process.stdout)

process.stdin.on('data', (data) => {
    process.stdout.write(`\n${data.toString().trim()}\n`)
})
