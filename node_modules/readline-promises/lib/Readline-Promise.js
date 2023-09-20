// Imports
const rl = require('readline-sync');

class ReadLine {
  // Static methods
  // Parser message
  static _ParserMessage(msg) {
    const message = msg.trim(); // Delete spaces
    const response = `${message} `; // Add space at end
    return response;
  }
  // Constructor
  constructor(options = []) {
    // Properties
    this.options = options;
    // Configure class
    this._Configure();
    // Others
    this.questions = [];
  }
  // Private methods
  // Configuration
  _Configure() {
    // Comprobe
    if (typeof this.options !== 'object') {
      // Set error
      const error = new Error();
      error.name = 'BAD_FORMAT';
      error.message = 'Propertie must a be object';
      // Throw
      throw error;
    }
    // Config Loop
    const keys = Object.keys(this.options);
    keys.forEach((key) => {
      this[key] = this.options[key]; // Pass to class context
    });
  }
  // Parser data to response
  _Response(questionName) {
    // If define concat
    if (this.concat) {
      return this.questions;
    }
    // If not, response string
    return this.questions[questionName];
  }
  // Logic
  _Logic(message, name, func, options = null) {
    // Save
    const questionName = name || 'none';
    // Logic response
    const response = (resolve, reject) => {
      try {
        // Save question name
        this.questions[questionName] = rl[func](message, options);
        // Response with condition
        if (func === 'keyInSelect') {
          // Parser info
          const result = this.questions[questionName];
          // Response
          let res = null;
          // Comprobe invalid option
          if (result >= 0) {
            // Response name
            res = message[result];
            this.questions[questionName] = res;
          } else {
            this.questions[questionName] = 'none';
          }
        }
        resolve(this._Response(questionName)); // Response
      } catch (e) {
        reject(e); // Return error
      }
    };
    // Return
    return new Promise(response);
  }
  // Question
  Question(msg, name = null) {
    // Response
    return this._Logic(msg, name, 'question');
  }
  // Key
  KeyYN(msg, name = null) {
    // Response logic
    const response = (resolve, reject) => {
      try {
        this._Logic(msg, name, 'keyInYN')
          .then((r) => {
            // Val
            const val = name ? r[name] : r;
            // Comprobe result
            if (typeof val !== 'boolean') resolve(this.KeyYN(msg, name));
            else resolve(val); // Resolve promise
          })
          .catch(reject); // Fail method
      } catch (e) {
        reject(e); // Return error
      }
    };
    // Return
    return new Promise(response);
  }
  // Multi options
  Options(message, options, name = null) {
    return this._Logic(options, name, 'keyInSelect', message);
  }
}

module.exports = ReadLine;
