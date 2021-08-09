export default (function () {
    // Arabic Numbers definitions
    let billons = ['', 'مليار', 'ملياران', 'ثلاثة مليارات', 'اربعة مليارات', 'خمسة مليارات', 'ست مليارات', 'سبعة مليارات', 'ثمنية مليارات', 'تسعة مليارات'];
    let millions = ['', 'مليون', 'مليونان', 'ثلاثة ملايين', 'اربعة ملايين', 'خمسة ملايين', 'ست ملايين', 'سبعة ملايين', 'ثمنية ملايين', 'تسعة ملايين'];
    let thousands = ['', 'الف', 'الفان', 'ثلاثة الاف', 'اربعة الاف', 'خمسة الاف', 'ست الاف', 'سبعة الاف', 'ثمانية الاف', 'تسعة الاف'];
    let unit = ['', 'واحد', 'اثنان', 'ثلاثة', 'اربعة', 'خمسة', 'ستة', 'سبعة', 'ثمانية', 'تسعة'];
    let tens = ['عشرة', 'أحدا عشر', 'اثنا عشر', 'ثلاثة عشر', 'ارابع عشر', 'خامس عشر', 'ستة عشر', 'سبعة عشر', 'ثمانية عشر', 'تسعة عشر'];
    let decs = ['', 'عشرة', 'عشرون', 'ثلاثون', 'اربعون', 'خمسون', 'ستون', 'سبعون', 'ثمانون', 'تسعون'];
    let hundreds = ['', 'مائه', 'مئتان', 'ثلاث مئة', 'اربع مئة', 'خمس مئة', 'ست مئة', 'سبع مئة', 'ثمن مئة', 'تسع مئة'];

    let dec = function (n1, n2) {
        // Decimal mapping
        let endValue = '';

        if (n1 === '0') {
            endValue = unit[n2];
        } else {
            if (n2 === '0') {
                endValue = decs[n1];
            } else {
                if (n1 === '1') {
                    endValue = tens[n2];
                } else {
                    endValue += unit[n2];
                    endValue += ' و';
                    endValue += decs[n1];
                }
            }
        }

        return endValue;
    };

    let hundred = function (n1, n2, n3) {
        // Hundreds Mapping
        let endValue = '';
        endValue += hundreds[n1];

        if (n2 !== '0' || n3 !== '0') {
            endValue += ' و';
        }

        endValue += dec(n2, n3);
        return endValue;
    };

    let getArabicWord = function (value) {
        let endValue = '';
        let number = '' + value;
        let len = number.length;
        let numbers = number.split('');

        if (len === 1) {
            endValue += unit[numbers[len - 1]];
        } else if (len === 2) {
            if (numbers[0] === '1') {
                endValue = tens[numbers[1]];
            } else {
                endValue += unit[numbers[len - 1]];

                if (numbers[len - 1] !== '0') {
                    endValue += ' و';
                }

                endValue += decs[numbers[len - 2]];
            }
        } else if (len === 3) {
            endValue += hundreds[numbers[len - 3]];

            if (numbers[len - 2] !== '0' || numbers[len - 1] !== '0') {
                endValue += ' و';
            }

            endValue += dec(numbers[len - 2], numbers[len - 1]);
        } else if (len === 4) {
            endValue += thousands[numbers[len - 4]];

            if (numbers[len - 3] !== '0') {
                endValue += ' و';
            }

            endValue += hundred(numbers[len - 3], numbers[len - 2], numbers[len - 1]);
        } else if (len === 5) {
            endValue += dec(numbers[len - 5], numbers[len - 4]);
            endValue += numbers[len - 5] === '1' ? ' ألاف ' : ' الف ';

            if (numbers[len - 3] !== '0') {
                endValue += ' و';
            }

            endValue += hundred(numbers[len - 3], numbers[len - 2], numbers[len - 1]);
        } else if (len === 6) {
            endValue += hundred(numbers[len - 6], numbers[len - 5], numbers[len - 4]);
            endValue += numbers[len - 6] === '1' ? ' ألاف ' : ' الف ';
            endValue += numbers[len - 5] !== '0' && numbers[len - 4] !== '0' ? ' و' : '';
            endValue += hundred(numbers[len - 3], numbers[len - 2], numbers[len - 1]);
        } else if (len === 7) {
            endValue += millions[numbers[len - 7]];
            endValue += numbers[len - 6] !== '0' ? ' و' : '';
            endValue += hundred(numbers[len - 6], numbers[len - 5], numbers[len - 4]);

            if (numbers[len - 6] !== '0') {
                endValue += numbers[len - 6] === '1' ? ' ألاف ' : ' الف ';
            }

            endValue += numbers[len - 5] !== '0' && numbers[len - 4] !== '0' ? ' و' : '';
            endValue += hundred(numbers[len - 3], numbers[len - 2], numbers[len - 1]);
        } else if (len === 8) {
            endValue += dec(numbers[len - 8], numbers[len - 7]);
            endValue += ' مليون ';

            if (numbers[len - 6] !== '0') {
                endValue += ' و ';
            }

            endValue += hundred(numbers[len - 6], numbers[len - 5], numbers[len - 4]);

            if (numbers[len - 6] !== '0') {
                endValue += numbers[len - 6] === '1' ? ' ألاف ' : ' الف ';
            }

            endValue += numbers[len - 5] !== '0' && numbers[len - 4] !== '0' ? ' و' : '';
            endValue += hundred(numbers[len - 3], numbers[len - 2], numbers[len - 1]);
        } else if (len === 9) {
            endValue += hundred(numbers[len - 9], numbers[len - 8], numbers[len - 7]);
            endValue += ' مليون ';

            if (numbers[len - 6] !== '0') {
                endValue += ' و ';
            }

            endValue += hundred(numbers[len - 6], numbers[len - 5], numbers[len - 4]);

            if (numbers[len - 6] !== '0') {
                endValue += numbers[len - 6] === '1' ? ' ألاف ' : ' الف ';
            }

            endValue += numbers[len - 5] !== '0' && numbers[len - 4] !== '0' ? ' و' : '';
            endValue += hundred(numbers[len - 3], numbers[len - 2], numbers[len - 1]);
        } else if (len === 10) {
            endValue += billons[numbers[len - 10]];

            if (numbers[len - 9] !== '0') {
                endValue += ' و ';
            }

            endValue += hundred(numbers[len - 9], numbers[len - 8], numbers[len - 7]);

            if (numbers[len - 9] !== '0') {
                endValue += ' مليون ';
            }

            if (numbers[len - 8] !== '0') {

                endValue += ' و ';
            }

            endValue += hundred(numbers[len - 6], numbers[len - 5], numbers[len - 4]);

            if (numbers[len - 6] !== '0') {
                endValue += numbers[len - 6] === '1' ? ' ألاف ' : ' الف ';
            }

            endValue += numbers[len - 5] !== '0' && numbers[len - 4] !== '0' ? ' و' : '';
            endValue += hundred(numbers[len - 3], numbers[len - 2], numbers[len - 1]);
        }

        return endValue;
    };

    return {
        getArabicWord: getArabicWord
    };
})();