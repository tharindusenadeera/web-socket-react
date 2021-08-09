export default class DayLightSaving {
    constructor (dayLightSavingObj) {
        this.tzId = dayLightSavingObj.tzId;
        this.sDate = dayLightSavingObj.sDate;
        this.eDate = dayLightSavingObj.eDate;
        this.dls =  dayLightSavingObj.dls;
    }

    setData (dlsObj) {
        let that = this;
        Object.keys(dlsObj).forEach(function(key) {
            that.key =dlsObj[key];
        });
    }
}