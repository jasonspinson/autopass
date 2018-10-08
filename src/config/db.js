//db.js

import Firebase from 'firebase'
  
    let config = {
        apiKey: "AIzaSyDujKKKC0MrwwrdbPNHzWuBCnVrC5Ebj9M",
        authDomain: "forautopass.firebaseapp.com",
        databaseURL: "https://forautopass.firebaseio.com",
        projectId: "forautopass",
        storageBucket: "forautopass.appspot.com",
        messagingSenderId: "322935088485"
    };
let app = Firebase.initializeApp(config)
export const db = app.database()        