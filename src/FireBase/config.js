import app from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyC8qzan3NyNs5yszdOrJo9n2XZ7gP_ok-Y",
    authDomain: "alumni-connect-ba161.firebaseapp.com",
    projectId: "alumni-connect-ba161",
    storageBucket: "alumni-connect-ba161.appspot.com",
    messagingSenderId: "819665987045",
    appId: "1:819665987045:web:2f74b4da4f40d6af347b0c"
  };
  // Initialize Firebase
  const firebase=app.initializeApp(firebaseConfig);
  const firestore= firebase.firestore();

  export {firebase,firestore,app}
