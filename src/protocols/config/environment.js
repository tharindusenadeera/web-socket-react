/* jshint node: true */
let EnvironmentExtended = require('./environment-extended.js');

module.exports = function (environment) {
    let ENV = new EnvironmentExtended(environment);
    ENV.contentSecurityPolicy['connect-src'] = "'self' www.google-analytics.com wss://data-sa9.mubasher.net/html5-Retail";

    if (ENV.APP.isTestMode) {
        ENV.APP.priceConnectionParameters = {
            primary: {
                "ip": "www.boursakuwait.com.kw/wsqs",
                port: '',
                secure: true
            }
        };

        ENV.contentSecurityPolicy['connect-src'] = "'self' www.google-analytics.com wss://data-sa.mubasher.net/Pro10-UAT";
    }

    return ENV;
};