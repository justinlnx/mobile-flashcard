import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { gray } from '../utils/colors';

class DeckItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { deck } = this.props;
    return (
      <View>
        <Text style={styles.title}>{deck.title}</Text>
        <Text style={styles.detail}>{`${deck.questions.length} cards`}</Text>
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