import PersistentObject from "./PersistentObject";
import utils from '../../../util/utils/utils';

export default class WindowState extends PersistentObject{
    constructor() {
        super();
        this.cacheKey = 'windowState';
        this.windowIds = [];
    }

    save () {
        super.save(utils.Constants.StorageType.Local);
    }

    load () {
        return super.load(utils.Constants.StorageType.Local);
    }

    getPersistentData () {
        return {windowIds: this.windowIds};
    }
}