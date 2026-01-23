/**
 * @format
 */

import { AppRegistry, LogBox } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

// Disable the DevTools message
LogBox.ignoreAllLogs(true);

AppRegistry.registerComponent(appName, () => App);
