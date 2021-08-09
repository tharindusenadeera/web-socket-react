import utils from '../../../util/utils/utils';
import PersistentObject from "./PersistentObject";

export default class UserState extends  PersistentObject{
    constructor() {
        super();
        this.cacheKey = 'userState';
        this.lastMenu = undefined;
        this.lastTab = undefined;
        this.lastArgs = undefined;
        this.lastInnerWidget = undefined;
        this.defaultWS = {};
        this.globalWidgetConfig = undefined;
        this.customWS = undefined;
        this.customWsRowCount = 1;
        this.customWsColCount = 1;
        this.recentExgs = [];
        this.globalArgs = {};
        this.financialPrimarySym = undefined;
        this.financialSecondarySym = undefined;
        this.defaultFieldList = {
                lastMenu: undefined,
                lastTab: undefined,
                lastArgs: undefined,
                lastInnerWidget: undefined,
                defaultWS: undefined,
                globalWidgetConfig: undefined,
                customWS: undefined,
                customWsRowCount: 1,
                customWsColCount: 1,
                recentExgs: [],
                globalArgs: {},
                financialPrimarySym: undefined,
                financialSecondarySym: undefined
        }
    }

    save() {
        super.save();
    }

    setDefaultState () {
        let defaultFieldList = this.defaultFieldList;

        if (defaultFieldList) {
            let that = this;

            Object.keys(defaultFieldList).forEach(function(key) {
               that.key = defaultFieldList[key];
            });
        }
    }

    load() {
        return super.load(utils.Constants.StorageType.Local, undefined, this._getWindowId());
    }

    remove(windowId) {
        super.remove(utils.Constants.StorageType.Local, undefined, windowId);
    }

    _getWindowId () {
        let windowId = '*';

        // Todo [Jayanes] need to change Ember.appGlobal
     /*   if (Ember.appGlobal.multiScreen && !Ember.appGlobal.multiScreen.isParentWindow) {
            windowId = Ember.appGlobal.queryParams[utils.Constants.EmbeddedModeParams.ChildWindowId];
        }*/

        return windowId;
    }

    getWidgetState (prop) {
        let stateObj;

        if (this.globalWidgetConfig) {
            stateObj = this.globalWidgetConfig[prop];
        }

        return stateObj;
    }

}