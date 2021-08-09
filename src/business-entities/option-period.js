export default class OptionPeriod {
    constructor (optionPeriodObj) {
        this.optPrd = optionPeriodObj.optPrd;
        this.sym = optionPeriodObj.sym;
        this.exg = optionPeriodObj.exg;
        this.optExg = undefined;
        this.trdExg = undefined;
        this.optWeek = undefined;
    }

    setData (message) {
        let that = this;
        Object.keys(message).forEach(function(key) {
            that.key =message[key];
        });

    }
}