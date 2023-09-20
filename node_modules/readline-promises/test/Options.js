// Import
const ReadLine = require('../index');
// Object
const Read = new ReadLine();
// Options
const options = [
  'windows',
  'linux',
  'mac os',
];
// Send Question
Read.Options('What\'s your favorite os?', options)
  .then((name) => {
    console.log(`Your select: ${name}`);
  })
  .catch(console.error); // Error handler
