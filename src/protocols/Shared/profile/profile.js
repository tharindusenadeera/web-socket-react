export default class Profile {
    constructor() {
        this.Id = '';
        this.Version = '';
        this.ProductId = '';
        this.Name = '';
        this.panels = '';
        this.Components = [];
        this.BillingCode = '';
    }

    setData (profileData) {
        let that = this;

        Object.keys(profileData).forEach(function(key) {
            that.key =profileData[key];
        });
    }
}