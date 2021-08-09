/* jshint node: true */
let EnvironmentCore = require('./environment-core.js');

module.exports = function (environment) {
    let ENV = new EnvironmentCore(environment);

    return ENV;
};