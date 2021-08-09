import PersistentObject from '../../../../ua-kernal/models/shared/business-entities/persistent-object';
import utils from '../../../../ua-kernal/utils/utils';
import AppConfig from '../protocols/config/AppConfig';

//TODO: [Jayanes] Need to convert this file (computed property)
export default class PriceUser extends PersistentObject{
    constructor(userObj) {
        super();
        this.cacheKey = 'priceUser';
        this.isEncrypt = true;
        this.oneDayInMillis = 86400000; // 1000 * 60 * 60 * 24

        // Auth related params
        this.sessionId = userObj.sessionId;
        this.authStatus = userObj.authStatus;
        this.userId = userObj.userId;
        this.username = userObj.username;
        this.userExchg = userObj.userExchg; // Only default exchanges
        this.newsProviders = userObj.newsProviders;
        this.expiryDate = userObj.expiryDate;
        this.windowTypes = userObj.windowTypes;
        this.name = userObj.name;
        this.expiredExchg = userObj.expiredExchg;
        this.inactiveExchg = userObj.inactiveExchg;
        this.metaVersion = userObj.metaVersion;
        this.metaVersion = userObj.metaVersion;
        this.delayedExchg = userObj.delayedExchg; // Only delayed exchanges
        this.prevDayExchg = userObj.prevDayExchg; // Only previous market day exchanges
        this.billingCode = userObj.billingCode;
        this.nonDefExg = userObj.nonDefExg; // Only non-default exchanges
        this.isMultipleUserExchangesAvailable = false;
    }

  /*  expDate () {
        let expDateObj;
        let expDateString = this.expiryDate;

        if (utils.validators.isAvailable(expDateString)) {
            expDateObj = utils.formatters.convertStringToDate(expDateString);
        }

        return expDateObj;
    }.property('expiryDate')*/

    /*allExg () {
        return this.userExchg.concat(this.nonDefExg);
    }.property('userExchg', 'nonDefExg')*/

    authResponseMapping = {
        'SID': 'sessionId',
        'AUTHSTAT': 'authStatus',
        'UID': 'userId',
        'UNM': 'username',
        'UE': 'userExchg',
        'NWSP': 'newsProviders',
        'EXPDATE': 'expiryDate',
        'WT': 'windowTypes',
        'NAME': 'name',
        'EXPEXG': 'expiredExchg',
        'INACEXG': 'inactiveExchg',
        'METAVER': 'metaVersion',
        'DE': 'delayedExchg',
        'PDE': 'prevDayExchg',
        'NDE': 'nonDefExg'
    }

    isWindowTypeAvailable (windowTypes,exchange) {
        let isAvailable = false;
        let exgWindowTypes = this.windowTypes && this.windowTypes[exchange];

        if (exgWindowTypes) {

            Object.keys(windowTypes).forEach(function(key) {
                isAvailable = exgWindowTypes.indexOf( windowTypes[key]) >= 0;

                if (isAvailable) {
                    return false;
                }
            });
        }

        return isAvailable;
    }

    isExchangeDelayed (exchangeCode) {
        return this.delayedExchg.indexOf(exchangeCode) >= 0;
    }

    isExchangePrevDay (exchangeCode) {
        return this.prevDayExchg.indexOf(exchangeCode) >= 0;
    }

    getExchangeSubscriptionFlag (exchangeCode) {
        let subscriptionFlag = undefined;

        if (this.delayedExchg.indexOf(exchangeCode) >= 0) {
            subscriptionFlag = utils.Constants.Delayed;
        } else if (this.prevDayExchg.indexOf(exchangeCode) >= 0) {
            subscriptionFlag = utils.Constants.PreviousDayData;
        }

        return subscriptionFlag;
    }

    isDelayedExchangesAvailable () {
        return this.delayedExchg.length > 0;
    }

    isPrevDataExchangesAvailable () {
        return this.prevDayExchg.length > 0;
    }

    isRealtimeExchangesAvailable () {
        return this.delayedExchg.length !== this.userExchg.length;
    }

    willExpireRecently () {
        return (this.expDate - new Date()) / this.oneDayInMillis <= AppConfig.subscriptionConfig.daysBeforeExpiration;
    }

    isNonDefaultExchangesAvailable () {
        return this.nonDefExg.length > 0;
    }

   /* isOptionSymbolSearchEnabled () {
        let allExg = this.allExg;

        return allExg.indexOf('OPRA') > -1;
    }.property('allExg')*/

    /*setMultipleUserExchangesAvailability () {
        this.isMultipleUserExchangesAvailable = this.userExchg.length > 1;
    }.observes('userExchg')*/

    /* *
    * Checks whether user has subscription for given exchange as a default exchange (real time or delayed, but not non-default)
    * @param exchange Exchange code to check
    * @returns {boolean} True if user has price subscription for the exchange as a default exchange, false otherwise
    */
    isNotSubscribedAsDefaultExchange (exchange) {
        let allDefaultExg = this.userExchg;
        return allDefaultExg.length > 0 && allDefaultExg.indexOf(exchange) === -1;
    }

    /* *
     * Checks whether user has subscription for given exchange (real time, delayed or non-default)
     * @param exchange Exchange code to check
     * @returns {boolean} True if user has price subscription for the exchange, false otherwise
     */
    isExchangeSubscribed (exchange) {
        return this.allExg.indexOf(exchange) > -1;
    }

    setData (userParams, isAuthResponse) {
        if (isAuthResponse) {
            let that = this;

            Object.keys(userParams).forEach(function(key) {
                let prop = that.authResponseMapping[key];

                if (prop) {
                    that.authResponseMapping[key] = userParams[key];
                }
            });
        } else {
            super.setData(userParams);
        }

    }

    save() {
        super.save(utils.Constants.StorageType.Local);
    }

    load() {
        return super.load(utils.Constants.StorageType.Local);
    }

    isLevelTwoDataAvailable (instrumentType) {
        let optionInstrumentType = 10; // TODO [Anushka] Implement advance method set to identify available data for a user
        return instrumentType !== optionInstrumentType;
    }

    isPriceUserExchange (exg) {
        let userExchanges = this.userExchg;
        return userExchanges.length > 0 && userExchanges.contains(exg);
    }
}