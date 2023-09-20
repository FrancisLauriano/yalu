# Console readlines
Console readline with promise

## What's ReadLine Promise?
Module to read console lines in a simple way and with promises

## How install?
```sh
npm install --save readline-promises
```

## Examples
Readline
```js
// Import
const ReadLine = require('readline-promises');
// Object
const Read = new ReadLine();
// Send Question
Read.Question('What\'s your name?')
  .then((name) => {
    console.log(`Hello ${name}`);
  })
  .catch(console.error); // Error handler
```

Options
```js
// Import
const ReadLine = require('readline-promises');
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
```

Option [y/n]
```js
// Import
const ReadLine = require('readline-promises');
// Object
const Read = new ReadLine();
// Send Question
Read.KeyYN('Do you like this module?')
  .then((result) => {
    const print = result ? 'Nice! :)' : 'Oh, :(';
    console.log(print);
  })
  .catch(console.error); // Error handler
```

Concat questions
```js
// Import
const ReadLine = require('readline-promises');
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
```

Concat all methods
```js
// Import
const ReadLine = require('readline-promises');
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
```

### Julio Sansossio