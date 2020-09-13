import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

// to skip userAgent warning!
(global.navigator.userAgent = 'React Native');

AppRegistry.registerComponent(appName, () => App);
