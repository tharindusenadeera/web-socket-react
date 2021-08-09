export default class Sector {
    constructor(sectorObject) {
        this.sec = sectorObject.sec;
        this.des = sectorObject.des;
    }

    setData (sectorMessage) {
        let that = this;

        Object.keys(sectorMessage).forEach(function(key) {
            that.key =sectorMessage[key];
        });
    }

}