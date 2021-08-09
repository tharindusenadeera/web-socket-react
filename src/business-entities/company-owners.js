export default class CompanyOwners {
    constructor () {
       this.ownerName = '';       // Owners Name
        this.sherPrs  = '';       // Share parentage
        this.ownerDesig = '';     // Owner Designation
    }

    setData (companyOwnersData) {
        let that = this;
        Object.keys(companyOwnersData).forEach(function(key) {
            that.key =companyOwnersData[key];
        });

    }
}