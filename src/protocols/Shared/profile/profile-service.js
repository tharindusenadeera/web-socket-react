import WebConnection from '../../CommunicationAdapter/WebHttpConnection';
import utils from '../../../util/utils/utils';
import profileDS from './profile-data-store';
import { getService, userSettings, userState } from '../SharedServices';
import appEvents from '../../app-events';
// import LanguageDataStore from '../language/language-data-store';
import appConfig from '../../config/AppConfig';

export default (function () {
    // TODO: [Sahan] Discuss case for these variable names.
    let requestParams = {
        getUserProfile: {
            requestType: 175,
            version: 1
        },

        modifyUserProfile: {
            requestType: 275,
            isSavePanel: 0
        },

        getUserComponent: {
            requestType: 565,
            version: 0,
            type: 1
        },

        addUserComponent: {
            requestType: 555,
            version: 1,
            type: 1,
            panel: 'HTML5'
        },

        modifyComponent: {
            requestType: 575,
            version: 1,
            type: 1,
            panel: 'HTML5'
        }
    };

    let urlType = 'profile';
    let generalQueueUpdateInterval = appConfig.profileServiceConfig.generalQueueTimer;
    let priorityQueueUpdateInterval = appConfig.profileServiceConfig.priorityQueueTimer;
    let sharedComponentsMap = {};
    let productComponentsMap = {};
    let versionCompMap = {};
    let priorityQueue = {};
    let generalQueue = {};
    let productVersionCompName;
    let sharedVersionCompName;
    let isVerCompLoaded = false;
    let count = 0;
    let needRefresh = false;
    let isUpdateProfileReceived = false;
    let isLoginUserChanged = false;

    let profileType = {
        product: 'product',
        shared: 'shared'
    };

    let initialize = function () {
        if (appConfig.customisation.profileServiceEnabled) {
            setTimeout(function () {
                _updateProfilePeriodically();
            }, priorityQueueUpdateInterval);

            appEvents.subscribeAppClose(this);
            appEvents.subscribeEvent('onLoginUserChanged', 'profileService', this);
        }
    };

    let onLoginUserChanged = function () {
        isLoginUserChanged = true;
        _getUserProfile(profileType.product, _loadSharedProfileFromServer);
    };

    let handleProfileService = function () {
        try {
            if (appConfig.customisation.profileServiceEnabled && !isLoginUserChanged) {

                let numberOfVersionComp = Object.keys(versionCompMap).length;

                if (numberOfVersionComp) {
                    if (numberOfVersionComp === 2) {
                        _loadVersionComponentFromServer(profileType.product, versionCompMap[productVersionCompName], _loadSharedComponentsFromServer);
                    } else if (numberOfVersionComp === 1) {
                        let verCompName = Object.keys(versionCompMap);

                        if (verCompName[0] === productVersionCompName) {
                            _loadVersionComponentFromServer(profileType.product, versionCompMap[productVersionCompName], _loadSharedProfileFromServer);
                        } else {
                            _getUserProfile(profileType.product, _loadSharedComponentsFromServer);
                        }
                    }
                } else {
                    _getUserProfile(profileType.product, _loadSharedProfileFromServer);
                }
            }
        } catch (e) {
            utils.logger.logError('Error in handling profile service: ' + e);
        }
    };

    let loadProfileMeta = function () {
        try {
            if (appConfig.customisation.profileServiceEnabled) {
                productComponentsMap = profileDS.getUserComponents(profileType.product);
                sharedComponentsMap = profileDS.getUserComponents(profileType.shared);
                versionCompMap = profileDS.getVersionComponentMap();
                productVersionCompName = profileDS.getComponentName('productVersionComponent');
                sharedVersionCompName = profileDS.getComponentName('sharedVersionComponent');

                let isProdVerCompInLS = utils.webStorage.contains(productVersionCompName, utils.Constants.StorageType.Local);
                let isSharedVerCompInLS = utils.webStorage.contains(sharedVersionCompName, utils.Constants.StorageType.Local);

                if (isProdVerCompInLS) {
                    _loadComponentsToMap(profileType.product); // load product version component and data components to maps
                }

                if (isSharedVerCompInLS) {
                    _loadComponentsToMap(profileType.shared); // load shared version component and data components to maps
                }
            }
        } catch (e) {
            utils.logger.logError('Error in loading profile Meta data: ' + e);
        }
    };

    let _loadComponentsToMap = function (profType) {
        let versionCompName = profType === profileType.product ? productVersionCompName : sharedVersionCompName;
        let versionComp = utils.webStorage.getObject(versionCompName, utils.Constants.StorageType.Local);

        versionCompMap[versionCompName] = versionComp;
        _loadDataComponentToMaps(versionComp, profType);
    };

    let _loadDataComponentToMaps = function (verComp, profType) {
        let componentMap = profType === profileType.product ? productComponentsMap : sharedComponentsMap;
        let verCompContents = verComp.Contents;

        Object.keys(verCompContents).forEach(function(key) {
            let str = utils.webStorage.getString(verCompContents[key].name, utils.Constants.StorageType.Local);

            profileDS.updateComponentMapContent(verCompContents[key].name, str, profType);
            componentMap[verCompContents[key].name].Version = verCompContents[key].version;
        });
    };

    let saveComponent = function (key, value, saveImmediately, isSharedComp) { // should pass parameter for product type
       try {
        if (appConfig.customisation.profileServiceEnabled && utils.validators.isAvailable(key) && utils.validators.isAvailable(value)) {
            if (isVerCompLoaded) { // ignore default comp added to queues
                profileDS.updateComponentMapContent(key, value, profileType.product); // hardcoded product type

                if (saveImmediately) {
                    if (generalQueue[key] && generalQueue[key].changeAvailable) {
                        generalQueue[key].changeAvailable = false;
                    }

                    if (!(priorityQueue[key] && priorityQueue[key].changeAvailable)) {
                        priorityQueue[key] = {changeAvailable: true, isShared: isSharedComp};
                    }
                } else {
                    if (!(priorityQueue[key] && priorityQueue[key].changeAvailable)) {
                        if (!(generalQueue[key] && generalQueue[key].changeAvailable)) {
                            generalQueue[key] = {changeAvailable: true, isShared: isSharedComp};
                        }
                    }
                }
            } else {
                profileDS.updateComponentMapContent(key, value);
            }
        }
       } catch (e) {
           utils.logger.logError('Error in save component in profile service: ' + e);
       }
    };

    let _getUserProfile = function (profType, profileLoadedCallback) {
        if (appConfig.customisation.profileServiceEnabled) {
            let url = _generateGetUserProfileUrl(profType);

            _sendRequest({
                url: url,
                type: 'GET',
                contentType: undefined,
                data: undefined
            }, function (responseObj) {
                _processGetUserProfileResponse(profType, responseObj, profileLoadedCallback);
            }, _onError);
        }
    };

    let _getProfileId = function (profType) { // return profile is from version component map
        let versionCompName = profType === profileType.product ? productVersionCompName : sharedVersionCompName;
        return versionCompMap[versionCompName].ProfileId;
    };

    let _filterChangedComponent = function (queue, productChangedCompArray, sharedChangedCompArray) { // add queues changes to respective array's
        Object.keys(queue).forEach(function(key) {
            let componentMap = queue[key].isShared ? sharedComponentsMap : productComponentsMap;
            let changedCompArray = queue[key].isShared ? sharedChangedCompArray : productChangedCompArray;

            if (queue[key] && queue[key].changeAvailable) { // change available key's, components, add to change component array
                queue[key].changeAvailable = false;
                changedCompArray.push(componentMap[key]);
            }
        });
    };

    let _processChangedDataComponentToServer = function (changedCompArray, profType, addComponentArray, modifyComponentArray) {
        let isNewUser = false;
        let verCompName = profType === profileType.product ? productVersionCompName : sharedVersionCompName;

        Object.keys(changedCompArray).forEach(function(key) {
            let contents = versionCompMap[verCompName].Contents;
            changedCompArray[key].Version++; // increase version in data object

            if (contents[changedCompArray[key].Id]) { // existing user component available in version comp
                modifyComponentArray.push( changedCompArray[key]);
                contents[changedCompArray[key].Id].version++; // increase version inside version comp
            } else {
                addComponentArray.push(changedCompArray[key]);
                contents[changedCompArray[key].Id] = {name: changedCompArray[key].Name, version: changedCompArray[key].Version};
                isNewUser = versionCompMap[verCompName].Version === 0;
            }
        });

        return isNewUser;
    };

    let _sendChangedVersionComponentToServer = function (isNewUser, profType) {
        let verCompName = profType === profileType.product ? productVersionCompName : sharedVersionCompName;
        let verComp = versionCompMap[verCompName];

        versionCompMap[verCompName].Version++;
        utils.webStorage.addObject(verComp.Name, verComp, utils.Constants.StorageType.Local);
        verComp.Contents = utils.jsonHelper.convertToJson(verComp.Contents);

        if (isNewUser) {
            _addComponent(verComp, profType);
        } else {
            _modifyComponent(verComp, profType);
        }

        verComp.Contents = utils.jsonHelper.convertFromJson(verComp.Contents); // convert back contents in versionCompMap
    };

    let _processQueues = function () {
        if (isVerCompLoaded) {
            let productChangedCompArray = [];
            let sharedChangedCompArray = [];

            _filterChangedComponent(priorityQueue, productChangedCompArray, sharedChangedCompArray); // priority queue process with priorityQueueUpdateInterval

            if (count >= (generalQueueUpdateInterval / priorityQueueUpdateInterval)) {
                _filterChangedComponent(generalQueue, productChangedCompArray, sharedChangedCompArray); // general queue process with generalQueueUpdateInterval
                count = 0;
            }

            count++;

            if (productChangedCompArray.length > 0) {
                _handleComponentRequest(productChangedCompArray, profileType.product);
            }

            if (sharedChangedCompArray.length > 0) {
                _handleComponentRequest(sharedChangedCompArray, profileType.shared);
            }
        }
    };

    let _handleComponentRequest = function (ChangedCompArray, profType) {
        let addComponentArray = [];
        let modifyComponentArray = [];
        let isNewUser = _processChangedDataComponentToServer(ChangedCompArray, profType, addComponentArray, modifyComponentArray);

        // pass two arrays, function to handle modify components and function to send version component
        _sendAddComponentRequestToServer(addComponentArray, modifyComponentArray, _sendModifyComponentRequestToServer, profType, isNewUser, _sendChangedVersionComponentToServer);
    };

    let _sendAddComponentRequestToServer = function (addCompArray, modifyCompArray, callbackAddCompFunction, profType, isNewUser, callbackFromAddAndModifyComp) {
        if (addCompArray.length > 0) {
            _addComponent(addCompArray[0], profType, function () {
                try {
                    addCompArray.shift();
                    _sendAddComponentRequestToServer(addCompArray, modifyCompArray, callbackAddCompFunction, profType, isNewUser, callbackFromAddAndModifyComp);
                } catch (e) {
                    utils.logger.logError('Error in send add component request to server: ' + e);
                }
            });
        } else {
            if (callbackAddCompFunction instanceof Function) {
                callbackAddCompFunction(modifyCompArray, profType, isNewUser, callbackFromAddAndModifyComp);
            }
        }
    };

    let _sendModifyComponentRequestToServer = function (modifyCompArray, profType, isNewUser, callbackFromAddAndModifyComp) {
        if (modifyCompArray.length > 0) {
            _modifyComponent(modifyCompArray[0], profType, function () {
                try {
                    modifyCompArray.shift();
                    _sendModifyComponentRequestToServer(modifyCompArray, profType, isNewUser, callbackFromAddAndModifyComp);
                } catch (e) {
                    utils.logger.logError('Error in send modify component request to server: ' + e);
                }
            });
        } else {
            if (callbackFromAddAndModifyComp instanceof Function) {
                callbackFromAddAndModifyComp(isNewUser, profType);
            }
        }
    };

    let _generateGetComponentUrl = function (componentID, profType) {
        let pdm = profType === profileType.shared ? appConfig.customisation.sharedProductType : appConfig.profileServiceConfig.productPDM;

        let queryParams = {
            RT: requestParams.getUserComponent.requestType,
            VER: requestParams.getUserComponent.version,
            TYPE: requestParams.getUserComponent.type,
            COMPID: componentID,
            PDM: pdm
        };

        return utils.requestHelper.generateQueryString(urlType, queryParams, _getGeneralQueryParams());
    };

    let _generateAddComponentData = function (comp, profType) {
        let pdm = profType === profileType.shared ? appConfig.customisation.sharedProductType : appConfig.profileServiceConfig.productPDM;

        let queryParams = {
            RT: requestParams.addUserComponent.requestType,
            COMP: comp,
            PANEL: requestParams.addUserComponent.panel,
            VER: requestParams.addUserComponent.version,
            TYPE: requestParams.addUserComponent.type,
            PDM: pdm
        };

        return utils.requestHelper.generateQueryString(undefined, queryParams, _getGeneralQueryParams());
    };

    let _generateModifyComponentData = function (comp, profType) {
        let pdm = profType === profileType.shared ? appConfig.customisation.sharedProductType : appConfig.profileServiceConfig.productPDM;

        let queryParams = {
            RT: requestParams.modifyComponent.requestType,
            COMP: comp,
            PANEL: requestParams.modifyComponent.panel,
            VER: requestParams.modifyComponent.version,
            TYPE: requestParams.modifyComponent.type,
            PID: _getProfileId(profType),
            PDM: pdm
        };

        return utils.requestHelper.generateQueryString(undefined, queryParams, _getGeneralQueryParams());
    };

    let _sendComponentRequest = function (comp, data, callbackFunction, profType, callbackObj) {
        _sendRequest({
            url: urlType,
            type: 'POST',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            data: data
        }, function () {
            if (callbackFunction instanceof Function) {
                callbackFunction(callbackObj, profType);
            }
        });
    };

    let _addComponent = function (comp, profType, callbackFunction) {
        let stringComp = utils.jsonHelper.convertToJson(comp);
        _sendComponentRequest(stringComp, _generateAddComponentData(stringComp, profType), callbackFunction, profType);
    };

    let _modifyComponent = function (comp, profType, callbackFunction, callbackObj) {
        let stringComp = utils.jsonHelper.convertToJson(comp);
        _sendComponentRequest(stringComp, _generateModifyComponentData(stringComp, profType), callbackFunction, profType, callbackObj);
    };

    let _createVersionContentObject = function (obj) {
        return {
            name: obj.name,
            version: obj.version
        };
    };

    let _processVersionComponent = function (compObj, profType, versionComponentProcessedCallback) {
        let data = compObj.DAT;

        if (data) {
            let serverVersionCompContents = utils.jsonHelper.convertFromJson(data.Contents);
            let versionCompName = profType === profileType.product ? productVersionCompName : sharedVersionCompName;
            let localVersionComp = versionCompMap[versionCompName];
            let localVersionCompContents = localVersionComp.Contents;
            let commonCompID = [];
            let isAllServerAndLocalComponentsEqual = true; // to find any version or component mismatch in LS and Server
            let mergeVersionComp = {};
            let loadCompID = [];
            let addComponentArray = [];
            let modifyComponentArray = [];

            let componentMap = profType === profileType.product ? productComponentsMap : sharedComponentsMap;

            Object.keys(serverVersionCompContents).forEach(function(key,index) {
                let isInLocalObj = false;

                Object.keys(localVersionCompContents).forEach(function(key,localCompId) {
                    if (index === localCompId) {
                        commonCompID.push(localCompId);
                        isInLocalObj = true;

                        if (serverVersionCompContents[key].version > localVersionCompContents[key].version) {
                            isAllServerAndLocalComponentsEqual = false;
                            needRefresh = true;
                            isUpdateProfileReceived = true;
                            loadCompID.push(localCompId);
                            mergeVersionComp[localCompId] = _createVersionContentObject(serverVersionCompContents[key]);
                        } else if (serverVersionCompContents[key].version < localVersionCompContents[key].version) {
                            isAllServerAndLocalComponentsEqual = false;
                            modifyComponentArray.push(componentMap[localVersionCompContents[key].name]);
                            mergeVersionComp[localCompId] = _createVersionContentObject(localVersionCompContents[key]);
                        } else {
                            mergeVersionComp[localCompId] = _createVersionContentObject(localVersionCompContents[key]);
                        }

                        return false;
                    }
                });

                if (!isInLocalObj) { // find components which are not in LS
                    isAllServerAndLocalComponentsEqual = false;
                    needRefresh = true;
                    loadCompID.push(index);
                    mergeVersionComp[index] = _createVersionContentObject(serverVersionCompContents[key]);
                }
            });

            Object.keys(localVersionCompContents).forEach(function(key,localCompId) {
                if (!commonCompID.includes(localCompId)) {
                    isAllServerAndLocalComponentsEqual = false;
                    addComponentArray.push(componentMap[localVersionCompContents[key].name]);
                    mergeVersionComp[localCompId] = _createVersionContentObject(localVersionCompContents[key]);
                }
            });


            if (!isAllServerAndLocalComponentsEqual) {
                localVersionComp.Version = data.Version > localVersionComp.Version ? data.Version : localVersionComp.Version;
                localVersionComp.Contents = mergeVersionComp;
                utils.webStorage.addObject(localVersionComp.Name, localVersionComp, utils.Constants.StorageType.Local);
                versionCompMap[versionCompName] = localVersionComp;

                let arrayObj = {
                    versionComp: localVersionComp,
                    addComponentArray: addComponentArray,
                    modifyComponentArray: modifyComponentArray
                };

                _modifyVersionComponent(localVersionComp, profType, _addVersionCompCallback, arrayObj); // modify version component in server
            }

            _loadDataComponentsFromServer(loadCompID, versionComponentProcessedCallback, profType);
        }
    };

    let _addVersionCompCallback = function (arrayObj, profType) { // handle after version component modify request
        let addComponentArray = arrayObj.addComponentArray;
        let modifyComponentArray = arrayObj.modifyComponentArray;
        let comp = arrayObj.versionComp;

        comp.Contents = utils.jsonHelper.convertFromJson(comp.Contents);
        _sendAddComponentRequestToServer(addComponentArray, modifyComponentArray, _sendModifyComponentRequestToServer, profType);
    };

    let _loadDataComponentsFromServer = function (idArray, callbackFunction, profType) {
        if (idArray.length > 0) {
            _loadDataComponentFromServer(profType, idArray[0], function () {
                try {
                    idArray.shift();
                    _loadDataComponentsFromServer(idArray, callbackFunction, profType);
                } catch (e) {
                    utils.logger.logError('Error in response for get data component request: ' + e);
                }
            });
        } else {
            if (callbackFunction instanceof Function) {
                callbackFunction(profType);
            }
        }
    };

    let _loadDataComponentFromServer = function (profType, id, dataCompLoadedCallback) {
        _loadComponentFromServer(profType, id, _processDataComponent, dataCompLoadedCallback);
    };

    let _loadVersionComponentFromServer = function (profType, comp, versionComponentProcessedCallback) {
        let callbackObj = {
            processVersionComponent: _processVersionComponent,
            versionComponentProcessedCallback: versionComponentProcessedCallback
        };

        _loadComponentFromServer(profType, comp.Id, callbackObj);
    };

    let _loadComponentFromServer = function (profType, componentId, handleResponse, oneCompLoadedCallback) {
        if (appConfig.customisation.profileServiceEnabled) {
            let url = _generateGetComponentUrl(componentId, profType);

            _sendRequest({
                url: url,
                type: 'GET',
                contentType: undefined,
                data: undefined
            }, function (responseObj) {
                if (handleResponse instanceof Function) { // handle data component process callback
                    handleResponse(responseObj, profType);
                } else {
                    handleResponse.processVersionComponent(responseObj, profType, handleResponse.versionComponentProcessedCallback); // handle version component process callback with param's
                }

                if (oneCompLoadedCallback instanceof Function) {
                    oneCompLoadedCallback();
                }
            }, _onError);
        }
    };

    let _processDataComponent = function (dataObj, profType) {
        try {
            if (dataObj) {
                let dataComp = dataObj.DAT;

                utils.webStorage.addString(dataComp.Name, dataComp.Contents, utils.Constants.StorageType.Local);
                _saveDataComponentInMap(profType, dataComp);
            }
        } catch (e) {
            utils.logger.logError('Error in response for get data component ' + e);
        }
    };

    let _loadSharedComponentsFromServer = function () {
        _loadVersionComponentFromServer(profileType.shared, versionCompMap[sharedVersionCompName].Id, _loadedComponents);
    };

    let _loadedComponents = function () {
        isVerCompLoaded = true;
        profileDS.updateComponentMap();

        if (needRefresh) {
            _reloadApp();
        }
    };

    let _modifyVersionComponent = function (comp, profType, callbackFunction, callbackObj) {
        comp.Contents = utils.jsonHelper.convertToJson(comp.Contents);
        _modifyComponent(comp, profType, callbackFunction, callbackObj);
    };

    let _sendRequest = function (params, onSuccess, onError) {
        WebConnection.sendAjaxRequest({
            url: params.url,
            type: params.type,
            contentType: params.contentType,
            data: params.data,

            onSuccess: function (dataObj) {
                if (onSuccess instanceof Function) {
                    onSuccess(dataObj);
                }
            },

            onError: function () {
                if (onError instanceof Function) {
                    onError();
                }
            }
        });
    };

    let _generateGetUserProfileUrl = function (profType) {
        let pdm = profType === profileType.shared ? appConfig.customisation.sharedProductType : appConfig.profileServiceConfig.productPDM;
        let bcd = getService('trade').userDS.get('billingCode');

        let queryParams = {
            RT: requestParams.getUserProfile.requestType,
            VER: requestParams.getUserProfile.version,
            BCD: bcd ? bcd : appConfig.profileServiceConfig.billingCode,
            PDM: pdm
        };

        return utils.requestHelper.generateQueryString(urlType, queryParams, _getGeneralQueryParams());
    };

    let _reloadApp = function (msg, isInfo) {
        getService('sharedUI').loginViewController.showAuthFailMessage(msg, true, isInfo);

        setTimeout(function () {
            window.location.reload();
        },2000)
    };

    let _getProfileVersion = function (components, profType) {
        let version = 0;
        let compName = profType === profileType.product ? productVersionCompName : sharedVersionCompName;

        Object.keys(components).forEach(function(key) {
            if (components[key].Name === compName) {
                version = components[key].Version;
                return false;
            }
        });

        return version;
    };

    let _processComponents = function (components, profType) {
        let comp = [];
        let ignoreNames = ['glbl123']; // ignore default component

        Object.keys(components).forEach(function(key) {

            if (!ignoreNames.includes(components[key].Name)) {
                comp.push(components[key]);

                if (components[key].Name === productVersionCompName || components[key].Name === sharedVersionCompName) {
                    _saveVersionComponentInMap(components[key]); // save version components in map
                    utils.webStorage.addObject(components[key].Name, components[key], utils.Constants.StorageType.Local);
                } else {
                    _saveDataComponentInMap(profType, components); // save data components in components map
                    utils.webStorage.addString(components[key].Name, components[key].Contents, utils.Constants.StorageType.Local);

                    if (components[key].Name === profileDS.getComponentName('userState')) {
                        userState.load();
                    } else if (components[key].Name === profileDS.getComponentName('userSettings')) {
                        userSettings.load();
                    }
                }
            }
        });

        return comp;
    };

    let _saveDataComponentInMap = function (profType, component) {
        if (profType === profileType.shared) {
            sharedComponentsMap[component.Name] = component;
        } else {
            productComponentsMap[component.Name] = component;
        }
    };

    let _saveVersionComponentInMap = function (component) {
        component.Contents = utils.jsonHelper.convertFromJson(component.Contents);
        versionCompMap[component.Name] = component;
    };

    let _processGetUserProfileResponse = function (profType, dataObj, profileProcessedCallback) {
        try {
            let profileObj = dataObj.DAT;

            if (profileObj) {
                let components = _processComponents(profileObj.Components, profType);

                if (components.length > 0 && _getProfileVersion(components, profType) > 0) { // check for new user
                    needRefresh = true;
                } else {
                    profileDS.createVersionComponentInMap(profileObj.Id, profType); // create version component in map without adding to LS and Server
                }
            } else if (profType !== profileType.shared && window.appGlobal.session.isLoginUserChanged) {
                _onError();
            }

            if (profileProcessedCallback instanceof Function) {
                profileProcessedCallback();
            }
        } catch (e) {
            utils.logger.logError('Error in response for get user profile request: ' + e);
        }
    };

    let _loadSharedProfileFromServer = function () {
        _getUserProfile(profileType.shared, _profileLoadedFromServer); // get shared full profile
    };

    let _profileLoadedFromServer = function () {
        isVerCompLoaded = true;
        profileDS.updateComponentMap();

        // let languageObj = LanguageDataStore.getLanguageObj();

        if (needRefresh) {
            // _reloadApp(languageObj.lang.messages.newProfileLoading, true);

            if (isUpdateProfileReceived) {
                utils.webStorage.addObject(utils.webStorage.getKey(utils.Constants.CacheKeys.LoginUserChanged), {'isLoginUserChanged': true}, utils.Constants.StorageType.Session);
            }
        }
    };

    let _onError = function () {
        // let languageObj = LanguageDataStore.getLanguageObj();
        // utils.messageService.showMessage(languageObj.lang.messages.workspaceLoadingFaild, utils.Constants.MessageTypes.Warning, false);

        if (window.appGlobal.session.isLoginUserChanged) {
            let profileData = utils.webStorage.getObject(utils.webStorage.getKey(utils.Constants.CacheKeys.LoginUserChanged), utils.Constants.StorageType.Session);

            if (profileData.isLoginUserChanged) {
                // getService('sharedUI').loginViewController.showAuthFailMessage(languageObj.lang.messages.workspaceLoadingFaild, true);

                utils.webStorage.remove(utils.webStorage.getKey('userState'), utils.Constants.StorageType.Local);

                userState.setDefaultState();
                userState.load();

                utils.webStorage.remove(utils.webStorage.getKey('userSettings'), utils.Constants.StorageType.Local);
                userSettings.load();

                utils.webStorage.remove(utils.webStorage.getKey('priceUserData'), utils.Constants.StorageType.Local);
                getService('price').priceUserData.load();

                setTimeout(function () {
                    window.location.reload();
                },1500)
            }
        }
    };

    let _updateProfilePeriodically = function () {
        _processQueues();

        setTimeout(function () {
            _updateProfilePeriodically();
        }, priorityQueueUpdateInterval);
    };

    let _getGeneralQueryParams = function () {
        let service;

        if (appConfig.customisation.isTradingEnabled) {
            service = getService('trade');
        } else {
            service = getService('price');
        }

        return {
            UID: service.userDS.usrId,
            SID: service.userDS.sessionId
        };
    };

    let onAppClose = function () {
        _processQueues();
    };

    return {
        initialize: initialize,
        handleProfileService: handleProfileService,
        saveComponent: saveComponent,
        loadProfileMeta: loadProfileMeta,
        onAppClose: onAppClose,
        onLoginUserChanged: onLoginUserChanged,
        profileDS: profileDS
    };
})();