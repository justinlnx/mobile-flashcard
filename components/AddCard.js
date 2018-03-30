import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { white, gray } from '../utils/colors';
import { addCard } from '../actions';
import { addCardToDeck } from '../utils/api';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

class AddCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: 'Question',
      answer: 'Answer',
    }
  }

  static navigationOptions = () => {
    return {
      title: 'Add Card'
    }
  }

  submitCard = (title) => {
    if(this.state.question === '') {
      console.log('Empty Question');
    } else if (this.state.answer === '') {
      console.log('Empty answer');
    } else {
      // update redux
      this.props.dispatch(addCard(title, this.state.question, this.state.answer));

      // save to db
      addCardToDeck(
        title,
        {
          question: this.state.question,
          answer: this.state.answer
        }
      );

      // clear state and nav back to deck detail
      this.setState({
        question: 'Question',
        answer: 'Answer',
      });
      this.props.navigation.dispatch(NavigationActions.back());
    }
  }

  render() {
    const { title } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity style={styles.input}>
            <TextInput
              style={{color: gray, height: 50}}
              onChangeText={(question) => this.setState({question})}
              value={this.state.question}
              onFocus={() => this.setState({question: ''})}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.input}>
            <TextInput
              style={{color: gray, height: 50}}
              onChangeText={(answer) => this.setState({answer})}
              value={this.state.answer}
              onFocus={() => this.setState({answer: ''})}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={[styles.button, {backgroundColor: 'black'}]} onPress={() => this.submitCard(title)}>
            <Text style={{color: white, paddingTop: 15}}>Submit</Text>
          </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15,
    alignItems: 'center'
  },
  input: {
    backgroundColor: white,
    marginTop: 40,
    width: 400,
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0,
      height: 3,
    }
  },
  button: {
    alignItems: 'center',
    width: 200,
    height: 50,
    backgroundColor: 'black',
    borderRadius: 8,
    borderWidth: 1,
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    margin: 100
  }
});

export default connect()(AddCard);