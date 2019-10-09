/**
 * @format
 */

import { AppRegistry } from "react-native";
// import App from "./src/Navigator/AppNavigator";
// import App from "./App2";
import App from "./App4";
// import App from "./src/Navigator/AppTopNavigator";
// import App from "./src2/Navigator/index";

import { name as appName } from "./app.json";

AppRegistry.registerComponent(appName, () => App);