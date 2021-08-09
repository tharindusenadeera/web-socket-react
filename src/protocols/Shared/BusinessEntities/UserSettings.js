import PersistentObject from "./PersistentObject";
import utils from '../../../util/utils/utils';

export default class UserSettings extends PersistentObject{
    constructor() {
        super();
        this.cacheKey = 'userSettings';
        this.isEncrypt = true;
        this.favoriteExgMaxCount = 5;

        // Current session related params
        this.currentLanguage = '';
        this.currentTheme = '';
        this.currentSubMarket = -1;
        this.currentLoginStatus = 1;
        this.username = '';
        this.password = '';
        this.ssoToken = '';
        this.previousLoggedIn = '0';
        this.rememberMe = '0';
        this.favoriteExgs = undefined;
        this.currentBrokerage = '';
        this.tickerSpeed = '';
        this.biometricAuthArgs = {};
    }

    getFavoriteExgs () {
        let favoriteExgs = [];
        let favoriteExgsHitCounts = [];
        let maxArry = [];
        let favoriteExgMaxCount = this.favoriteExgMaxCount;
        let favExgObj = this.favoriteExgs;

        let _addToMaxArr = function (maxCount) {
            Object.keys(favExgObj).forEach(function(key) {
                if (favExgObj[key] === maxCount && maxArry.indexOf(key) === -1) {
                    maxArry[maxArry.length] = key;
                }
            });
        }

        Object.keys(favExgObj).forEach(function(key) {
            favoriteExgs[favoriteExgs.length] = key;
            favoriteExgsHitCounts[favoriteExgs.length] = favExgObj[key];
        });

        if (favoriteExgs.length > favoriteExgMaxCount) {
            favoriteExgsHitCounts.sort(function (a, b) {
                return b - a;
            });

            for (let i = 0; i < favoriteExgMaxCount; i++) {
                _addToMaxArr(favoriteExgsHitCounts[i]);
            }
        } else {
            maxArry = favoriteExgs;
        }

        return maxArry;
    }

    addToFavoriteExgs (exchange) {
        let favExgObj = this.favoriteExgs;
        let isExgAvailable = false;

        Object.keys(favExgObj).forEach(function(key) {
            if (exchange === key) {
                favExgObj[key] = favExgObj[key] + 1;
                isExgAvailable = true;
            }
        });

        if (!isExgAvailable) {
            favExgObj[exchange] = 1;
        }

        this.favoriteExgs = favExgObj;
    }

    save() {
        super.save();
    }

    load() {
        return super.load(utils.Constants.StorageType.Local);
    }

    clearLoginToken () {
        this.verToken = ''; // Clear last logged-in token to disable smart login at auth fail
        this.save();
    }
}