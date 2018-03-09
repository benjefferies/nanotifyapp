import React from 'react';
import {StyleSheet, Image, ScrollView, Button, TextInput, AsyncStorage, Text} from 'react-native';
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
            <ScrollView>
                {this.state.transactions.map((prop, i) => {
                    return (
                        <CardView key={'card-' + i} style={styles.itemContainer}
                                cardElevation={2}
                                cardMaxElevation={2}
                                cornerRadius={5}>
                                <Text key={'account-' +i}>{prop.account}</Text>
                                <Text key={'amount-' + i}>{parseFloat(prop.amount /= 1.0e+30).toFixed(5)} NANO</Text>
                        </CardView>
                    );
                })}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    itemContainer:{
        padding: 20
    }
});
