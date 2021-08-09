import React, { useEffect } from "react";
import "./App.css";
import Login from "./helper/login";
import PriceDataModuleInitializer from "./helper/price-data-module-initializer";

let username = "retailhtml2";
let password = "retailhtml2";

export const App = () => {
  let priceObj = new PriceDataModuleInitializer();
  useEffect(() => {
    priceObj.preInitialize();
    handleLogin();
  }, []);

  const handleLogin = () => {
    console.log("=== Login function intialized ====");
    let login = new Login();
    login.prepareLoginView(username, password);
  };

  return <div className="App">Test ...</div>;
};
