const fs = require('fs');

const states = fs.createReadStream('./states.txt');

states.on('data', x => {
    console.log(x.toString());
    console.log('x');
})
// states.pipe(process.stdout)
