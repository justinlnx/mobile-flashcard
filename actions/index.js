export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const ADD_DECK = 'ADD_ENTRY';
export const ADD_CARD = 'ADD_CARD';

export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks
  }
}

export function addDeck(name) {
  return {
    type: ADD_DECK,
    name
  }
}

export function addCard(deck, question, answer) {
  return {
    type: ADD_CARD,
    payload: {
      deck: deck,
      question: question,
      answer: answer,
    }
  }
}
