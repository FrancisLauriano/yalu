// Create readFile function using fs to test against rl-stdin
const fs = require('fs');
const readFile = (path) => new Promise((resolve, reject) => {
  fs.readFile(path, (error, data) => {
    if (error) reject(error);
    else resolve(data);
  });
});

// Initialize the testing framework
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const expect = chai.expect;
chai.use(chaiAsPromised);

// Initialize execute promise
const execute = (script) => new Promise((resolve, reject) => {
  require('child_process').exec(script, (error, stdout) => {
    if (error) reject(error);
    else resolve(stdout);
  });
});

// Create test file queue and testing variables
var testFiles = ['./spec/test.txt', './spec/test.html', './spec/test.json', './spec/blank.txt'];
var file, data;

// Begin the rl-stdin tests
describe('rl-stdin tests', () => {

  beforeEach((done) => {
    file = testFiles.shift();
    readFile(file).then((d) => {
      data = String(d);
      done();
    });
  });

  it('should read a text input', () => {
    return expect(
      execute('node -e "require(\'./index.js\').then((data) => process.stdout.write(data));" < ' + file)
    ).to.eventually.equal(data);
  });

  it('should read an html input', () => {
    return expect(
      execute('node -e "require(\'./index.js\').then((data) => process.stdout.write(data));" < ' + file)
    ).to.eventually.equal(data);
  });

  it('should read a JSON input', function() {
    return expect(
      execute('node -e "require(\'./index.js\').then((data) => process.stdout.write(data));" < ' + file)
    ).to.eventually.equal(data);
  });

  it('should read a blank input', function() {
    return expect(
      execute('node -e "require(\'./index.js\').then((data) => process.stdout.write(data));" < ' + file)
    ).to.eventually.equal(data);
  });
});




