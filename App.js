import React from 'react';
import { View, StyleSheet, Platform, StatusBar } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Constants } from 'expo';
import { purple, white } from './utils/colors';
import { setLocalNotification } from './utils/api';
import DeckList from './components/DeckList';
import NewDeck from './components/NewDeck';
import DeckDetail from './components/DeckDetail';
import AddCard from './components/AddCard';
import Quiz from './components/Quiz';
import QuizResult from './components/QuizResult';

function StatuBar ({ backgroundColor, ...props }) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight }} >
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'DECKS'
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'NEW DECK'
    }
  }
}, {
  navigationOptions: {
    header: null,
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
});

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      }
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      }
    }
  },
  QuizResult: {
    screen: QuizResult,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      }
    }
  }
});

export default class App extends React.Component {
  componentDidMount() {
    console.log('mount');
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <StatuBar backgroundColor={purple} barStyle='light-content' />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
