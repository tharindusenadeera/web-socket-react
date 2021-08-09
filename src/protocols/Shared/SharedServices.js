import UserSettings from "./BusinessEntities/UserSettings";
import UserState from "./BusinessEntities/UserState";
import WindowState from "./BusinessEntities/WindowState";

// export default (function () {
//     var serviceMap = {};

//     var registerService = function (type, service) {
//         serviceMap[type] = service;
//     };

//     var getService = function (type) {
//         return serviceMap[type];
//     };

//     return {
//         registerService: registerService,
//         getService: getService,
//         userSettings: new UserSettings(),
//         userState: new UserState(),
//         windowState: new WindowState(),
//     };
// })();

const serviceMap = {};

export const registerService = (type, service) => {
  console.log("registerType", type, "service", service);
  serviceMap[type] = service;
};

export const getService = (type) => {
  return serviceMap[type];
};

export const userSettings = () => {
  let settings = new UserSettings();
  return settings;
};

export const userState = () => {
  let newState = new UserState();
  return newState;
};

export const windowState = () => {
  let newState = new WindowState();
  return newState;
};
