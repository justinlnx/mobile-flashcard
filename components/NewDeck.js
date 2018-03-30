import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { white, gray } from '../utils/colors';
import { saveDeckTitle } from '../utils/api';
import { addDeck } from '../actions';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

class NewDeck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Deck Title'
    };
  }

  submitDeck = () => {
    if(this.state.text) {
      // update redux
      let title = this.state.text;
      this.props.dispatch(addDeck(title));

      // save to db
      saveDeckTitle(title);

      // clear state or nav to deck
      this.setState({ text: 'Deck Title' });
      this.props.navigation.navigate('DeckDetail', { deck: { title: title, questions: [] } });
    } else {
      console.log('title cannot be empty');
    }
  }

  render() {
    return (
      <View>
        <Text style={styles.label}>What is the title of your new deck?</Text>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity style={styles.input}>
            <TextInput
              style={{color: gray, height: 50}}
              onChangeText={(text) => this.setState({text})}
              value={this.state.text}
              onFocus={() => this.setState({text: ''})}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.submitDeck}>
            <Text style={{color: white, paddingTop: 15}}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  label: {
    padding: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 50,
  },
  input: {
    backgroundColor: white,
    marginTop: 20,
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
    margin: 50
  }
});

function mapStateToProps (state) {
  return state;
}

export default connect(mapStateToProps)(NewDeck);