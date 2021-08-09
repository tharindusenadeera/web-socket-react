import utils from '../util/utils/utils';

export default (function () {
    let containerController = {};
    let languageSubscription = {};
    let themeSubscription = {};
    let visibilityChangeSubscription = {};
    let workspaceUpdatedSubscription = {};
    let onAppCloseSubscription = {};
    let exchangeSubscriptionMap = {};
    let subMarketSubscriptionMap = {};
    let symbolSubscriptionMap = {};
    let layoutReadySubscriptions = {};
    let orientationSubscriptions = {};
    let onDomReadySubscriptions = {};
    let onWindowResizeSubscriptions = {};

    let eventSubscriberMap = {};


    // TODO: [Bashitha] Handle exceptions for all observer notifications

    let onSymbolChanged = function (symbol, exchange, insType, link) {

        if (utils.validators.isAvailable(link)) {
            let subscriptionMap = symbolSubscriptionMap[link];

            if (subscriptionMap) {
                Object.keys(subscriptionMap).forEach(function(key) {
                    if (subscriptionMap[key]) {
                        try {
                            // Todo [Jayanes] onWidgetKeysChange is calling from mixins/base-widget-mixin.js
                            subscriptionMap[key].onWidgetKeysChange({sym: symbol, exg: exchange, inst: insType});
                        } catch (e) {
                            utils.logger.logError(e);
                        }
                    }
                });
            }

            if (containerController && containerController.saveSettings instanceof Function) {
                // Todo [Jayanes] saveSettings is calling from controller/base-widget-container.js
                containerController.saveSettings(symbol, exchange, insType);
            }
        } else {
            containerController.onSymbolChanged(symbol, exchange, insType);
        }
    };

    let languageChanged = function (language) {
        if (languageSubscription) {
            Object.keys(languageSubscription).forEach(function(key) {
                if (languageSubscription[key] && languageSubscription[key].languageChanged instanceof Function) {
                    languageSubscription[key].languageChanged(language);
                }
            });
        }
    };

    let themeChanged = function (theme) {
        if (themeSubscription) {
            Object.keys(themeSubscription).forEach(function(key) {
                if (themeSubscription[key] && themeSubscription[key].themeChanged instanceof Function) {
                    themeSubscription[key].themeChanged(theme);
                }
            });
        }
    };

    let onVisibilityChanged = function (isHidden) {
        if (visibilityChangeSubscription) {
            Object.keys(visibilityChangeSubscription).forEach(function(key) {
                if (visibilityChangeSubscription[key] && visibilityChangeSubscription[key].onVisibilityChanged instanceof Function) {
                    visibilityChangeSubscription[key].onVisibilityChanged(isHidden);
                }
            });
        }

        onOrientationChanged();
    };

    let onWorkspaceUpdated = function () {
        if (workspaceUpdatedSubscription && workspaceUpdatedSubscription.onWorkspaceUpdated instanceof Function) {
            workspaceUpdatedSubscription.onWorkspaceUpdated();
        }
    };

    let onAppClose = function () {
        Object.keys(onAppCloseSubscription).forEach(function(key) {
            if (onAppCloseSubscription[key] && onAppCloseSubscription[key].onAppClose instanceof Function) {
                onAppCloseSubscription[key].onAppClose();
            }
        });
    };

    let onExchangeChanged = function (link, exg, subMkt) {
        let exchangeSubMap = exchangeSubscriptionMap[link];

        if (exchangeSubMap) {
            Object.keys(exchangeSubMap).forEach(function(key) {
                // Todo [Jayanes] onWidgetKeysChange is calling from mixins/base-widget-mixin.js
                if (exchangeSubMap[key] && exchangeSubMap[key].onWidgetKeysChange instanceof Function) {
                    exchangeSubMap[key].onWidgetKeysChange({
                        exg: exg,
                        subMarket: subMkt
                    });
                }
            });
        }
    };

    let onSubMarketChanged = function (link, subMkt) {
        let subMarketSubMap = subMarketSubscriptionMap[link];

        if (subMarketSubMap) {
            Object.keys(subMarketSubMap).forEach(function(key) {
                // Todo [Jayanes] onWidgetKeysChange is calling from mixins/base-widget-mixin.js
                if (subMarketSubMap[key] && subMarketSubMap[key].onWidgetKeysChange instanceof Function) {
                    subMarketSubMap[key].onWidgetKeysChange({
                        subMarket: subMkt
                    });
                }
            });
        }
    };

    let onOrientationChanged = function () {
        let angle = 0;

        // eslint-disable-next-line no-restricted-globals
        if (!window.appGlobal.isIos && screen && screen.orientation && screen.orientation.angle !== undefined) {
            // eslint-disable-next-line no-restricted-globals
            angle = screen.orientation.angle;
        } else if (window && window.orientation !== undefined) {
            // iOS specific
            angle = window.orientation;
        }

        let isLandscape = angle === 90 || angle === -90 || angle === 270;

        if (window.appGlobal.orientation.isLandscape !== isLandscape) {
            window.appGlobal.orientation.isLandscape = isLandscape;

            if (orientationSubscriptions) {
                Object.keys(orientationSubscriptions).forEach(function(key) {
                    if (orientationSubscriptions[key] && orientationSubscriptions[key].onOrientationChanged instanceof Function) {
                        orientationSubscriptions[key].onOrientationChanged(isLandscape);
                    }
                });
            }
        }
    };

    let onDomReady = function () {
        window.appGlobal.events.isDomReady = true;

        if (onDomReadySubscriptions) {
            Object.keys(onDomReadySubscriptions).forEach(function(key) {
                if (onDomReadySubscriptions[key] && onDomReadySubscriptions[key].onDomReady) {
                    onDomReadySubscriptions[key].onDomReady();
                }
            });
        }
    };

    let onWindowResize = function () {
        if (onWindowResizeSubscriptions) {
            // Todo [Jayanes] onResize() calling components/right-panel-collapse.js
            Object.keys(onWindowResizeSubscriptions).forEach(function(key) {
                if (onWindowResizeSubscriptions[key] && onWindowResizeSubscriptions[key].onResize instanceof Function) {
                    onWindowResizeSubscriptions[key].onResize();
                }
            });
        }
    };

    let subscribeWindowResize = function (subscriber, key) {
        onWindowResizeSubscriptions[key] = subscriber;
    };

    let unSubscribeWindowResize = function (key) {
        if (utils.validators.isAvailable(key)) {
            onWindowResizeSubscriptions[key] = undefined;
        }
    };

    let subscribeSymbolChanged = function (key, subscriber, link) {
        if (link !== undefined) {
            if (link !== 0) {
                symbolSubscriptionMap[link] = symbolSubscriptionMap[link] || {};
                symbolSubscriptionMap[link][key] = subscriber;
            }
        } else {
            containerController = subscriber;
        }
    };

    let unSubscribeSymbolChanged = function (key, link) {
        if (link !== undefined) {
            if (link !== 0) {
                symbolSubscriptionMap[link] = symbolSubscriptionMap[link] || {};
                symbolSubscriptionMap[link][key] = undefined;
            }
        } else {
            containerController = undefined;
        }
    };

    let subscribeLanguageChanged = function (subscriber, key) {
        if (utils.validators.isAvailable(key)) {
            languageSubscription[key] = subscriber;
        }
    };

    let unSubscribeLanguageChanged = function (key) {
        if (utils.validators.isAvailable(key)) {
            languageSubscription[key] = undefined;
        }
    };

    let subscribeThemeChanged = function (subscriber, key) {
        if (utils.validators.isAvailable(key)) {
            themeSubscription[key] = subscriber;
        }
    };

    let unSubscribeThemeChanged = function (key) {
        if (utils.validators.isAvailable(key)) {
            themeSubscription[key] = undefined;
        }
    };

    let subscribeVisibilityChanged = function (subscriber, key) {
        if (utils.validators.isAvailable(key)) {
            visibilityChangeSubscription[key] = subscriber;
        }
    };

    let unSubscribeVisibilityChanged = function (key) {
        if (utils.validators.isAvailable(key)) {
            visibilityChangeSubscription[key] = undefined;
        }
    };

    let subscribeWorkspaceUpdated = function (key, subscriber) {
        if (utils.validators.isAvailable(key)) {
            workspaceUpdatedSubscription[key] = subscriber;
        }
    };

    let unSubscribeWorkspaceUpdated = function (key) {
        if (utils.validators.isAvailable(key)) {
            workspaceUpdatedSubscription[key] = undefined;
        }
    };

    let subscribeAppClose = function (key, subscriber) {
        onAppCloseSubscription[key] = subscriber;
    };

    let subscribeExchangeChanged = function (link, key, subscriber) {
        let linkCode = link;

        if (utils.validators.isAvailable(key)) {
            if (!utils.validators.isAvailable(link)) {
                linkCode = -1;
            }

            exchangeSubscriptionMap[linkCode] = exchangeSubscriptionMap[linkCode] || {};
            exchangeSubscriptionMap[linkCode][key] = subscriber;
        }
    };

    let unSubscribeExchangeChanged = function (link, key) {
        if (utils.validators.isAvailable(link) && utils.validators.isAvailable(key)) {
            exchangeSubscriptionMap[link][key] = undefined;
        }
    };

    let subscribeSubMarketChanged = function (link, key, subscriber) {
        let linkCode = link;

        if (utils.validators.isAvailable(key)) {
            if (!utils.validators.isAvailable(link)) {
                linkCode = -1;
            }

            subMarketSubscriptionMap[linkCode] = subMarketSubscriptionMap[linkCode] || {};
            subMarketSubscriptionMap[linkCode][key] = subscriber;
        }
    };

    let unSubscribeSubMarketChanged = function (link, key) {
        if (utils.validators.isAvailable(link) && utils.validators.isAvailable(key) && subMarketSubscriptionMap[link]) {
            subMarketSubscriptionMap[link][key] = undefined;
        }
    };

    let subscribeLayoutReady = function (key, subscriber) {
        layoutReadySubscriptions[key] = subscriber;
    };

    let onLayoutReady = function (appLayout) {
        window.appGlobal.events.isLayoutReady = true;

        Object.keys(layoutReadySubscriptions).forEach(function(key) {
            if (layoutReadySubscriptions[key] && layoutReadySubscriptions[key].onLayoutReady instanceof Function) {
                layoutReadySubscriptions[key].onLayoutReady(appLayout);
            }
        });

        layoutReadySubscriptions = {};
    };

    let subscribeOrientationChanged = function (key, subscriber) {
        if (utils.validators.isAvailable(key)) {
            orientationSubscriptions[key] = subscriber;
        }
    };

    let unSubscribeOrientationChanged = function (key) {
        if (utils.validators.isAvailable(key)) {
            orientationSubscriptions[key] = undefined;
        }
    };

    let subscribeDomReady = function (key, subscriber) {
        if (utils.validators.isAvailable(key)) {
            onDomReadySubscriptions[key] = subscriber;
        }
    };

    let unSubscribeDomReady = function (key) {
        if (utils.validators.isAvailable(key)) {
            onDomReadySubscriptions[key] = undefined;
        }
    };

    // ////////////////////////////////////////////////////////////////////////////////////////

    /* *
     * Subscribe for an event
     * @param event Event name
     * @param key Unique identifier for the subscriber
     * @param subscriber Subscriber instance
     */
    let subscribeEvent = function (event, key, subscriber) {
        if (!eventSubscriberMap[event]) {
            eventSubscriberMap[event] = {};
        }

        eventSubscriberMap[event][key] = subscriber;
    };

    /* *
     * UnSubscribe from an event
     * @param event Event name
     * @param key Unique identifier for the subscriber
     */
    let unSubscribeEvent = function (event, key) {
        if (eventSubscriberMap[event]) {
            eventSubscriberMap[event][key] = undefined;
        }
    };

    /* *
     * Trigger event
     * @param event Event name
     * @param args Arguments to pass to triggering event
     */
    let triggerEvent = function (event, args) {
        let subscribers = eventSubscriberMap[event];

        if (subscribers) {
            Object.keys(subscribers).forEach(function(key) {
                if (subscribers[key]) {
                    let callbackFn = subscribers[key][event];

                    if (callbackFn instanceof Function) {
                        callbackFn.apply(subscribers[key], args);
                    }
                }
            });
        }
    };

    return {
        onSymbolChanged: onSymbolChanged,
        languageChanged: languageChanged,
        themeChanged: themeChanged,
        subscribeSymbolChanged: subscribeSymbolChanged,
        subscribeLanguageChanged: subscribeLanguageChanged,
        subscribeThemeChanged: subscribeThemeChanged,
        unSubscribeSymbolChanged: unSubscribeSymbolChanged,
        unSubscribeLanguageChanged: unSubscribeLanguageChanged,
        unSubscribeThemeChanged: unSubscribeThemeChanged,
        subscribeVisibilityChanged: subscribeVisibilityChanged,
        unSubscribeVisibilityChanged: unSubscribeVisibilityChanged,
        onVisibilityChanged: onVisibilityChanged,
        onWorkspaceUpdated: onWorkspaceUpdated,
        subscribeWorkspaceUpdated: subscribeWorkspaceUpdated,
        unSubscribeWorkspaceUpdated: unSubscribeWorkspaceUpdated,
        subscribeAppClose: subscribeAppClose,
        onAppClose: onAppClose,
        onExchangeChanged: onExchangeChanged,
        onSubMarketChanged: onSubMarketChanged,
        subscribeExchangeChanged: subscribeExchangeChanged,
        subscribeSubMarketChanged: subscribeSubMarketChanged,
        unSubscribeExchangeChanged: unSubscribeExchangeChanged,
        unSubscribeSubMarketChanged: unSubscribeSubMarketChanged,
        subscribeLayoutReady: subscribeLayoutReady,
        onLayoutReady: onLayoutReady,
        onOrientationChanged: onOrientationChanged,
        subscribeOrientationChanged: subscribeOrientationChanged,
        unSubscribeOrientationChanged: unSubscribeOrientationChanged,
        onDomReady: onDomReady,
        subscribeDomReady: subscribeDomReady,
        unSubscribeDomReady: unSubscribeDomReady,
        onWindowResize: onWindowResize,
        subscribeWindowResize: subscribeWindowResize,
        unSubscribeWindowResize: unSubscribeWindowResize,
        // ---
        subscribeEvent: subscribeEvent,
        unSubscribeEvent: unSubscribeEvent,
        triggerEvent: triggerEvent
    };
})();