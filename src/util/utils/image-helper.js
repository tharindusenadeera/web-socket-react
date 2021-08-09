import utils from '../utils/utils';

export default (function () {
    let getImage = function (d) {
        let html = '';

        try {
            let o = [], count = 0, str;

            for (let i = 0; i < d.length; i = i + 2) {
                o[count] = parseInt(d.substring(i, i + 2), 16);
                count++;
            }

            str = String.fromCharCode.apply(null, o);
            html = '<img src="data:image/png;base64,' + btoa(str).replace(/.{76}(?=.)/g, '$&\n') + '">';
        } catch (x) {
            utils.logger.logError('Error in image converting : ' + x);
        }

        return html;
    };

    return {
        getImage: getImage
    };
})();