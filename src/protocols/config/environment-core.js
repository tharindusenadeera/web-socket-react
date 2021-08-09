module.exports = function environmentCore(environment) {
    let ENV = null;


    if (process.FIRST_EMBER_ENV) {
        ENV = process.FIRST_EMBER_ENV;
    } else {
        ENV = {
            modulePrefix: 'universal-app',
            environment: environment,
            baseURL: '/',
            locationType: 'none',

            EmberENV: {
                FEATURES: {
                    // Here you can enable experimental features on an ember canary build  // 31.222.133.25
                    // e.g. 'with-controller': true  // data-sa9.mubasher.net
                }
            },

            contentSecurityPolicy: {
                'default-src': "'none'",
                'script-src': "'self' 'unsafe-inline' 'unsafe-eval' www.google-analytics.com",
                'font-src': "'self' data: use.typekit.net fonts.gstatic.com",
                'img-src': "'self' data: image/png www.google-analytics.com",
                'connect-src': "'self' www.google-analytics.com wss://data-sa9.mubasher.net/html5ws",
                'style-src': "'self' 'unsafe-inline' http://fonts.googleapis.com",
                'frame-src': "'self' http://dfnnet.directfn.com/ESTORERIA/Agreement/en/EULA.htm"
            },

            APP: {
                // Here you can pass flags/options to your application instance
                // when it is created
            }
        };
    }

    if (environment === 'automation') {
        ENV.environment = 'production';
        ENV.APP.isTestMode = true;

        // ENV.APP.LOG_RESOLVER = true;
        // ENV.APP.LOG_ACTIVE_GENERATION = true;
        // ENV.APP.LOG_TRANSITIONS = true;
        // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
        // ENV.APP.LOG_VIEW_LOOKUPS = true;
    }

    if (environment === 'development') {
        ENV.APP.isTestMode = true;

        // ENV.APP.LOG_TRANSITIONS = true;
        // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
        // ENV.APP.LOG_VIEW_LOOKUPS = true;
    }

    if (environment === 'test') {
        // Testem prefers this...
        ENV.baseURL = '/';
        ENV.locationType = 'none';

        // keep test console output quieter
        ENV.APP.LOG_ACTIVE_GENERATION = false;
        ENV.APP.LOG_VIEW_LOOKUPS = false;

        ENV.APP.rootElement = '#ember-testing';
    }

    if (environment === 'production') {
        // Here you can set production specific configurations
    }

    if (ENV.APP.isTestMode) {
        ENV.APP.priceConnectionParameters = {
            primary: {
                ip: 'data-sa9.mubasher.net/html5ws',
                port: '',
                secure: true
            }
        };

        ENV.contentSecurityPolicy['connect-src'] = "'self' www.google-analytics.com wss://data-sa9.mubasher.net/html5ws";
    }

    return ENV;
};