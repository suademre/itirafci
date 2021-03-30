import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
  apiKey: "AIzaSyDlEIfHm5TCMYI83RqpPAexbzaVdtYkBKY",
  authDomain: "itirafci-86190.firebaseapp.com",
  databaseURL:
    "https://itirafci-86190-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "itirafci-86190",
  storageBucket: "itirafci-86190.appspot.com",
  messagingSenderId: "171776291984",
  appId: "1:171776291984:web:232b2b2b6481425520d415",
  measurementId: "G-YZY4TVVVNQ",
};

// Initialize Firebase
firebase.initializeApp(config);

export default firebase;
