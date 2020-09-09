import firebase from "firebase"

const firebaseApp = firebase.initializeApp({
        apiKey: "AIzaSyD7SKOQR3fMivnOM2LyiAlsagLACmwfjb4",
        authDomain: "messenger-clone-7f64f.firebaseapp.com",
        databaseURL: "https://messenger-clone-7f64f.firebaseio.com",
        projectId: "messenger-clone-7f64f",
        storageBucket: "messenger-clone-7f64f.appspot.com",
        messagingSenderId: "1007409554763",
        appId: "1:1007409554763:web:95017229a5a3daf8f674ce",
        measurementId: "G-8K8KLBVWPL"
      
});

const db = firebaseApp.firestore();

export default db;