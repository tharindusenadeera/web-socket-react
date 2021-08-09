import Constants from '../utils/Constants';

export default (function () {
    /* *
     * Checks whether string is undefined, null or empty
     * @param value String to validate
     * @returns {boolean} True if string is not undefined, not null and not empty, false otherwise
     */
    let isAvailable = function (value) {
        let valid = false;

        if (value !== undefined && value !== null) {
            if (value.trim) {
                valid = value.trim() !== Constants.StringConst.Empty;
            } else {
                valid = true;
            }
        }

        return valid;
    };

    /* *
     * Checks whether string represents a valid email address
     * @param value String to validate
     * @returns {boolean} True if string is a valid email address, false otherwise
     */
    let isEmail = function (value) {
        let valid = false;
        //eslint-disable-next-line
        let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (value.match(pattern)) {
            valid = true;
        }

        return valid;
    };

    return {
        isAvailable: isAvailable,
        isEmail: isEmail
    };
})();
