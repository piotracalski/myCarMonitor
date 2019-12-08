import Vue from 'vue'
import App from './App.vue'

// Firebase
const firebase = require("firebase");
require("firebase/firestore");
window.firebase = firebase;

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: "AIzaSyB6XEqZR93ud3tP5cWW4GfoRIL1X4dwPpc",
  authDomain: "mycarmonitor-a4904.firebaseapp.com",
  databaseURL: "https://mycarmonitor-a4904.firebaseio.com",
  projectId: "mycarmonitor-a4904",
  storageBucket: "mycarmonitor-a4904.appspot.com",
  messagingSenderId: "414915466187",
  appId: "1:414915466187:web:409ab8f8dfeb7b92815c4e"
});

const db = firebase.firestore();
window.db = db;

db.settings({
});

const storage = firebase.storage();
window.storage = storage;

Vue.config.productionTip = false

const provider = new firebase.auth.GoogleAuthProvider();
window.provider = provider; 

new Vue({
  render: h => h(App),
}).$mount('#app')

