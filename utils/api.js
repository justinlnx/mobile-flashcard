import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

export const FLASHCARD_KEY = 'Flashcards';
const NOTIFICATION_KEY = 'Flashcards:notifications';

export function getDecks() {
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
  let data = {
    title: name,
    questions: []
  }
  return AsyncStorage.mergeItem(FLASHCARD_KEY, JSON.stringify({[name]: data}));
}

export function addCardToDeck(name, card) {
  return AsyncStorage.getItem(FLASHCARD_KEY)
    .then(results => {
      const data = JSON.parse(results);
      data[name].questions.push(card);
      AsyncStorage.setItem(FLASHCARD_KEY, JSON.stringify(data));
    })
}

export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync);
}

export function createNotification () {
  return {
    title: "Complete your daily quiz!",
    body: "Don't forget to take your quiz for today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: "high",
      sticky: false,
      vibrate: true
    }
  }
}

export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if(data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if(status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync();

              let tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              tomorrow.setHours(20);
              tomorrow.setMinutes(0);

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: "day"
                }
              );

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
            }
          });
      }
    });
}
