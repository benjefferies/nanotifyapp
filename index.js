import { AppRegistry } from 'react-native';
import {StackNavigator} from "react-navigation";
import HomeScreen from "./Home";
import QrCodeScreen from "./QrCode";


const App = StackNavigator({
    Home: {screen: HomeScreen},
    QrCode: {screen: QrCodeScreen}
});

AppRegistry.registerComponent('nanotify', () => App);
