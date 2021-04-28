import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBSvEHE7y8Ve5v9cYGQIoDY51RWtpVR5PY",
  authDomain: "agroadm-e185f.firebaseapp.com",
  projectId: "agroadm-e185f",
  storageBucket: "agroadm-e185f.appspot.com",
  messagingSenderId: "446375370955",
  appId: "1:446375370955:web:9bcb8bc7506347aab5bb4e",
};

// Initialize Firebase
export default !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
