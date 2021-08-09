import React, { useEffect } from "react";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import "./App.css";
import Login from "./helper/login";
import PriceDataModuleInitializer from "./helper/price-data-module-initializer";
import storeWithPersistor from './util/store/reduxStore';

let username = 'bkuser';
let password = '25d55ad283aa400af464c76d713c07ad';

export const App = () => {
  const date = new Date();

  window.appGlobal = {
    isIos: false,
    count: 0,
    events: {},
    priceUser: {},
    queryParams: {appParams: {}},
    orientation: {},
    session: {
      popupCount: 0, fsToken: date.getTime(), widgetState: {collapseState: {}}
    },
    tableCache: [],
    isSortingProgress: false,
    tabletConfig: {
      zoomingFact: 1 // For default screen (resolution: 1024x600, dppx: 1)
    },
    multiScreen: {
      isParentWindow: true,
      childWindowArray: [],
      isParentLogoutFired: false
    },
    logger: {stackTrace: []},
  };

  let priceObj = new PriceDataModuleInitializer();

  useEffect(() => {
    priceObj.preInitialize();
    handleLogin();
  }, []);

  const handleLogin = () => {
    console.log("=== Login function initialized ====");

    let login = new Login();

    login.prepareLoginView(username, password);
  };

  return (
      <Provider store={ storeWithPersistor.store }>
        <PersistGate
            persistor={ storeWithPersistor.persistor }
            loading={ null }
            debug>
          <div className="App">
            <p>Hi</p>
          </div>
        </PersistGate>
      </Provider>
  );
};
