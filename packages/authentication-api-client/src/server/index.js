// Hack for using ES6 on server

require = require("esm")(module); // eslint-disable-line no-global-assign

module.exports = require("./server.js");
