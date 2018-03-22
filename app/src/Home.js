import React from 'react';
import { StyleSheet, Image, Text, View, TextInput, Button, AsyncStorage } from 'react-native';
import QrCode from "./QrCode";
import axios from 'axios';
import firebase from 'react-native-firebase';
import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Navigation from './Navigation'
import Spinner from 'react-native-loading-spinner-overlay';
import Toast, {DURATION} from 'react-native-easy-toast'


export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      account: '',
      saving: false
    };
  }

  componentWillMount() {
    firebase.messaging().requestPermissions()
    // This gets logged only when the app is open
    // Nothing happens when app is closed, no notification is shown either
    firebase.messaging().onMessage((message) => {
      console.log(`message: ${JSON.stringify(message.fcm.body)}`)
      this.refs.toast.show(message.fcm.body)
    });
  }

  static navigationOptions =  {
      title: 'Subscribe',
      headerLeft: null,
      header: null
  }

  componentDidMount() {
    AsyncStorage.getItem('account', (err, account) => {
      this.setState({account: account})
    });
  }

  subscribeClicked() {
    this.setState({saving: true})
    var account = this.state.account
    if (!account.match('xrb_[a-zA-Z0-9]{60}')) {
      console.log(`Invalid account format ${account}`)
      return
    }
    try {
      AsyncStorage.getItem('account', (err, oldAccount) => {
        if (oldAccount !== null) {
          console.log(`Unsubscribing from account ${oldAccount}`)
          firebase.messaging().unsubscribeFromTopic(oldAccount)
        }
      });
      AsyncStorage.setItem('account', account, () => {
        this.subscribe(account)
      })
    } catch (error) {
      console.log(`failed to get or save account ${account}`)
      console.log(error)
      // Maybe first time subscribing
      try {
        AsyncStorage.setItem('account', account, () => {this.subscribe(account)})
      } catch (error) {
        console.log(error)
        console.log(`failed to save account ${account}`)
      }
    }
  }

  subscribe(account) {
    axios.post('https://nanotify.co/mobile/subscribe', {
        account: account
      })
      .then(response => {
        if (response.status == 201) {
          console.log(`Subscribing to account ${account}`)
          firebase.messaging().subscribeToTopic(account)
        } else {
          console.log(`Could not subscribe to account ${account}`)
        }
        this.setState({saving: false})
      })
      .catch(error => {
        console.log(error);
        if (error.response && error.response.status == 409) {
          console.log(`Subscribing to account ${account}`)
          firebase.messaging().subscribeToTopic(account)
        }
        this.setState({saving: false})
      });
  }

  render() {
      return (
      <View style={styles.containerFullWith}>
        <View style={styles.containerCentered}>
          <Image source={require('../../assets/RNFirebase512x512.png')} style={[styles.logo]} />
          <Text style={styles.welcome}>
            Welcome to Nanotify!
          </Text>
          </View>
          <View style={styles.containerFullWith}>
          <TextInput
            placeholder='Enter Nano Address'
            class="cardStyle"
            onChangeText={(account) => this.setState({account: account})}
            value={this.state.account}
          />
          <Button
            class="cardStyle"
            onPress={() => this.subscribeClicked()}
            title="Subscribe"
            accessibilityLabel="Subscribe to an account"
          />
          </View>
          <Spinner visible={this.state.saving} textContent={"Subscribing..."} textStyle={{color: '#FFF'}} />
          <Toast ref="toast"/>
          <Navigation navigation={this.props.navigation}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerCentered: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerFullWith: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  logo: {
    height: 80,
    marginBottom: 16,
    width: 80,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  }
});
