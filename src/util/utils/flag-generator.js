import appConfig from '../../protocols/config/AppConfig';

export default (function () {
    let isFlagGenerated = false;
    let countryFlagConstants = ['lk', 'us', 'de', 'tr', 'kw', 'sa', 'bh', 'om', 'eg', 'qa', 'bd', 'ae', 'uk', 'tn', 'ma', 'jo'];
    let scaleValue = appConfig.customisation.isMobile ? 0.6 : 0.5;

    let countryFlags = {
        'af': {column: 1, row: 1},
        'al': {column: 2, row: 1},
        'dz': {column: 3, row: 1},
        'ad': {column: 4, row: 1},
        'ao': {column: 5, row: 1},
        'ag': {column: 6, row: 1},
        'ar': {column: 7, row: 1},
        'am': {column: 8, row: 1},
        'au': {column: 9, row: 1},
        'at': {column: 10, row: 1},
        'az': {column: 11, row: 1},
        'bs': {column: 12, row: 1},
        'bh': {column: 13, row: 1},
        'bd': {column: 14, row: 1},
        'bb': {column: 15, row: 1},
        'by': {column: 16, row: 1},
        'be': {column: 17, row: 1},
        'bz': {column: 18, row: 1},
        'bj': {column: 19, row: 1},
        'bt': {column: 20, row: 1},

        'bo': {column: 1, row: 2},
        'ba': {column: 2, row: 2},
        'bw': {column: 3, row: 2},
        'br': {column: 4, row: 2},
        'bn': {column: 5, row: 2},
        'bg': {column: 6, row: 2},
        'bf': {column: 7, row: 2},
        'mm': {column: 8, row: 2},
        'bi': {column: 9, row: 2},
        'kh': {column: 10, row: 2},
        'cm': {column: 11, row: 2},
        'ca': {column: 12, row: 2},
        'cv': {column: 13, row: 2},
        'cf': {column: 14, row: 2},
        'td': {column: 15, row: 2},
        'cl': {column: 16, row: 2},
        'cn': {column: 17, row: 2},
        'co': {column: 18, row: 2},
        'km': {column: 19, row: 2},
        'cd': {column: 20, row: 2},

        'cg': {column: 1, row: 3},
        'cr': {column: 2, row: 3},
        'ci': {column: 3, row: 3},
        'hr': {column: 4, row: 3},
        'cu': {column: 5, row: 3},
        'cy': {column: 6, row: 3},
        'cz': {column: 7, row: 3},
        'dk': {column: 8, row: 3},
        'dj': {column: 9, row: 3},
        'dm': {column: 10, row: 3},
        'do': {column: 11, row: 3},
        'll': {column: 12, row: 3}, // Dummy country code
        'ec': {column: 13, row: 3},
        'eg': {column: 14, row: 3},
        'sv': {column: 15, row: 3},
        'gq': {column: 16, row: 3},
        'er': {column: 17, row: 3},
        'ee': {column: 18, row: 3},
        'et': {column: 19, row: 3},
        'fj': {column: 20, row: 3},

        'fi': {column: 1, row: 4},
        'fr': {column: 2, row: 4},
        'ga': {column: 3, row: 4},
        'gm': {column: 4, row: 4},
        'ge': {column: 5, row: 4},
        'de': {column: 6, row: 4},
        'gh': {column: 7, row: 4},
        'gr': {column: 8, row: 4},
        'gd': {column: 9, row: 4},
        'gt': {column: 10, row: 4},
        'gn': {column: 11, row: 4},
        'gw': {column: 12, row: 4},
        'gy': {column: 13, row: 4},
        'ht': {column: 14, row: 4},
        'hn': {column: 15, row: 4},
        'hu': {column: 16, row: 4},
        'is': {column: 17, row: 4},
        'in': {column: 18, row: 4},
        'id': {column: 19, row: 4},
        'ir': {column: 20, row: 4},

        'iq': {column: 1, row: 5},
        'ie': {column: 2, row: 5},
        'il': {column: 3, row: 5},
        'it': {column: 4, row: 5},
        'jm': {column: 5, row: 5},
        'jp': {column: 6, row: 5},
        'jo': {column: 7, row: 5},
        'kz': {column: 8, row: 5},
        'ke': {column: 9, row: 5},
        'kr': {column: 10, row: 5},
        'kp': {column: 11, row: 5},
        'kw': {column: 12, row: 5},
        'kg': {column: 13, row: 5},
        'la': {column: 14, row: 5},
        'lv': {column: 15, row: 5},
        'lb': {column: 16, row: 5},
        'ls': {column: 17, row: 5},
        'lr': {column: 18, row: 5},
        'ly': {column: 19, row: 5},
        'li': {column: 20, row: 5},

        'lt': {column: 1, row: 6},
        'lu': {column: 2, row: 6},
        'mk': {column: 3, row: 6},
        'mg': {column: 4, row: 6},
        'mw': {column: 5, row: 6},
        'my': {column: 6, row: 6},
        'mv': {column: 7, row: 6},
        'ml': {column: 8, row: 6},
        'mt': {column: 9, row: 6},
        'mh': {column: 10, row: 6},
        'mr': {column: 11, row: 6},
        'mu': {column: 12, row: 6},
        'mx': {column: 13, row: 6},
        'fm': {column: 14, row: 6},
        'md': {column: 15, row: 6},
        'mc': {column: 16, row: 6},
        'mn': {column: 17, row: 6},
        'me': {column: 18, row: 6},
        'ma': {column: 19, row: 6},
        'mz': {column: 20, row: 6},

        'na': {column: 1, row: 7},
        'nr': {column: 2, row: 7},
        'np': {column: 3, row: 7},
        'nl': {column: 4, row: 7},
        'nz': {column: 5, row: 7},
        'ni': {column: 6, row: 7},
        'ne': {column: 7, row: 7},
        'ng': {column: 8, row: 7},
        'no': {column: 9, row: 7},
        'om': {column: 10, row: 7},
        'pk': {column: 11, row: 7},
        'pw': {column: 12, row: 7},
        'pa': {column: 13, row: 7},
        'pg': {column: 14, row: 7},
        'py': {column: 15, row: 7},
        'pe': {column: 16, row: 7},
        'ph': {column: 17, row: 7},
        'pl': {column: 18, row: 7},
        'pt': {column: 19, row: 7},
        'qa': {column: 20, row: 7},

        'ro': {column: 1, row: 8},
        'ru': {column: 2, row: 8},
        'rw': {column: 3, row: 8},
        'kn': {column: 4, row: 8},
        'wc': {column: 5, row: 8},
        'vc': {column: 6, row: 8},
        'ws': {column: 7, row: 8},
        'sm': {column: 8, row: 8},
        'st': {column: 9, row: 8},
        'sa': {column: 10, row: 8},
        'sn': {column: 11, row: 8},
        'rs': {column: 12, row: 8},
        'sc': {column: 13, row: 8},
        'sl': {column: 14, row: 8},
        'sg': {column: 15, row: 8},
        'sk': {column: 16, row: 8},
        'sb': {column: 17, row: 8},
        'so': {column: 18, row: 8},
        'za': {column: 19, row: 8},
        'es': {column: 20, row: 8},

        'lk': {column: 1, row: 9},
        'sd': {column: 2, row: 9},
        'sr': {column: 3, row: 9},
        'sz': {column: 4, row: 9},
        'se': {column: 5, row: 9},
        'ch': {column: 6, row: 9},
        'sy': {column: 7, row: 9},
        'tj': {column: 8, row: 9},
        'tz': {column: 9, row: 9},
        'th': {column: 10, row: 9},
        'tg': {column: 11, row: 9},
        'to': {column: 12, row: 9},
        'tt': {column: 13, row: 9},
        'tn': {column: 14, row: 9},
        'tr': {column: 15, row: 9},
        'tm': {column: 16, row: 9},
        'tv': {column: 17, row: 9},
        'ug': {column: 18, row: 9},
        'ua': {column: 19, row: 9},
        'ae': {column: 20, row: 9},

        'uk': {column: 1, row: 10},
        'us': {column: 2, row: 10},
        'uy': {column: 3, row: 10},
        'uz': {column: 4, row: 10},
        'vu': {column: 5, row: 10},
        've': {column: 6, row: 10},
        'vn': {column: 7, row: 10},
        'ye': {column: 8, row: 10},
        'zm': {column: 9, row: 10},
        'zw': {column: 10, row: 10},
        'va': {column: 11, row: 10},
        'ab': {column: 12, row: 10},
        'ps': {column: 13, row: 10},
        'tw': {column: 14, row: 10},
        'hk': {column: 15, row: 10},
        'eu': {column: 16, row: 10}
    };

    let getFlagGenerateStatus = function () {
        return isFlagGenerated;
    };

    let generateFlagIconStyles = function () {
        let flagCss = 'width: 35px; height: 26px;';
        let imgWidth = 35;
        let imgHeight = 26;
        let imgGap = 5;
        let totWidth = imgGap + imgWidth;
        let left;
        let top;
        let divClasses = '';
        // let divStyle = Ember.$('<style type="text/css">').appendTo('head');
        // let divStyle = document.head.insertAdjacentHTML("beforeend", `<style type="text/css">`);
        let divStyle = document.getElementsByTagName('head')[0].appendChild(`<style type="text/css">`);

        Object.keys(countryFlagConstants).forEach(function(key) {
            let countryPosition = countryFlags[countryFlagConstants[key]];
            let column = countryPosition.column;
            let row = countryPosition.row;

            if (column === 1) {
                left = 0;
            } else if (column > 1) {
                left = totWidth * (column - 1);
            }

            if (row === 1) {
                top = 0;
            } else if (row > 1) {
                top = imgHeight * (row - 1);
            }

            divClasses = divClasses + ('.class-' + countryFlagConstants[key] + '{' + flagCss + 'background: url("assets/images/flags.png") -' + left + 'px -' + top + 'px; transform: scale(' + scaleValue + ');}');
        });

        divStyle.append(divClasses);
        divStyle.append('</style>');

        isFlagGenerated = true;
    };

    return {
        generateFlagIconStyles: generateFlagIconStyles,
        getFlagGenerateStatus: getFlagGenerateStatus
    };
})();