import React from 'react';
import {StyleSheet, Image, ScrollView, View, Button, TextInput, AsyncStorage, Text} from 'react-native';
import QRCode from 'react-native-qrcode';
import axios from 'axios';
import CardView from 'react-native-cardview'
import Navigation from './Navigation'
import AddressCard from './AddressCard'


export default class Transactions extends React.Component {
    constructor() {
        super();
        this.state = {
            transactions: []
        }
    }

    static navigationOptions =  {
        title: 'Transactions',
        headerLeft: null
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

    shortenAddress(address) {
        
    }

    render() {
        return (
            <View style={styles.containerFullWith}>
            <ScrollView>
                <AddressCard address='xrb_3txm99yb6yq1t56iznzthbmjy9wntg61itxusqkhiixh4fz38i7rhsmyjt7a' amount='154123123123123112312312312312312.1232'/>
                <AddressCard address='xrb_3txm99yb6yq1t56iznzthbmjy9wntg61itxusqkhiixh4fz38i7rhsmyjt7a' amount='154123123123123112312312312312312.1232'/>
                <AddressCard address='xrb_3txm99yb6yq1t56iznzthbmjy9wntg61itxusqkhiixh4fz38i7rhsmyjt7a' amount='154123123123123112312312312312312.1232'/>
                <AddressCard address='xrb_3txm99yb6yq1t56iznzthbmjy9wntg61itxusqkhiixh4fz38i7rhsmyjt7a' amount='154123123123123112312312312312312.1232'/>
                <AddressCard address='xrb_3txm99yb6yq1t56iznzthbmjy9wntg61itxusqkhiixh4fz38i7rhsmyjt7a' amount='154123123123123112312312312312312.1232'/>
                <AddressCard address='xrb_3txm99yb6yq1t56iznzthbmjy9wntg61itxusqkhiixh4fz38i7rhsmyjt7a' amount='154123123123123112312312312312312.1232'/>
                <AddressCard address='xrb_3txm99yb6yq1t56iznzthbmjy9wntg61itxusqkhiixh4fz38i7rhsmyjt7a' amount='154123123123123112312312312312312.1232'/>
                <AddressCard address='xrb_3txm99yb6yq1t56iznzthbmjy9wntg61itxusqkhiixh4fz38i7rhsmyjt7a' amount='154123123123123112312312312312312.1232'/>
                <AddressCard address='xrb_3txm99yb6yq1t56iznzthbmjy9wntg61itxusqkhiixh4fz38i7rhsmyjt7a' amount='154123123123123112312312312312312.1232'/>
                <AddressCard address='xrb_3txm99yb6yq1t56iznzthbmjy9wntg61itxusqkhiixh4fz38i7rhsmyjt7a' amount='154123123123123112312312312312312.1232'/>
                <AddressCard address='xrb_3txm99yb6yq1t56iznzthbmjy9wntg61itxusqkhiixh4fz38i7rhsmyjt7a' amount='154123123123123112312312312312312.1232'/>
                <AddressCard address='xrb_3txm99yb6yq1t56iznzthbmjy9wntg61itxusqkhiixh4fz38i7rhsmyjt7a' amount='154123123123123112312312312312312.1232'/>
                {this.state.transactions.map((prop, i) => {
                    return (
                        <AddressCard
                            key={'account-' +i}
                            address={prop.account}
                            amount={prop.amount} />
                    );
                })}
            </ScrollView>
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
    itemContainer:{
        padding: 20
    }
});
