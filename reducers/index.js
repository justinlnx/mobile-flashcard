import { RECEIVE_DECKS, ADD_DECK, ADD_CARD } from '../actions';

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
    case ADD_CARD:
      let addCardState = Object.assign({}, state);
      addCardState[action.payload.deck].questions.push({
        question: action.payload.question,
        answer: action.payload.answer,
      });
      return addCardState;
    default: 
      return state;
  }
}

export default decks;
