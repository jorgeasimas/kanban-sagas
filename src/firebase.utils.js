import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";

const config = {
  apiKey: "AIzaSyBjtl5dVm-h0Uah1Kwt65--WnZJJRNlamo",
  authDomain: "my-chat-a7b6d.firebaseapp.com",
  projectId: "my-chat-a7b6d",
  storageBucket: "my-chat-a7b6d.appspot.com",
  messagingSenderId: "1074409928589",
  appId: "1:1074409928589:web:a9e5e3b5728e8377feefc4",
  measurementId: "G-NW4RYNZQ6E"
};

firebase.initializeApp(config);

export const firestore = firebase.firestore();
export const analytics = firebase.analytics();
/*
  export const auth = firebase.auth();
  export const googleProvider = new firebase.auth.GoogleAuthProvider();
  googleProvider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);
*/
export default firebase;