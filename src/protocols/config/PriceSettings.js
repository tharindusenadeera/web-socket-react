// eslint-disable-next-line import/no-anonymous-default-export
export default {
    // UAT - Saudi Awal-net
    // connectionParameters: {
    //    primary: {
    //        ip: '78.93.230.36',
    //        port: '9018',
    //        secure: false // Is connection secure - true or false
    //    },
    //    secondary: {
    //        ip: '78.93.230.36',
    //        port: '9018',
    //        secure: false // Is connection secure - true or false
    //    }
    // }

    isAttemptRetry: true,
    enablePulse: true,

    // UAT - Saudi-net
    connectionParameters: {
        primary: {
            ip: 'data-sa9.mubasher.net/html5ws',
            port: '',
            secure: true // Is connection secure - true or false
        },
        secondary: {
            ip: 'data-sa9.mubasher.net/html5ws',
            port: '',
            secure: true // Is connection secure - true or false
        }
    },

    // Local
    /* *connectionParameters: {
        primary: {
            ip: '192.168.13.84',
            port: '8090',
            secure: false // Is connection secure - true or false
        },
        secondary: {
            ip: '192.168.13.84',
            port: '8090',
            secure: false // Is connection secure - true or false
        }
    },*/

    configs: {
        defaultExchange: 'KSE',
        defaultIndex: '01',
        secondaryExchanges: [],

        priceTickerConfigs: {
            tickerSymDisplayField: 'sDes',
            tickerChangeDisplayField: 'chg'
        },

        symbolSearchConfigs: {
            showSubMarket: false
        },

        customWindowTypes: {
            /* <exchange-code>: {
                include: [], // Window types to be included in user window types
                exclude: [] // Window types to be excluded from user window types
            }*/
        },

        announcementNews: {
            recentAnnouncementNewsLimit: 25
        }
    },

    urlTypes: {
        price: 'price',
        content: 'content',
        fileServer: 'fileServer',
        chart: 'chart',
        chartTopv: 'chartTopv',
        gms: 'gms',
        report: 'report',
        reportLink: 'reportLink',
        adx: 'adx',
        transMenu: 'transMenu',
        upload: 'upload',
        analysis: 'analysis',
        brokerLink: 'brokerLink',
        takeATour: 'takeATour',
        prodSub: 'prodSub',
        changePw: 'changePw',
        forgotPw: 'forgotPw'
    }
};