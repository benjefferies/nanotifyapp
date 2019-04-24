import React from 'react';
import {StyleSheet, Image, ScrollView, View, Button, TextInput, AsyncStorage, Text} from 'react-native';
import QRCode from 'react-native-qrcode';
import axios from 'axios';
import CardView from 'react-native-cardview'
import Navigation from './Navigation'
import AddressCard from './AddressCard'
import Spinner from 'react-native-loading-spinner-overlay';


export default class Transactions extends React.Component {
    constructor() {
        super();
        this.state = {
            transactions: [],
            loading: true
        }
    }

    static navigationOptions =  {
        title: 'Transactions',
        headerLeft: null,
        header: null
    }

    componentDidMount() {
        AsyncStorage.getItem('account', (err, account) => {
            axios.get(`https://nanotify.me/transactions/${account}`, {
                account: account
              })
              .then(response => {
                  var transactions = response.data
                  console.log(`transactions ${JSON.stringify(transactions)}`)
                  this.setState({transactions: transactions, loading: false})
              })
              .catch(error => {
                  console.log(error);
                  this.setState({transactions: [], loading: false})
              });
        });
    }

    shortenAddress(address) {
        
    }

    render() {
        const transactionCards = this.state.transactions.map((prop, i) => {
            return (
                <AddressCard
                    key={'account-' +i}
                    address={prop.account}
                    amount={prop.amount} />
            );
        })
        return (
            <View style={styles.containerFullWith}>
                <ScrollView>{transactionCards}</ScrollView>
                {(!this.state.transactions || !this.state.transactions.length) && <View style={styles.noTransactions}><Text style={{fontSize: 20}}>No transactions</Text></View>}
                <Spinner visible={this.state.loading} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
                <Navigation navigation={this.props.navigation}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerFullWith: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    noTransactions: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemContainer:{
        padding: 20
    }
});
