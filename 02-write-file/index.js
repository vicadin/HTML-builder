const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('Hey! would you like to write some text?');

rl.on('line', (input) => {
  if (input === 'exit') {
    console.log('thanks, bye!');
    rl.close();
  }

  fs.appendFile(path.join(__dirname, 'text.txt'), input + '\n', (err) => {
    if (err) throw err;
  });
});

rl.on('SIGINT', () => {
  console.log('thanks, bye!');
  rl.close();
});
