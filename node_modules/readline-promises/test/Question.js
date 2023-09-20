// Import
const ReadLine = require('../index');
// Object
const Read = new ReadLine();
// Send Question
Read.Question('What\'s your name?')
  .then((name) => {
    console.log(`Hello ${name}`);
  })
  .catch(console.error); // Error handler
