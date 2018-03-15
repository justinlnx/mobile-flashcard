import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { gray } from '../utils/colors';

class DeckItem extends Component {
  render() {
    return (
      <View>
        <Text style={styles.title}>Deck name</Text>
        <Text style={styles.detail}>3 cards</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 30,
  },
  detail: {
    textAlign: 'center',
    fontSize: 20,
    color: gray
  }
});

export default DeckItem;