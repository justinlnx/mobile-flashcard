import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { white } from '../utils/colors';

class EntryDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'entry title'
    }
  }

  componentDitMount() {
    console.log('entry')
  }

  render () {
    return (
      <View style={styles.container}>
        
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity style={[styles.button, {backgroundColor: white}]} onPress={() => {console.log('pressed')}}>
            <Text style={{color: 'black', paddingTop: 15}}>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, {backgroundColor: 'black'}]} onPress={() => {console.log('pressed')}}>
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
  }
})

export default EntryDetail;