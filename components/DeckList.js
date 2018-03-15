import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { StackNavigator } from 'react-navigation';
import DeckItem from './DeckItem';
import { white, purple } from '../utils/colors';

class DeckList extends Component {
  render() {
    return (
      <View style={styles.item}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('EntryDetail')}>
          <DeckItem />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0,
      height: 3,
    }
  }
})

export default DeckList;