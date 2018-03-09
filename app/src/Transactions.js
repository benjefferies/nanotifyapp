import React from 'react';
import {StyleSheet, Image, View, Button, TextInput, AsyncStorage, Text} from 'react-native';
import QRCode from 'react-native-qrcode';
import axios from 'axios';
import CardView from 'react-native-cardview'


export default class Transactions extends React.Component {
    constructor() {
        super();
        this.state = {
            transactions: []
        }
    }

    componentDidMount() {
        var setState = this.setState.bind(this)
        AsyncStorage.getItem('account', (err, account) => {
            axios.get(`https://nanotify.co/transactions/${account}`, {
                account: account
              })
              .then(function (response) {
                  var transactions = response.data
                  console.log(`transactions ${JSON.stringify(transactions)}`)
                  setState({transactions: transactions})
              })
              .catch(function (error) {
                  console.log(error);
              });
        });
    }

    render() {
        return (
            <View style={styles.containerFullWith}>
                {this.state.transactions.map((prop, i) => {
                    return (
                        <CardView
                                cardElevation={2}
                                cardMaxElevation={2}
                                cornerRadius={5}>
                                <Text key={'amount-' + i}>Received {prop.amount}</Text>
                                <Text key={'account-' + i}>{prop.account}</Text>
                        </CardView>
                    );
                })}
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
