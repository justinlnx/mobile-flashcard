import { AsyncStorage } from 'react-native';

export const FLASHCARD_KEY = 'Flashcards';

export function getDecks() {
  // AsyncStorage.clear();
  return AsyncStorage.getItem(FLASHCARD_KEY)
    .then((results) => {
      return JSON.parse(results);
    });
}

export function getDeck(title) {
  return AsyncStorage.getItem(FLASHCARD_KEY)
    .then((results) => {
      const data = JSON.parse(results);
      return data[title];
    })
}

export function saveDeckTitle(name) {
  // console.log('data ', getDecks());
  // if(this.getDeck(name)) {
  //   console.log('title in use');
  // } else {
  //   // console.log(name);
    let data = {
      title: name,
      questions: []
    }
    return AsyncStorage.mergeItem(FLASHCARD_KEY, JSON.stringify({[name]: data}));
  // }
}

export function addCardToDeck(name, card) {
  if(this.getDeck(name)) {
    console.log('title in use');
  } else {
    let key = `${FLASHCARD_KEY}:${name}`;
    return AsyncStorage.mergeItem(key, JSON.stringify({
      [key.questions]: card
    }));
  }
}
