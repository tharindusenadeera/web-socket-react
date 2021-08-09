// import Ember from 'ember';
import sharedService from '../../../../ua-kernal/models/shared/shared-service';
import priceConstants from '../../../../ua-kernal/models/price/price-constants';
import priceWidgetConfig from '../../../config/price-widget-config';


//TODO: [Jayanes] Need to convert this file (computed property)
/*export default Ember.Object.extend({

    sym: '',               // Symbol
    exg: '',               // Exchange
    token: '',             // Alert Token
    status: '',            // Alert Status
    ts: '',                // Time Stamp
    param: '',             // Alert Parameter
    crit: '',              // Alert Criteria
    val: '',               // Alert Value
    tval: '',              // Alert Trigger Value
    trv: '',               // Alert Triggered Value
    tts: '',               // Triggered Time Stamp
    exp: '',               // Expiry time period
    flt: '',               // Alert Filter
    dispProp1: '',         // Alert Symbol Display Property
    deci: '',              // Alert Symbol Decimal Places

    // Since param, crit, val are important for alert object, below assignments done in business entity
    setFilterComponents: function () {
        var filter = this.get('flt');
        var splitConstant = '#';
        var stock = sharedService.getService('price').stockDS.getStock(this.get('exg'), this.get('sym'));

        if (filter) {
            var filterComponents = filter.split(splitConstant);

            if (filterComponents.length > 2) {
                var that = this;
                var paramSplitConstant = '$';
                var alertType = filterComponents[0].split(paramSplitConstant)[1];
                var parameters = priceWidgetConfig.alert.parameters;

                Ember.$.each(parameters, function (key, value) {
                    if (alertType === value.field) {
                        if (value.isDecimalAllowed){
                            that.set('deci', stock.get('deci'));
                        } else {
                            that.set('deci', 0);
                        }
                    }
                });

                this.set('param', priceConstants.AlertParamMap[alertType]);
                this.set('dispProp1', stock.get('dispProp1'));
                this.set('crit', filterComponents[1]);
                this.set('val', filterComponents[2]);
            }
        }
    },

    isEditEnabled: function () {
        return this.get('status') === priceConstants.AlertStatus.Active;     // Status from server comes as 'active'
    }.property('status'),

    setData: function (alertMessage) {
        var that = this;

        Ember.$.each(alertMessage, function (key, value) {
            that.set(key, value);
        });

        this.setFilterComponents();
    }
});*/
