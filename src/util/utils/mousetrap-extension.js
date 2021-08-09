/* global Mousetrap */

export default (function (Mousetrap) {
    let _oldBind = window.Mousetrap.prototype.bind;
    let _unBindSuper = window.Mousetrap.prototype.unbind;
    let callbackRegister = {}; // Keep a map of shortcut keys , widget key and callback function


    window.Mousetrap.prototype.bind = function (key, callback, widgetId, action) {
        let that = this;

        if (callbackRegister[key] !== undefined) {
            callbackRegister[key][widgetId] = callback;
        } else {
            callbackRegister[key] = {};
            callbackRegister[key][widgetId] = callback;
            _oldBind.call(that, key, __mouseEventHandler, action); // All keys are bound to a common function
        }
    };

    window.Mousetrap.prototype.unbind = function (key, widgetId, action) {
        let that = this;

        if (callbackRegister[key] !== undefined && callbackRegister[key][widgetId] !== undefined) {
            callbackRegister[key][widgetId] = undefined;
            _unBindSuper.call(that, key, action);
        }
    };

    function __mouseEventHandler(e) {
        let key;

        if (e.altKey) {
            key = 'alt+' + e.key.toLowerCase();
        } else if (e.ctrlKey) {
            key = 'ctrl+' + e.key.toLowerCase();
        } else if (e.shiftKey) {
            key = 'shift+' + e.key.toLowerCase();
        } else {
            key = e.key.toLowerCase();

            if (key === 'escape') {
                key = 'esc';
            } else if (key === ' ') {
                key = 'space';
            }
        }

        let activeWidget = window.appGlobal.activeWidget; // Get current active widget
        let callBack;

        if (callbackRegister[key].global) {
            callBack = callbackRegister[key].global; // Global shortcut keys
        } else {
            callBack = callbackRegister[key][activeWidget]; // Shortcuts which bound to widget keys
        }

        if (callBack !== undefined) {
            return callBack.call(e);
        }

        return true;
    }
})(Mousetrap);