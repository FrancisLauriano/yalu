// Import
const ReadLine = require('../index');
// Configs
const options = {
  concat: true,
};
const osOptions = [
  'windows',
  'linux',
  'mac os',
];
// Object
const Read = new ReadLine(options);
// Send Question
Read.Question('What\'s your name? ', 'name')
  .then(Read.Options('What\'s your favorite os? ', osOptions, 'os'))
  .then(Read.KeyYN('Do you like this module? ', 'like'))
  .then((data) => {
    // Get info
    const { name, os, like } = data;
    const youLike = !like ? 'not ' : '';
    // Print all info
    console.log(`Your name: ${name}`);
    console.log(`Your favorite os: ${os}`);
    console.log(`You do ${youLike}like this module`);
  })
  .catch(console.error); // Error handler
