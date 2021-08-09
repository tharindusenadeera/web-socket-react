export default (function () {
    let maxLevel = 3;

    let mergeConfigSettings = function (configInstance, changedSettings, overrideDisabled) {
        let isSettingsChanged = false;

        if (configInstance && changedSettings) {
            if (typeof changedSettings === 'object' && changedSettings !== null) {
                isSettingsChanged = _scanSetting(configInstance, '', changedSettings, 1, overrideDisabled);
            }
        }

        return isSettingsChanged;
    };

    let _scanSetting = function (configInstance, settingsProp, settingsObj, level, overrideDisabled) {
        let isSettingsChanged = false;

        Object.keys(settingsObj).forEach(function(key) {
            if (typeof settingsObj[key] === 'object' && settingsObj[key] !== null && level <= maxLevel) {
                if (!configInstance[key]) {
                    configInstance[key] = {};
                }

                _scanSetting(configInstance[key], key, settingsObj[key], level + 1, overrideDisabled);
            } else {
                if (overrideDisabled) {
                    if (!configInstance[key]) {
                        configInstance[key] = settingsObj[key];
                        isSettingsChanged = true;
                    }
                } else {
                    configInstance[key] = settingsObj[key];
                }
            }
        });

        return isSettingsChanged;
    };

    return {
        mergeConfigSettings: mergeConfigSettings
    };
})();