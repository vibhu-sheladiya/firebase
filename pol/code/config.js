const firebase=require('firebase');
const firebaseConfig = {
    apiKey: "AIzaSyCwTEdzmLjshTw-mOEGp-iw41fNAdeA7Ns",
    authDomain: "fir-demo-dfc3a.firebaseapp.com",
    projectId: "fir-demo-dfc3a",
    storageBucket: "fir-demo-dfc3a.appspot.com",
    messagingSenderId: "5041501491",
    appId: "1:5041501491:web:3ace903c47304915163a46",
    measurementId: "G-8PVVLQQ8P1"
  };
  firebase.initializeApp(firebaseConfig);
  const db=firebase.firestore()
  const User=db.collection('user');
  module.exports=User;