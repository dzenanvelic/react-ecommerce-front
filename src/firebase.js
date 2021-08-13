import firebase from 'firebase/app'
import 'firebase/auth'





  // Your web app's Firebase configuration
 const firebaseConfig = {
    apiKey: "AIzaSyBKaKxfDZ-7jsPie3hlN0oHJvyAWSw9kCw",
    authDomain: "ecommerce2-a6fa3.firebaseapp.com",
    projectId: "ecommerce2-a6fa3",
    storageBucket: "ecommerce2-a6fa3.appspot.com",
    messagingSenderId: "551829778842",
    appId: "1:551829778842:web:c1cc3ecf4a136040860a23"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);



  //exporrt  
  export const auth = firebase.auth()
  export const gogleAuthProvider = new firebase.auth.GoogleAuthProvider()