// Import
const ReadLine = require('../index');
// Options
const options = {
  concat: true,
};
// Object
const Read = new ReadLine(options);
// Send Question
Read.Question('What\'s your name?', 'name')
  .then(Read.Question('What\'s your lastname?', 'lastname'))
  .then((data) => {
    console.log(`Hello ${data.name} ${data.lastname}`);
  })
  .catch(console.error); // Error handler
