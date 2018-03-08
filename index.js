import { AppRegistry } from 'react-native';
import {StackNavigator} from "react-navigation";
import HomeScreen from "./app/src/Home";
import QrCodeScreen from "./app/src/QrCode";


const App = StackNavigator({
    Home: {screen: HomeScreen},
    QrCode: {screen: QrCodeScreen}
});

import QrCode from './QrCode';
AppRegistry.registerComponent('nanotify', () => App);
