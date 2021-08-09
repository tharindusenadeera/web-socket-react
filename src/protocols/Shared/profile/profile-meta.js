import PersistentObject from '../../../models/shared/business-entities/persistent-object';

export default class ProfileMeta extends PersistentObject{
    constructor() {
        super();
        this.cacheKey = 'profileMeta';

        this.id = '';
        this.version = '';
        this.panels = '';
    }
}