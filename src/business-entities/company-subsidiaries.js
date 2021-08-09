export default class CompanySubsidiaries {
    constructor () {
        this.subsiName ='';
        this.subsiSherPrs ='';
    }

    setData (companySubsidiariesData) {
        let that = this;
        Object.keys(companySubsidiariesData).forEach(function(key) {
            that.key =companySubsidiariesData[key];
        });
    }
}