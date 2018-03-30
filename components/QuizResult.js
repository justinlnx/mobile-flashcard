import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { white } from '../utils/colors';

class QuizResult extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = () => {
    return {
      title: 'Quiz Score'
    }
  }

  render() {
    const { deck, correct } = this.props.navigation.state.params;
    return(
      <View style={styles.topContainer}>
        <Text style={styles.label}>YOUR SCORE</Text>
        <Text style={styles.label}>{`${correct} / ${deck.questions.length}`}</Text>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: white}]}
            onPress={() => this.props.navigation.navigate('Quiz', { deck: deck })}>
            <Text style={{color: 'black', paddingTop: 15}}>Restart</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: 'black'}]}
            onPress={() => this.props.navigation.navigate('DeckDetail', { deck: deck })}>
            <Text style={{color: white, paddingTop: 15}}>Back To Deck</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
  },
  progressText: {
    fontSize: 15,
    marginLeft: 10,
  },
  questionContainer: {
    alignItems: 'center',
  },
  label: {
    padding: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 50,
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
});

export default QuizResult;
