import appConfig from '../config/app-config';

export default (function () {
    /* *
     * Detects browser information
     * @returns {browser.name:<> , browser.version:<>}
     */

    let getBrowserInfo = function () {
        let ua = navigator.userAgent;
        let M = ua.match(/(opera|chrome|safari|firefox|msie|trident|edge(?=\/))\/?\s*((\d+\.)?(\d+\.)?(\d+\.)?(\d+\.)?(\d+))/i) || [];
        let tem, name, version;

        if ((M[1]) === 'Trident') {
            tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
            name = 'MSIE';
            version = tem[1];
        } else if (M[1] === 'Chrome' && ua.match(/\bEdge\/(\d+)/)) {
            tem = ua.match(/\bEdge\/(\d+)/);
            name = 'Edge';
            version = tem[1];
        } else {
            M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
            if ((tem = ua.match(/version\/(\d+)/i)) != null) {
                M.splice(1, 1, tem[1]);
            }
            name = M[0];
            version = M[1];
        }

        return {
            name: name,
            version: version
        };
    };

    /* *
     * Checks whether browser is connected to the network or not
     * @returns {boolean} True if network connected, false otherwise
     */
    let isNetworkConnected = function () {
        return window.navigator.onLine;
    };

    let openWindow = function (url, target) {
        let isMobile = appConfig.customisation.isMobile;

        if (isMobile && window.appGlobal.isIos) {
            window.open(url, '_blank', 'location=yes,enableViewPortScale=yes');
        } else if (isMobile && navigator && navigator.app) {
            navigator.app.loadUrl(url, {openExternal: true});
        } else {
            let trgt = target ? target : '_blank';
            window.open(url, trgt);
        }
    };

    let isSafari = function () {
        let browser = getBrowserInfo();
        return browser ? browser.name.toLowerCase() === 'safari' : false;
    };

    let isIE = function () {
        return this.getBrowserInfo().name === 'MSIE' ? true : false;
    };

    return {
        getBrowserInfo: getBrowserInfo,
        isNetworkConnected: isNetworkConnected,
        openWindow: openWindow,
        isSafari: isSafari,
        isIE: isIE
    };
})();