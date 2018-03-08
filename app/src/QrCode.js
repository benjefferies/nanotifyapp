import React from 'react';
import {StyleSheet, Image, View, Button} from 'react-native';

export default class QrCodeScreen extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <View style={styles.containerFullWith}>
                <View style={styles.containerCentered}>
                    <Image source={require('../../assets/RNFirebase512x512.png')} style={[styles.logo]} />
                </View>
                <View style={styles.containerFullWith}>
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
