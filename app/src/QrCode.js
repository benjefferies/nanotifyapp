import React from 'react';
import {StyleSheet, Image, View, Button, TextInput, AsyncStorage, ScrollView, Text} from 'react-native';
import QRCode from 'react-native-qrcode';
import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Navigation from './Navigation'

export default class QrCodeScreen extends React.Component {
    constructor() {
        super();
        this.state = {
          amount: '',
          qrString: ''
        };
    }

    static navigationOptions =  {
        title: 'QR Code',
        headerLeft: null
    }

    updateQrCode(amount) {
        AsyncStorage.getItem('account', (err, account) => {
            this.setState({qrString: `xrb:${account}?amount=${this.state.amount}`})
        });
        this.setState({amount: amount})
    }

    componentDidMount() {
        AsyncStorage.getItem('account', (err, account) => {
            this.setState({qrString: `xrb:${account}?amount=${this.state.amount}`})
        });
    }

    render() {
        return (
            <View style={styles.containerFullWith}>
                <Text style={styles.instructions}>Scan me using the Nano App</Text>
                <View style={styles.containerCentered}>
                <QRCode
                    value={this.state.qrString}
                    size={200}
                    bgColor='purple'
                    fgColor='white'/>

                </View>
                <TextInput
                    keyboardType='numeric'
                    placeholder='Enter Nano'
                    style={styles.input}
                    onChangeText={(amount) => this.updateQrCode(amount)}
                    value={this.state.amount}
                    />
                <Navigation navigation={this.props.navigation}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerCentered: {
        flex: 3,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerFullWith: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginTop: 15,
        fontWeight: "900",
        fontSize: 20
    }
});
