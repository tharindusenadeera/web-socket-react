export default class CompanyManagement {
    constructor () {
        this.name = '';         // Name
        this.desig = '';        // Designation
        this.date = '';         // Date
        this.sortOrder = '';    // Sort Order
    }

    setData (companyManagmentData) {
        let that =this;
        Object.keys(companyManagmentData).forEach(function(key) {
            that.key =companyManagmentData[key];
        });
    }
}