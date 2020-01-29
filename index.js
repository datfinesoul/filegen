'use strict';
function randomWord(words) {
  const len = words.length;
  return words[Math.floor(Math.random() * len)];
}

function randomLine(words, min, max) {
  const range = max - min;
  const length = Math.floor(Math.random() * range) + min;
  return Array.from({ length }, () => randomWord(words)).join(' ');
}

function randomDoc(words, min, max, lines, maxsize, output) {
  const { createWriteStream } = require('fs');
  const writeStream = createWriteStream(output);

  let size = 0;
  for (let rownum = 0; rownum < lines; rownum++) {
    const line = `${randomLine(words, min, max)}\n`;
    if (size + line.length > maxsize) {
      break;
    }
    size += line.length;
    writeStream.write(line, 'utf8');
  }

  writeStream.end();
}

(async () => {
  console.log((new Date()).toISOString(), "start");

  const { promisify } = require('util');
  const readFile = promisify(require('fs').readFile);
  const argv = require('minimist')(process.argv.slice(2));
  console.log(argv);
  if (!(argv && argv.min && argv.max && argv.lines && argv.size && argv.input && argv.output)) {
    console.error('invalid use');
    return;
  }

  const words = (await readFile(argv.input, 'utf8')).split('\n');
  console.log("source word count", words.length);

  randomDoc(words, argv.min, argv.max, argv.lines, argv.size, argv.output)

  console.log((new Date()).toISOString(), "end");
})();
