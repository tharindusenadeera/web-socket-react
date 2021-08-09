import sharedService from '../models/shared/shared-service';
import utils from '../utils/utils';
import appConfig from '../config/app-config';
import fieldMetaConfig from '../config/field-meta-config';

export default (function () {
    let NumberScale = {
        Thousand: 'K',
        Million: 'M',
        Billion: 'B',
        Trillion: 'T'
    };

    /* *
     * Convert time stamp in milliseconds to UTC
     * @param milliSeconds Timestamp in milliseconds
     * @returns {number} Time stamp in milliseconds converted to UTC
     */
    let convertToUTCTimestamp = function (milliSeconds) {
        let date = new Date(milliSeconds);

        return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
            date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), date.getUTCMilliseconds());
    };

    /* *
     * Convert time stamp in milliseconds to UTC Date (GMT 0)
     * @param milliSeconds Timestamp in milliseconds
     * @param offset Offset, Format: x.y (Ex: 2, 2.0, 5.5)
     * @returns {Date} Javascript Date Object converted to UTC
     */
    let convertToUTCDate = function (milliSeconds, offset) {
        let date = new Date(milliSeconds);
        let gmtDate = new Date(date.valueOf() + (date.getTimezoneOffset() * 60000));

        if (offset) {
            return adjustToTimezone(gmtDate, offset);
        } else {
            return gmtDate;
        }
    };

    /* *
     * Convert unicode string to native string
     * @param unicodeString Unicode string
     * @returns {*} Converted native string
     */
    let convertUnicodeToNativeString = function (unicodeString) {
        if (unicodeString) {
            return unicodeString.replace(/\\u[\dABCDEFabcdef][\dABCDEFabcdef][\dABCDEFabcdef][\dABCDEFabcdef]/g,
                function (match) {
                    return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
                });
        }

        return unicodeString;
    };

    /* *
     * Convert value to multi factor value
     * @param value
     * @param currency
     * @param exchange
     * @returns multi factor value
     */
    let convertToMultiFactorValue = function (value, currency, exchange) {
        let multiFactors = fieldMetaConfig.multiFactors;

        if (exchange && multiFactors) {
            let exchangeFieldMeta = multiFactors[exchange];

            if (exchangeFieldMeta) {
                let currencyFieldMeta = exchangeFieldMeta[currency];

                if (currencyFieldMeta) {
                    if (currencyFieldMeta.multiFactor) {
                        value = value * currencyFieldMeta.multiFactor;
                    }
                } else if (exchangeFieldMeta.multiFactor) {
                    value = value * exchangeFieldMeta.multiFactor;
                }
            }
        }

        return value;
    };

    /* *
     * Convert date and / or time to Javascript Date object
     * @param dateTimeString Date and / or time string, Format: yyyyMMdd / yyyyMMdd HHmmss / yyyyMMddHHmmss / HHmmss
     * @returns {*} Converted Javascript Date object if valid date and / or time string, undefined otherwise
     */
    let convertStringToDate = function (dateTimeString) {
        let date;

        if (utils.validators.isAvailable(dateTimeString)) {
            let dateTimeParts = dateTimeString.trim().split(utils.Constants.StringConst.Space);

            if (dateTimeParts.length > 0) {
                let isWithTime;
                let year, month, day, hour, minutes, seconds;
                let dateOrTimePart = dateTimeParts[0];

                if (dateOrTimePart.length === 8) {
                    isWithTime = false;

                    year = dateOrTimePart.substring(0, 4);
                    month = parseInt(dateOrTimePart.substring(4, 6), 10) - 1; // Javascript month is zero (0) based
                    day = dateOrTimePart.substring(6, 8);
                } else if (dateOrTimePart.length === 6) {
                    let dateNow = new Date();
                    isWithTime = true;

                    hour = dateOrTimePart.substring(0, 2);
                    minutes = dateOrTimePart.substring(2, 4);
                    seconds = dateOrTimePart.substring(4, 6);

                    year = dateNow.getFullYear();
                    month = dateNow.getMonth();
                    day = dateNow.getDay();
                } else if (dateOrTimePart.length === 14 || dateOrTimePart.length === 17) { // yyyyMMddHHmmss or yyyyMMddHHmmssfff
                    isWithTime = true;
                    year = dateOrTimePart.substring(0, 4);
                    month = parseInt(dateOrTimePart.substring(4, 6), 10) - 1; // Javascript month is zero (0) based
                    day = dateOrTimePart.substring(6, 8);

                    hour = dateOrTimePart.substring(8, 10);
                    minutes = dateOrTimePart.substring(10, 12);
                    seconds = dateOrTimePart.substring(12, 14);
                }

                if (dateTimeParts.length > 1) {
                    let timePart = dateTimeParts[1];
                    date = new Date(year, month, day, timePart.substring(0, 2), timePart.substring(2, 4), timePart.substring(4, 6));
                } else {
                    if (isWithTime) {
                        date = new Date(year, month, day, hour, minutes, seconds);
                    } else if (year && month >= 0 && day) {
                        date = new Date(year, month, day);
                    } else {
                        return '';
                    }
                }
            }
        }

        return date;
    };

    /* *
     * Format date to display format
     * Display format will be taken from application configuration file
     * @param date object
     */
    let convertToDisplayTimeFormat = function (datetime, format) {
        let dateTimeFormat = format ? format : sharedService.userSettings.displayFormat.timeFormat;

        return datetime ? utils.moment(datetime).format(dateTimeFormat) : sharedService.userSettings.displayFormat.noValue;
    };

    /* *
     * Format date to display format
     * Display format will be taken from application configuration file
     * @param date Date String, Format: yyyyMMdd
     * @param exg Required time zone exchange
     */
    let formatToDate = function () {
        // This function should be implemented by application in order use
    };

    /* *
     * Format time to display format
     * Display format will be taken from application configuration file
     * @param time Time String, Format: HHmmss
     * @param exg Required time zone exchange
     */
    let formatToTime = function () {
        // This function should be implemented by application in order use
    };

    /* *
     * Format date time to display format
     * Display format will be taken from application configuration file
     * @param dateTime Date time String, Format: yyyyMMdd HHmmss
     * @param exg Required time zone exchange
     */
    let formatToDateTime = function () {
        // This function should be implemented by application in order use
    };

    let formatToDateTimeMinute = function () {

    };

    /* *
     * Format date time to display format
     * Display format will be taken from application configuration file
     * @param dateTime Date time String, Format: ddMM HHmmss
     * @param exg Required time zone exchange
     */
    let formatToDayMonthTime = function () {
        // This function should be implemented by application in order use
    };

    /* *
     * Format javascript date to display format
     * Display format will be taken from application configuration file
     * @param dateTime javascript date object
     */
    let formatDateToDisplayDate = function (date, resetTime, dateSeperator, timeSeperator, dateTimeSeperator) {
        let dSeperator = dateSeperator ? dateSeperator : '';
        let tSeperator = timeSeperator ? timeSeperator : '';
        let dTSeperator = dateTimeSeperator ? dateTimeSeperator : '';

        let editedDate = convertToTwoDigits([date.getFullYear(), date.getMonth() + 1, date.getDate()]).join(dSeperator);
        let editedTime = resetTime ? '000000' : convertToTwoDigits([date.getHours(), date.getMinutes(), date.getSeconds()]).join(tSeperator);

        return date ? [editedDate, editedTime].join(dTSeperator) : sharedService.userSettings.displayFormat.noValue;
    };

    /* *
     * Format number to given decimal places and separate each 3 digits by commas
     * @param value Number to format
     * @param decimalPlaces Number of decimal places
     * @returns {*} Number formatted to given decimal places and commas added
     */
    let formatNumber = function (value, decimalPlaces) {

        if (!isNaN(value) && String(value).trim() !== '') {
            if (decimalPlaces >= 0) {
                return _formatNumberToDisplay(value, decimalPlaces);
            } else {
                return value;
            }
        } else {
            return sharedService.userSettings.displayFormat.noValue;
        }
    };

    /* *
   * Format number to given decimal places and separate each 3 digits by commas
   * @param value Number to format
   * @param decimalPlaces Number of decimal places
   * @returns  if the value is NAN for display purpose
   * @returns {*} Number formatted to given decimal places and commas added
   */
    let formatNumberElseString = function (value, decimalPlaces) {
        if (!isNaN(value) && decimalPlaces >= 0 && String(value).trim() !== '' && value !== null) {
            return _formatNumberToDisplay(value, decimalPlaces);
        } else if (value === undefined || value === null) {
            return '';
        } else {
            return value;
        }
    };

    /* *
     * Format number to given decimal places and separate each 3 digits by commas and add percentage symbol (%)
     * @param value Number to format
     * @param decimalPlaces Number of decimal places
     * @returns {*} Number formatted to given decimal places and commas and percentage symbol (%) added
     */
    let formatNumberPercentage = function (value, decimalPlaces) {
        if (!isNaN(value) && String(value).trim() !== '') {
            return formatNumber(value, decimalPlaces) + '%';
        } else {
            return sharedService.userSettings.displayFormat.noValue;
        }
    };

    /* *
     * Divide numbers to factors of thousands. Ex: million, billion etc.
     * @param value Number to format
     * @param decimalPlaces Number of decimal places
     * @returns {string} Number divided and suffix added
     */
    let divideNumber = function (value, decimalPlaces) {
        let val = value;
        let valAbs = Math.abs(value);
        let defaultNoOfDecimals = 2;    // This is used for client side calc to show M, B etc.
        let noOfDecimals = decimalPlaces !== undefined ? decimalPlaces : sharedService.userSettings.displayFormat.decimalPlaces;

        if (!isNaN(val) && String(val).trim() !== '') {
            let suffix = '';

            if (valAbs >= Math.pow(10, 12)) {            // Trillion
                val = val / Math.pow(10, 12);
                suffix = NumberScale.Trillion;
            } else if (valAbs >= Math.pow(10, 9)) {      // Billion
                val = val / Math.pow(10, 9);
                suffix = NumberScale.Billion;
            } else if (valAbs >= Math.pow(10, 6)) {      // Million
                val = val / Math.pow(10, 6);
                suffix = NumberScale.Million;
            } else if (valAbs >= Math.pow(10, 3)) {      // Thousand
                val = val / Math.pow(10, 3);
                suffix = NumberScale.Thousand;
            }

            return parseFloat(val).toFixed(noOfDecimals >= 0 ? noOfDecimals : defaultNoOfDecimals) + ' ' + (suffix ? suffix : '');
        } else {
            return sharedService.userSettings.displayFormat.noValue;
        }
    };

    /* *
     * Multiply number by the given factor
     * @param value Number to format
     * @param factor Multiplication factor
     * @param decimalPlaces Number of decimal places
     * @returns {string} Number multiplied and format to given decimal places
     */
    let multiplyNumber = function (value, factor, decimalPlaces) {
        let noOfDecimals = decimalPlaces !== undefined ? decimalPlaces : sharedService.userSettings.displayFormat.decimalPlaces;
        let multiFactor = factor !== undefined ? factor : 1;
        let val = value !== undefined ? value : 0.0;

        return (val * multiFactor).toFixed(noOfDecimals);
    };

    /* *
     * Multiply number by the given factor and add percentage sign
     * @param value Number to format
     * @param factor Multiplication factor
     * @param decimalPlaces Number of decimal places
     * @returns {string} Number multiplied and format to given decimal places
     */
    let multiplyNumberPercentage = function (value, factor, decimalPlaces) {
        return multiplyNumber(value, factor, decimalPlaces) + '%';
    };

    /* *
     * Adjust date / time object to timezone
     * @param date Javascript Date object
     * @param offset Offset, Format: x.y (Ex: 2, 2.0, 5.5)
     * @returns {*} Timezone adjusted Date object
     */
    let adjustToTimezone = function (date, offset) {
        if (date && offset) {
            date.setTime(date.getTime() + (offset * 3600000)); // 60 * 60 * 1000
        }

        return date;
    };

    let getAdjustedDateTime = function (dateTime, offset) {
        let timeOffset = offset ? offset : 0;
        let dateObj = convertStringToDate(dateTime);

        return adjustToTimezone(dateObj, timeOffset);
    };

    let convertDateObj = function (date) {
        return convertDateFields(date.getFullYear(), date.getMonth(), date.getDate());
    };

    let convertDateFields = function (year, month, day) {
        let date = convertToTwoDigits([month + 1, day]);
        return {year: year, month: date[0], day: date[1]};
    };

    let _formatNumberToDisplay = function (value, decimalPlaces) {
        let noOfDecimals = decimalPlaces;
        let roundedNum = _roundNumber(value, noOfDecimals);
        let wholeNum = (roundedNum.split('.')[0]).toString();
        let wholeNumWithoutMinus;

        if (wholeNum.charAt(0) === '-') {
            wholeNumWithoutMinus = wholeNum.substring(1, wholeNum.length);
        } else {
            wholeNumWithoutMinus = wholeNum;
        }

        let formWholeNum = '';
        let thousandSeperator = appConfig.customisation.thousandSeperator;  // Empty string is not accepted for thousand seperator

        for (let i = wholeNumWithoutMinus.length; i > 0; i -= 3) {
            formWholeNum = thousandSeperator + wholeNumWithoutMinus.substring(i - 3, i) + formWholeNum;
        }

        let formNum = formWholeNum.substring(1, formWholeNum.length);

        if ((roundedNum.toString().split('.')).length > 1) {
            formNum = formNum + '.' + roundedNum.toString().split('.')[1];
        } else {
            if (noOfDecimals > 0) {
                formNum += '.';

                while (noOfDecimals > 0) {
                    formNum += '0';
                    noOfDecimals--;
                }
            }
        }

        if (wholeNum.charAt(0) === '-') {
            formNum = '-' + formNum;
        }

        if (formNum === 'NaN' || formNum.indexOf('NaN') >= 0) {
            formNum = sharedService.userSettings.displayFormat.noValue;
        }

        return formNum;
    };

    let _roundNumber = function (value, decimalPlaces) {
        let num = parseFloat(value);
        let result = _toFixed((Math.round(num * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces)));

        let numParts = result.split('.');

        if (numParts.length > 1) {
            let floatNum = numParts[1];

            if (floatNum.length < decimalPlaces) {
                for (let i = 0; i < (decimalPlaces - floatNum.length); i++) {
                    result += '0';
                }
            }
        }

        return result;
    };

    let _toFixed = function (x) {
        let e;
        let value = x;

        if (Math.abs(value) < 1.0) {
            e = parseInt(value.toString().split('e-')[1], 10);

            if (e) {
                value *= Math.pow(10, e - 1);
                value = '0.' + (new Array(e)).join('0') + value.toString().substring(2); // NOSONAR
            }
        } else {
            e = parseInt(value.toString().split('+')[1], 10);

            if (e > 20) {
                e -= 20;
                value /= Math.pow(10, e);
                value += (new Array(e + 1)).join('0'); // NOSONAR
            }
        }

        return value.toString();
    };

    // TODO: [Bashitha] This is a temporary fix to format single digit numbers to 2 digit numbers
    let convertToTwoDigits = function (valArray) {
        return valArray.map(function (val) {
            return val < 10 ? '0' + val : val;
        });
    };

    //
    // Chart specific conversions
    //

    let generateChartBeginDateString = function (chartCategory) {
        if (utils.chartConstants.ChartCategory.Intraday.ID === chartCategory.ID) {
            return generateIntradayBeginDateString(utils.chartConstants.ChartCategory.Intraday.DefaultDataRequestDuration);
        } else {
            return generateHistoryBeginDateString(utils.chartConstants.ChartCategory.History.DefaultDataRequestDuration, 0); // 0 months
        }
    };

    let generateChartEndDateString = function (chartCategory) {
        if (utils.chartConstants.ChartCategory.Intraday.ID === chartCategory.ID) {
            return generateIntradayEndDateString();
        } else {
            return generateHistoryEndDateString();
        }
    };

    let generateIntradayBeginDateString = function (days) {
        let date = new Date();

        if (days === utils.chartConstants.ChartDefaultDataPeriod.Month) {
            date.setMonth(date.getMonth() - 1);
        } else {
            date.setDate(date.getDate() - days);
        }

        return convertDateToString(date);
    };

    let generateIntradayEndDateString = function () {
        let date = new Date();

        return convertDateToString(date);
    };

    let generateHistoryBeginDateString = function (years, months) {
        let date = new Date();

        date.setYear(date.getFullYear() - years);
        date.setMonth(date.getMonth() - months);
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        return convertDateToString(date);
    };

    let generateHistoryEndDateString = function () {
        let date = new Date();
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);

        return convertDateToString(date);
    };

    /* *
     * Format date to mix date format
     * @param date JavaScript Date Obj
     * @return date string, Format yyyyMMddHHmmss
     */
    let convertDateToString = function (date) {
        if (!date) {
            return undefined;
        }

        return date.getFullYear() +
            _fillDateString(date.getMonth() + 1) +
            _fillDateString(date.getDate()) +
            _fillDateString(date.getHours()) +
            _fillDateString(date.getMinutes()) +
            _fillDateString(date.getSeconds());
    };

    let _fillDateString = function (value) {
        return (value < 10 ? '0' : '') + value;
    };

    /* *
     * Get decimal places
     */
    let getDecimalPlaces = function (value) {
        let decimalPlaces = 0;

        if (value) {
            if (Math.floor(value) === value) {
                return decimalPlaces;
            }

            let valueArray = value.toString().split('.');

            if (valueArray.length > 1) {
                decimalPlaces = valueArray[1].length;
            }
        }

        return decimalPlaces;
    };

    let convertBase64toHEX = function (base64) {
        let row = atob(base64);
        let hexArray = [];

        for (let index = 0; index < row.length; index++) {
            let hexText = row.charCodeAt(index).toString(16);
            hexArray[hexArray.length] = (hexText.length === 2 ? hexText : '0' + hexText);
        }

        return hexArray.join('');
    };

    /* *
     * Format date to transfer format
     * @param date JavaScript Date Obj
     * @return date string, Format yyyyMMdd
     */
    let convertToTransferFormat = function (date) {
        return date ? convertToDisplayTimeFormat(date, 'YYYYMMDD') : '';
    };

    let getFormattedValue = function (value, formatter, decimalPalces, exchange) {
        switch (formatter) {
            case utils.Constants.DataFormatter.Currency:
                return utils.formatters.formatNumber(value, decimalPalces);

            case utils.Constants.DataFormatter.Long:
                return utils.formatters.formatNumber(value, 0);

            case utils.Constants.DataFormatter.Integer:
                return utils.formatters.formatNumber(value, 0);

            case utils.Constants.DataFormatter.Float:
                return utils.formatters.formatNumber(value, decimalPalces);

            case utils.Constants.DataFormatter.Date:
                return value ? utils.formatters.formatToDate(value) : sharedService.userSettings.displayFormat.noValue;

            case utils.Constants.DataFormatter.Percentage:
                return utils.formatters.formatNumberPercentage(value);

            case utils.Constants.DataFormatter.DivideNumber:
                return utils.formatters.divideNumber(value, decimalPalces);

            case utils.Constants.DataFormatter.Time:
                return value ? utils.formatters.formatToTime(value, exchange) : sharedService.userSettings.displayFormat.noValue;

            case utils.Constants.DataFormatter.DateTime:
                return value ? utils.formatters.formatToDateTime(value) : sharedService.userSettings.displayFormat.noValue;

            default:
                return value;
        }
    };

    let roundNumber = function (value, decimalPlaces) {
        if (!isNaN(value) && String(value).trim() !== '') {
            if (decimalPlaces >= 0) {
                return parseFloat(_roundNumber(value, decimalPlaces));
            } else {
                return value;
            }
        } else {
            return sharedService.userSettings.displayFormat.noValue;
        }
    };

    return {
        convertToUTCTimestamp: convertToUTCTimestamp,
        convertStringToDate: convertStringToDate,
        convertDateToString: convertDateToString,
        convertToDisplayTimeFormat: convertToDisplayTimeFormat,
        getAdjustedDateTime: getAdjustedDateTime,
        convertUnicodeToNativeString: convertUnicodeToNativeString,
        adjustToTimezone: adjustToTimezone,
        formatToDate: formatToDate,
        formatToTime: formatToTime,
        formatToDateTime: formatToDateTime,
        formatNumber: formatNumber,
        formatNumberElseString: formatNumberElseString,
        formatToDateTimeMinute: formatToDateTimeMinute,
        formatToDayMonthTime: formatToDayMonthTime,
        formatNumberPercentage: formatNumberPercentage,
        divideNumber: divideNumber,
        multiplyNumber: multiplyNumber,
        multiplyNumberPercentage: multiplyNumberPercentage,
        convertToUTCDate: convertToUTCDate,
        formatDateToDisplayDate: formatDateToDisplayDate,
        generateChartBeginDateString: generateChartBeginDateString,
        generateChartEndDateString: generateChartEndDateString,
        generateIntradayBeginDateString: generateIntradayBeginDateString,
        generateIntradayEndDateString: generateIntradayEndDateString,
        generateHistoryBeginDateString: generateHistoryBeginDateString,
        generateHistoryEndDateString: generateHistoryEndDateString,
        getDecimalPlaces: getDecimalPlaces,
        convertDateObj: convertDateObj,
        convertDateFields: convertDateFields,
        convertBase64toHEX: convertBase64toHEX,
        convertToTransferFormat: convertToTransferFormat,
        convertToTwoDigits: convertToTwoDigits,
        getFormattedValue: getFormattedValue,
        convertToMultiFactorValue: convertToMultiFactorValue,
        roundNumber: roundNumber
    };
})();