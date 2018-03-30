import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { white, gray } from '../utils/colors';
import { getDeck } from '../utils/api';
import { connect } from 'react-redux';

class DeckDetail extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.deck.title
    }
  }

  onAddCard = (title) => {
    this.props.navigation.navigate(
      'AddCard',
      {
        title: title
      }
    );
  }

  onStartQuiz = (deck) => {
    this.props.navigation.navigate(
      'Quiz',
      {
        deck: deck
      }
    )
  }

  render () {
    const deck = this.props.decks[this.props.navigation.state.params.deck.title]

    return (
      <View style={styles.container}>
        <View style={{paddingTop: 80, paddingBottom: 80}}>
        <Text style={styles.title}>{deck.title}</Text>
        <Text style={styles.detail}>{`${deck.questions.length} cards`}</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: white}]}
            onPress={() => this.onAddCard(deck.title)}>
            <Text style={{color: 'black', paddingTop: 15}}>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: 'black'}]}
            onPress={() => this.onStartQuiz(deck)}>
            <Text style={{color: white, paddingTop: 15}}>Start Quiz</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15
  },
  button: {
    alignItems: 'center',
    width: 200,
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    margin: 5
  },
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

function mapStateToProps(state) {
  return {
    decks: state
  };
}

export default connect(mapStateToProps)(DeckDetail);
