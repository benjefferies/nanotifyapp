import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons'
import CardView from 'react-native-cardview'


export default class AddressCard extends React.Component {

  shortenAddress(address) {
    return address.substring(0, 18) + '...' + address.substring(address.length - 8 , address.length)
  }
  
  render() {
      return (
          <CardView style={styles.itemContainer}
            cardElevation={2}
            cardMaxElevation={2}
            cornerRadius={5}>
            <Text onPress={() => alert(this.props.address)}
            numberOfLines={1}
            ellipsizeMode='middle'>{this.props.address}</Text>
            <Text>{parseFloat(this.props.amount /= 1.0e+30).toFixed(5)} NANO</Text>
        </CardView>
    );
  }
}

const styles = StyleSheet.create({
  itemContainer:{
      padding: 20,
      justifyContent: 'flex-end'
  }
});
