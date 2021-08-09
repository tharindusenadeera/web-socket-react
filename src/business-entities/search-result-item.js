import Ember from 'ember';
import appConfig from '../../../../ua-kernal/config/app-config';

//TODO: [Jayanes] Need to convert this file (computed property)
/*export default Ember.Object.extend({
    sym: '',               // Symbol
    lDes: '',              // Long Description
    sDes: '',              // Short Description
    dSym: '',              // Display Symbol
    exg: '',               // Exchange
    inst: '',              // Instrument Type
    ast: '',               // Asset Type
    type: -1,              // Search result type
    isDisLDes: false,      // Display long description
    priority: 0,           // For sorting the final array
    cid: '',               // Company Id

    setData: function (message) {
        var that = this;

        Ember.$.each(message, function (key, value) {
            that.set(key, value);
        });
    },

    dispProp1: function () {    // TODO [Pradeep] Merge this with stock object
        var that = this;
        var dispValue = '';
        var dispValueArray = [];
        var dispConfig = appConfig.customisation.displayProperties;
        var property = (dispConfig && dispConfig.dispProp1) ? dispConfig.dispProp1 : 'dSym';

        if (Ember.$.isArray(property)) {
            Ember.$.each(property, function (indexValue, propValue) {
                var valueForProp = that.get(propValue);

                if (valueForProp) {
                    dispValueArray[dispValueArray.length] = valueForProp;
                }
            });

            dispValue = dispValueArray.join(' - ');
        } else {
            dispValue = this.get(property);
        }

        return dispValue;
    }.property('sDes')
});*/
