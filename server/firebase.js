// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
// import "firebase/analytics";

// Add the Firebase products that you want to use
// import "firebase/auth";
import "firebase/firestore";

const firebaseConfig =  {
  apiKey: "AIzaSyBSvEHE7y8Ve5v9cYGQIoDY51RWtpVR5PY",
  authDomain: "agroadm-e185f.firebaseapp.com",
  projectId: "agroadm-e185f",
  storageBucket: "agroadm-e185f.appspot.com",
  messagingSenderId: "446375370955",
  appId: "1:446375370955:web:9bcb8bc7506347aab5bb4e"
};

// Initialize Firebase
export default !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

// import admin from "firebase-admin";

// import serviceAccount from "../config/agroadm-e185f-firebase-adminsdk-6qimg-8f8d666694.json";

// export default admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });
