import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { StackNavigator } from 'react-navigation';
import DeckItem from './DeckItem';
import { connect } from 'react-redux';
import { white, purple } from '../utils/colors';
import { getDecks } from '../utils/api';
import { receiveDecks } from '../actions';

class DeckList extends Component {
  componentDidMount() {
    getDecks().then((decks) => {
      if(decks) {
        this.props.dispatch(receiveDecks(decks));
      }
    });
  }

  render() {
    const { decks } = this.props;
    let decksArr = Object.keys(decks).map((key) => decks[key]);

    return (
      <View>
        {decksArr && decksArr.map((deck, index) => (
          <TouchableOpacity
            key={index} style={styles.item}
            onPress={() => this.props.navigation.navigate('DeckDetail', { title: deck.title })}
          >
            <DeckItem deck={deck}/>
          </TouchableOpacity> 
        ))}
        {decksArr.length === 0 && (
          <Text style={styles.noDataText}>You have no decks available. Please create new decks!</Text>
        )}
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
  },
  noDataText: {
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 20
  },
});

function mapStateToProps (decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(DeckList);