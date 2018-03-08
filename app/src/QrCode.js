import React from 'react';
import {StyleSheet, Image, View, Button, TextInput, AsyncStorage} from 'react-native';
import QRCode from 'react-native-qrcode';

export default class QrCodeScreen extends React.Component {
    constructor() {
        super();
        this.state = {
          amount: '0',
          qrString: ''
        };
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
                <TextInput
                keyboardType='numeric'
                style={styles.input}
                onChangeText={(amount) => this.updateQrCode(amount)}
                value={this.state.amount}
                />
                <View style={styles.containerCentered}>
                    <QRCode
                    value={this.state.qrString}
                    size={200}
                    bgColor='purple'
                    fgColor='white'/>
                </View>
                <View>
                    <Button style={styles.button}
                            class="cardStyle"
                            onPress={() => this.props.navigation.goBack()}
                            title="Home"
                    />
                </View>
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
