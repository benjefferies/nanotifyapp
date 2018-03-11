import React from 'react';
import { StyleSheet, View } from 'react-native';
import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons'


export default class Navigation extends React.Component {

  navigateToPage(index) {
    if (index == 0) {
      this.props.navigation.navigate('Home')
    } else if (index == 1) {
      this.props.navigation.navigate('QrCode')
    } else {
      this.props.navigation.navigate('Transactions')
    }
  }

  render() {
      return (
      <View style={styles.containerFullWith}>
          <BottomNavigation
            labelColor="white"
            rippleColor="white"
            style={{
              height: 56,
              elevation: 8,
              position: 'absolute',
              left: 0,
              bottom: 0,
              right: 0
            }}
            onTabChange={newTabIndex => this.navigateToPage(newTabIndex)}
          >
            <Tab
              barBackgroundColor="#37474F"
              label="Subscribe"
              icon={<Icon size={24} color="white" name="check" />}
            />
            <Tab
              barBackgroundColor="#37474F"
              label="QR Code"
              icon={<Icon size={24} color="white" name="payment" />}
            />
            <Tab
              barBackgroundColor="#37474F"
              label="Transactions"
              icon={<Icon size={24} color="white" name="book" />}
            />
          </BottomNavigation>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerFullWith: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  }
});
