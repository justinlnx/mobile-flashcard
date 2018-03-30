import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { white, red, green } from '../utils/colors';

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: props.navigation.state.params.deck.questions,
      title: props.navigation.state.params.deck.title,
      current: 0,
      correct: 0,
      displayAnswer: false,
    }
  }

  static navigationOptions = () => {
    return {
      title: 'Quiz'
    }
  }

  onCorrect = () => {
    let correct = this.state.correct;
    this.setState({
      correct: correct + 1
    }, () => {
      this.nextQuestion();
    });
  }
  
  nextQuestion = () => {
    let current = this.state.current + 1;
    if(current >= this.state.questions.length) {
      // finish quiz
      // re route to a different component
      this.props.navigation.navigate(
        'QuizResult',
        {
          deck: this.props.navigation.state.params.deck,
          correct: this.state.correct
        }
      )
    } else {
      // next question
      this.setState({ current });
    }
  }

  toggleQandA = () => {
    let displayAnswer = this.state.displayAnswer;
    this.setState({
      displayAnswer: !displayAnswer
    });
  }

  get buttons() {
    return (
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: green}]}
          onPress={this.onCorrect}>
          <Text style={{color: white, paddingTop: 15}}>Correct</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: red}]}
          onPress={this.nextQuestion}>
          <Text style={{color: white, paddingTop: 15}}>Incorrect</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    let question = this.state.questions[this.state.current];
    console.log(question);
    return (
      <View style={styles.topContainer}>
        <Text style={styles.progressText}>{`${this.state.current + 1} / ${this.state.questions.length}`}</Text>
        {this.state.displayAnswer
          ? <View style={styles.questionContainer}>
              <Text style={styles.label}>{question.answer}</Text>
              <TouchableOpacity onPress={this.toggleQandA}>
                <Text style={styles.showAnswerText}>Question</Text>
              </TouchableOpacity>
            </View>
          : <View style={styles.questionContainer}>
              <Text style={styles.label}>{question.question}</Text>
              <TouchableOpacity onPress={this.toggleQandA}>
                <Text style={styles.showAnswerText}>Answer</Text>
              </TouchableOpacity>
            </View>
        }
        {this.buttons}
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
  showAnswerText: {
    fontSize: 20,
    padding: 20,
    textAlign: 'center',
    color: red
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

export default Quiz;
