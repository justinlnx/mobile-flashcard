import { RECEIVE_DECKS, ADD_DECK } from '../actions';

function decks (state = {}, action) {
  switch (action.type) {
    case ADD_DECK: 
      let newState = Object.assign({}, state);
      if(!newState[action.name]) {
        newState[action.name] = {
          title: action.name,
          questions: []
        }
      }
      return newState;
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      }
    default: 
      return state;
  }
}

export default decks;