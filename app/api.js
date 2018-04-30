import Rebase from 're-base';
import Firebase from 'firebase';
import uuid from 'uuid';

require('firebase/firestore');

export const firebase = Firebase.initializeApp({
  apiKey: 'AIzaSyDrVAXk5GSgGZS9N0YQt6UoVcA2f8nTgx4',
  authDomain: 'cosmos-c8ce0.firebaseapp.com',
  databaseURL: 'https://cosmos-c8ce0.firebaseio.com',
  projectId: 'cosmos-c8ce0',
  storageBucket: 'cosmos-c8ce0.appspot.com',
  messagingSenderId: '415734600450',
});

export const base = Rebase.createClass(firebase.firestore());

export async function upload(uri) {
  const response = await fetch(uri);
  const blob = await response.blob();
  const ref = firebase.storage().ref().child(uuid.v4());
  const snapshot = await ref.put(blob);
  return snapshot.downloadURL;
}
