import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import 'firebase/firestore';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './webViewBridge';

const [path] = window.location.pathname.substring(1).split('/');
const editMode = path === 'edit';

registerServiceWorker();

function init() {
  const { layout } = window.Website;
  ReactDOM.render(
    <App layout={layout} editMode={editMode} />,
    document.getElementById('root'),
  );
}

async function initEditMode() {
  const { data } = await window.webViewBridge.send('init');
  window.Website = { layout: data.layout };
  init();
}

function checkEditModeReady() {
  if (postMessage.length === 1) initEditMode();
  else setTimeout(checkEditModeReady, 100);
}

async function loadWebsite() {
  firebase.initializeApp({
    apiKey: 'AIzaSyDrVAXk5GSgGZS9N0YQt6UoVcA2f8nTgx4',
    authDomain: 'cosmos-c8ce0.firebaseapp.com',
    projectId: 'cosmos-c8ce0',
  });
  const firestore = firebase.firestore();
  firestore.settings({ timestampsInSnapshots: true });
  try {
    const snapshot = await firestore
      .collection('Websites')
      .where('slug', '==', path)
      .get();

    if (snapshot.docs.length === 0) return; // Display 404 Page

    window.Website = snapshot.docs[0].data();
    init();
  } catch (err) {
    console.error(err);
  }
}

if (editMode) {
  window.onload = checkEditModeReady;
} else {
  loadWebsite();
}
