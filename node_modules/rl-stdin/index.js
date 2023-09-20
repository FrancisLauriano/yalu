module.exports = (() => new Promise((resolve) => {
  var data = [];
  require('readline')
  .createInterface({input: process.stdin})
  .on('line', (line) => data.push(line))
  .on('close', () => data.length > 0 ? resolve(data.join('\n') + '\n') : resolve(''));
}))();
