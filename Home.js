import React from 'react';
import { StyleSheet, Image, Text, View, TextInput, Button } from 'react-native';
import QrCode from "./QrCode";

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      account: ''
    };
  }

  componentDidMount() {
    // firebase things?
  }

  subscribe() {
    console.log(`Subscribing to account ${this.state.account}`)
  }

  render() {
      const subscribe = this.subscribe;
      return (
      <View style={styles.containerFullWith}>
        <View style={styles.containerCentered}>
          <Image source={require('./assets/RNFirebase512x512.png')} style={[styles.logo]} />
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
