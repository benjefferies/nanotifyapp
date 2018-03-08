import React, { Component } from 'react'
import QRCode from 'react-native-qrcode';

import {
    AppRegistry,
    StyleSheet,
    View,
    TextInput
} from 'react-native';

class QrCode extends Component {
  state = {
    amount: '0',
  };

  render() {
    var qrString = `xrb:xrb_3txm99yb6yq1t56iznzthbmjy9wntg61itxusqkhiixh4fz38i7rhsmyjt7a?amount=${this.state.amount}`
    return (
      <View style={styles.containerFullWith}>
        <TextInput
          keyboardType='numeric'
          style={styles.input}
          onChangeText={(amount) => this.setState({amount: amount})}
          value={this.state.amount}
        />
        <View style={styles.containerCentered}>
            <QRCode
            value={qrString}
            size={200}
            bgColor='purple'
            fgColor='white'/>
        </View>
      </View>
    );
  };
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
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        borderRadius: 5,
        padding: 5,
    }
});

module.exports = QrCode;