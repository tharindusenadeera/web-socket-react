import Component from './component';
import utils from '../../../util/utils/utils';

export default (function () {
    let componentParams = {
        componentTypeId: 1,
        status: 0,
        type: 'tab',
        permissionList: null,
        idShift: 1000,
        noOfDefaultComponents: 5,
        version: 0,
        defaultId: -1
    };

    let fileIdExtension = {
        'productVersionComponent': '00',
        'sharedVersionComponent': '00',
        'userSettings': '11',
        'priceUserData': '10',
        'userState': '12',
        'workspace': '0'
    };

    let profileType = {
        product: 'product',
        shared: 'shared'
    };

    let sharedComponentsMap = {};
    let productComponentsMap = {};
    let versionCompMap = {};

    let getUserComponents = function (profType) {
        let componentMap = profType === profileType.shared ? sharedComponentsMap : productComponentsMap;
        return componentMap;
    };

    let getComponentName = function (name) {
        return utils.webStorage.getKey(name);
    };

    let getVersionComponentMap = function () {
        return versionCompMap;
    };

    let _getFileIdExtension = function (compName) { // give file ID extension after passing component name as parameter
        let idExtension;

        Object.keys(fileIdExtension).forEach(function(key) {
            if (utils.webStorage.getKey(fileIdExtension[key]) === compName) {
                idExtension = key;
                return false;
            }
        });

        return idExtension;
    };

    let updateComponentMap = function () { // update maps with component and profile id's
        updateComponentId(productComponentsMap, versionCompMap, getComponentName('productVersionComponent'));
        updateComponentId(sharedComponentsMap, versionCompMap, getComponentName('sharedVersionComponent'));
    };

    let updateComponentId = function (componentMap, versionComponentMap, versionCompName) {
        Object.keys(componentMap).forEach(function(key) {
            if (key.ProfileId === componentParams.defaultId) {
                key.ProfileId = versionComponentMap[versionCompName].ProfileId;
                key.Id = _generateComponentId(versionComponentMap[versionCompName].ProfileId, _getFileIdExtension(componentMap[key]));
            }

        });
    };

    let updateComponentMapContent = function (compName, compValue, profType) {
        let componentMap = profType === profileType.shared ? sharedComponentsMap : productComponentsMap;

        if (componentMap[compName]) { // check for name availability in component map
            componentMap[compName].Contents = compValue; // update content
        } else {
            _createComponentInMap(compName, compValue, profType);
        }
    };

    let _generateComponentId = function (profileId, id) {
        let compId = parseInt((profileId.toString() + id), 10);
        return compId;
    };

    let _createComponentInMap = function (compName, contentValue, profType) {
        let versionCompName = profType === profileType.product ? getComponentName('productVersionComponent') : getComponentName('sharedVersionComponent');
        let componentMap = profType === profileType.shared ? sharedComponentsMap : productComponentsMap;
        let profileId = profType && versionCompMap[versionCompName] ? versionCompMap[versionCompName].ProfileId : componentParams.defaultId; // get profile id using version component
        let compId = profType ? _generateComponentId(profileId, _getFileIdExtension(compName)) : componentParams.defaultId;

        let newComponentObj = new Component({
            Id: compId,
            ComponentTypeId: componentParams.componentTypeId,
            Status: componentParams.status,
            ProfileId: profileId,
            Version: componentParams.version,
            Name: compName,
            Type: componentParams.type,
            Contents: (typeof contentValue === 'object') ? utils.jsonHelper.convertToJson(contentValue) : contentValue
        });

        componentMap[compName] = newComponentObj;
    };

    let createVersionComponentInMap = function (profileId, profType) {
        let versionCompName = profType === profileType.product ? getComponentName('productVersionComponent') : getComponentName('sharedVersionComponent');
        let versionCompID = _generateComponentId(profileId, _getFileIdExtension(versionCompName));

        let newComponentObj = new Component({
            Id: versionCompID,
            ProfileId: profileId,
            Version: 0,
            Name: versionCompName,
            Contents: {}
        });

        versionCompMap[versionCompName] = newComponentObj;
        return newComponentObj;
    };

    return {
        updateComponentMap: updateComponentMap,
        createVersionComponentInMap: createVersionComponentInMap,
        getUserComponents: getUserComponents,
        getVersionComponentMap: getVersionComponentMap,
        updateComponentMapContent: updateComponentMapContent,
        getComponentName: getComponentName,
        componentParams: componentParams
    };
})();