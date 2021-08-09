export default (function () {
    let _intPart = function (floatNum) {
        if (floatNum < -0.0000001) {
            return Math.ceil(floatNum - 0.0000001);
        }

        return Math.floor(floatNum + 0.0000001);
    };

    let _gregorianToHijriConversion = function (date) {
        let dateArray = date.split('/');
        let d = parseInt(dateArray[0], 10);
        let m = parseInt(dateArray[1], 10);
        let y = parseInt(dateArray[2], 10);
        let jd;

        if ((y > 1582) || ((y === 1582) && (m > 10)) || ((y === 1582) && (m === 10) && (d > 14))) {
            jd = _intPart((1461 * (y + 4800 + _intPart((m - 14) / 12))) / 4) + _intPart((367 * (m - 2 - 12 * (_intPart((m - 14) / 12)))) / 12) -
            _intPart((3 * (_intPart((y + 4900 + _intPart((m - 14) / 12)) / 100))) / 4) + d - 32075;
        } else {
            jd = 367 * y - _intPart((7 * (y + 5001 + _intPart((m - 9) / 7))) / 4) + _intPart((275 * m) / 9) + d + 1729777;
        }

        let l = jd - 1948440 + 10632;
        let n = _intPart((l - 1) / 10631);
        l = l - 10631 * n + 354;
        let j = (_intPart((10985 - l) / 5316)) * (_intPart((50 * l) / 17719)) + (_intPart(l / 5670)) * (_intPart((43 * l) / 15238));
        l = l - (_intPart((30 - j) / 15)) * (_intPart((17719 * j) / 50)) - (_intPart(j / 16)) * (_intPart((15238 * j) / 43)) + 29;
        m = _intPart((24 * l) / 709);
        d = l - _intPart((709 * m) / 24);
        y = 30 * n + j - 30;

        return {
            day: d,
            month: m,
            year: y
        };
    };

    let _hijriToGregorianConversion = function (date) {
        let dateArray = date.split('/');
        let y = parseInt(dateArray[0], 10);
        let m = parseInt(dateArray[1], 10);
        let d = parseInt(dateArray[2], 10);
        let jd = _intPart((11 * y + 3) / 30) + 354 * y + 30 * m - _intPart((m - 1) / 2) + d + 1948440 - 385;
        let l, n, i, j, k;

        if (jd > 2299160) {
            l = jd + 68569;
            n = _intPart((4 * l) / 146097);
            l = l - _intPart((146097 * n + 3) / 4);
            i = _intPart((4000 * (l + 1)) / 1461001);
            l = l - _intPart((1461 * i) / 4) + 31;
            j = _intPart((80 * l) / 2447);
            d = l - _intPart((2447 * j) / 80);
            l = _intPart(j / 11);
            m = j + 2 - 12 * l;
            y = 100 * (n - 49) + i + l;
        } else {
            j = jd + 1402;
            k = _intPart((j - 1) / 1461);
            l = j - 1461 * k;
            n = _intPart((l - 1) / 365) - _intPart(l / 1461);
            i = l - 365 * n + 30;
            j = _intPart((80 * i) / 2447);
            d = i - _intPart((2447 * j) / 80);
            i = _intPart(j / 11);
            m = j + 2 - 12 * i;
            y = 4 * k + n + i - 4716;
        }

        return {
            day: d,
            month: m,
            year: y
        };
    };

    let getIslamicDate = function (date) {
        let hijriDate = _gregorianToHijriConversion(date);
        let month = hijriDate.month.toString().length === 2 ? hijriDate.month : ['0', hijriDate.month].join('');
        let day = hijriDate.day.toString().length === 2 ? hijriDate.day : ['0', hijriDate.day].join('');

        return [hijriDate.year, month, day].join('/');
    };

    let getGregorianDate = function (date) {
        let gregorianDate = _hijriToGregorianConversion(date);
        let formattedGregorianDate = [gregorianDate.year, gregorianDate.month, gregorianDate.day].join('/');

        return new Date(formattedGregorianDate);
    };

    return {
        getIslamicDate: getIslamicDate,
        getGregorianDate: getGregorianDate
    };
})();