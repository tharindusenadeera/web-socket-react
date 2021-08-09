import Ember from 'ember';
import PriceConstant from '../../../../ua-kernal/models/price/price-constants';
import utils from '../../../../ua-kernal/utils/utils';
import sharedService from '../../../../ua-kernal/models/shared/shared-service';

//TODO: [Jayanes] Need to convert this file (computed property)
/*export default Ember.Object.extend({
    id: '',                // Announcement id - Unique identifier
    exg: '',               // Exchange or news provider
    sym: '',               // Symbol
    ln: '',                // Language
    hed: '',               // Header
    bod: '',               // Body
    ref: '',               // Reference Code
    type: PriceConstant.ResponseType.Data.ResponseAnnouncement,    // 11 - Announcement, 77 - News, ?? - Calendar Event
    isRead: false,         // Read or not
    dt: '',                // Date Time
    dSymExg: '',           // Display Symbol (dSym) or Exchange (de)

    dHed: function () {
        return utils.formatters.convertUnicodeToNativeString(this.get('hed'));
    }.property('hed'),     // Display Header

    dBody: function () {
        return utils.formatters.convertUnicodeToNativeString(this.get('bod'));
    }.property('bod'),     // Display Body

    tzoAdjTime: function () {
        var exgObj = sharedService.getService('price').exchangeDS.getExchange(this.get('exg'));
        var tzoAdjDateTime = utils.formatters.adjustToTimezone(this.get('dateObj'), exgObj.tzo);

        return utils.formatters.convertToDisplayTimeFormat(tzoAdjDateTime, 'YYYYMMDD HHmm');
    }.property('dt'),

    dDt: function () {
        return utils.formatters.formatToDateTimeMinute(this.get('tzoAdjTime'));
    }.property('tzoAdjTime'),      // Display date Time

    isAnnouncement: function () {
        return (this.type === PriceConstant.ResponseType.Data.ResponseAnnouncement);
    }.property('type'),

    isNews: function () {
        return (this.type === PriceConstant.ResponseType.Data.ResponseNews);
    }.property('type'),

    isBodyUpdated: function () {
        return utils.validators.isAvailable(this.bod);
    }.property('bod'),

    isArabic: function () {
        return (this.get('ln') === 'AR');
    }.property('ln'),

    dateObj: function () {
        var dateTime = this.get('dt');
        return utils.formatters.convertStringToDate(dateTime);
    }.property('dt'),

    setData: function (announcementMessage) {
        var that = this;

        Ember.$.each(announcementMessage, function (key, value) {
            that.set(key, value);
        });
    }
});*/

