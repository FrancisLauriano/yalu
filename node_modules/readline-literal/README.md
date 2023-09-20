readline-literal
================

Install
-------

`npm install --save readline-literal`

Some information
----------------

As of version 1.3 questions that are identical only get answered once.

There was a bug in before version 1.3 where the template tag could only be used once. This is now fixed.

Example 1
---------

```javascript
//Notice the call right after the require.
const rll = require('readline-literal')();

rll`Hello ${'who? '}!`.then((result)=>{
    //You will be prompted with "who? "
    //result is the interpolated string with all of your input.
    console.log(result);
}, (err) => {
    console.log(err)
});
```

Example 2 - compile
-------------------

`src.json`

```json
{
    "val": "${'thing? '}"
}
```

Using the `fs-promise` module:

```javascript
const rll = require('readline-literal')();
const fsp = require('fs-promise');


fsp.readFile('src.json', 'utf8').then((text)=>{
    return rll.compile(text);
})
.then((result)=>{
    // result =
    // '{
    //     "val": "Something you wrote."
    // }'
    console.log(result)
})
.catch((err)=>console.log(err));
```

Example 3 - Custom Query
------------------------

```javascript
const rll = require('readline-literal')();
const list = new rll.Query((answer)=>{
    return answer.split(',').map((item)=>{
        return '- ' + item.trim();
    }).join('\n');
});

rll`Items
${list.ask('Items: ')}
`.then((result)=>{
    console.log(result);
}, (err) => {
    console.log(err)
});
/*Result equals:
Items
- one
- two
*/
```

About
-----

**readline-literal** takes a javascript string literal. The *values* of the literal are used to create questions for readline output in the command-line.

API
---

createReadlineLiteral(undefined || options) -> readlineLiteral function
=======================================================================

The module `readline-literal` is a function you should call to get a readlineLiteral function.

`createReadlineLiteral` is the function you get when importing this module.

`createReadlineLiteral` can be passed an `options` object.

The options object can have these fields:

###options.interface = (An custom instance of readline)

When set this instance of readline will be used instead of the internal one.

### options.map(answer)

If set `options.map` will run on every answer so you can change answers as they are input.

Return the change from `options.map`.

readlineLiteral(template literal) -> Promise
--------------------------------------------

Process a template literal, and use it's interpolated values as questions to readline.

Call `readlineLiteral` as a javascript template tag.

The promise returned resolves to the interpolated string.

### Template values

There are two types of values you can put in the template literal.

1.	The values in the template literal passed to `readlineLiteral` can be a string that is turned into a question.
2.	The values can also be an array of length 2 with the value at index zero being the string that is turned into a question, and the value at index 1 being a default value.

So you can do this for no default:

```javascript
rll`Hello ${'who? '}!`.then((result)=>{console.log(result)});
```

or this to have a default value:

```javascript
rll`Hello ${['who? ', 'world']}!`.then((result)=>{console.log(result)});
```

readlineLiteral.compile(text) -> Promise
----------------------------------------

Compile some text that looks like a *template literal*, and **start readline right away**.

Warning
-------

`readlineLiteral` will quit right away (on Unix) if there is a `Control+c` key sequence input.

If a readline process is quit early then the `Promise` returned by `readlineLiteral` will be rejected with a value of `null`.
