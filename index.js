import { AppRegistry } from 'react-native';
import {StackNavigator} from "react-navigation";
import HomeScreen from "./app/src/Home";
import QrCodeScreen from "./app/src/QrCode";
import Transactions from './app/src/Transactions';


const App = StackNavigator({
    Home: {screen: HomeScreen},
    QrCode: {screen: QrCodeScreen},
    Transactions: {screen: Transactions}
});

AppRegistry.registerComponent('Nanotify', () => App);
