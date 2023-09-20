// Import
const ReadLine = require('../index');
// Object
const Read = new ReadLine();
// Send Question
Read.KeyYN('Do you like this module?')
  .then((result) => {
    const print = result ? 'Nice! :)' : 'Oh, :(';
    console.log(print);
  })
  .catch(console.error); // Error handler
