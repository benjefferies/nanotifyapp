import React from 'react';
import { StyleSheet, Image, Text, View, TextInput, Button, AsyncStorage } from 'react-native';
import QrCode from "./QrCode";
import axios from 'axios';
import firebase from 'react-native-firebase';

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      account: ''
    };
  }

  componentDidMount() {
    var setState = this.setState.bind(this)
    AsyncStorage.getItem('account', (err, account) => {
      setState({account: account})
    });
  }

  subscribeClicked() {
    var account = this.state.account
    if (!account.match('xrb_[a-zA-Z0-9]{60}')) {
      console.log(`Invalid account format ${account}`)
      return
    }
    try {
      AsyncStorage.getItem('account', (err, oldAccount) => {
        AsyncStorage.setItem('account', account, () => {
          this.subscribe(account)
        })
        console.log(`Unsubscribing from account ${oldAccount}`)
        firebase.messaging().unsubscribeFromTopic(oldAccount)
      });
      subscribe()
    } catch (error) {
      console.log(`failed to get or save account ${account}`)
      console.log(error)
      // Maybe first time subscribing
      try {
        AsyncStorage.setItem('account', account, () => {this.subscribe(account)})
      } catch (error) {
        console.log(error)
        console.log(`failed to save account ${account}`)
        this.setState({account: ''})
      }
    }
  }

  subscribe(account) {
    axios.post('https://nanotify.co/mobile/subscribe', {
        account: account
      })
      .then(function (response) {
        if (response.status == 201) {
          console.log(`Subscribing to account ${account}`)
          firebase.messaging().subscribeToTopic(account)
        } else {
          console.log(`Could not subscribe to account ${account}`)
        }
      })
      .catch(function (error) {
        if (error.response.status == 409) {
          console.log(`Subscribing to account ${account}`)
          firebase.messaging().subscribeToTopic(account)
        } else {
          console.log(error);
        }
      });
  }

  render() {
      const subscribe = this.subscribeClicked.bind(this);
      return (
      <View style={styles.containerFullWith}>
        <View style={styles.containerCentered}>
          <Image source={require('../../assets/RNFirebase512x512.png')} style={[styles.logo]} />
          <Text style={styles.welcome}>
            Welcome to the Nanotify!
          </Text>
          </View>
          <View style={styles.containerFullWith}>
          <TextInput
            class="cardStyle"
            onChangeText={(account) => this.setState({account: account})}
            value={this.state.account}
          />
          <Button style={styles.button}
            class="cardStyle"
            onPress={subscribe}
            title="Subscribe"
            accessibilityLabel="Subscribe to an account"
          />
          </View>
          <Button
              class="cardStyle"
              onPress={() => this.props.navigation.navigate('Transactions')}
              title="Transactions"

          />
          <Button
              class="cardStyle"
              onPress={() => this.props.navigation.navigate('QrCode')}
              title="QR Code"

          />
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
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
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
  },
  modules: {
    margin: 20,
  },
  modulesHeader: {
    fontSize: 16,
    marginBottom: 8,
  },
  module: {
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  }
});
