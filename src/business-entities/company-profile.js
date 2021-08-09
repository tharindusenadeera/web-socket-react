export default class CompanyProfile {
    
    constructor(companyProfileObject) {
            this.exg=companyProfileObject.exg;
            this.lan=companyProfileObject.lan;
            this.logo= '';                            // Logo
            this.sym= companyProfileObject.sym;        // Symbol
            this.compName= '';                          // Company Name
            this.des = '';                               // Description
            this.indGrp = '';                            // Industry Group
            this.subInd = '';                            // Sub Industry
            this.isin= '';                              // ISIN Code
            this.estbOn= '';                            // Established On
            this.outShr= '';                            // Outstanding Share
            this.listedShr= '';                         // Listed Shares
            this.mktCap1= '';                           // Market Cap
            this.authCap= '';                           // Authorized Capital
            this.trdName= '';                           // Trade Name
            this.currency = '';                          // Currency
            this.country= '';                           // Country
            this.bbgid= '';                             // BBGID
            this.sector= '';                            // Sector
            this.auditor= '';                           // Auditor
            this.compID= '';                            // Company ID

            // Contact Information
            this.addr= '';       // Address
            this.phn= '';        // Tel
            this.fax= '';        // Fax
            this.email= '';      // Email
            this.web= '';        // Website

            this.compManagement= [];
            this.compOwners= [];
            this.compSubsidiaries= [];
    }

    setData (companyProfileData) {
        let that = this;
        Object.keys(companyProfileData).forEach(function(key) {
            that.key =companyProfileData[key];
        });

    }
}