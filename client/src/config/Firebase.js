import firebase from 'firebase/app'
import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/auth'

var firebaseConfig = {
    apiKey: "AIzaSyBu9newgXZ0gIAZXJHmYlt5gtjZc_lArtU",
    authDomain: "rdbms-project-b2efc.firebaseapp.com",
    projectId: "rdbms-project-b2efc",
    storageBucket: "rdbms-project-b2efc.appspot.com",
    messagingSenderId: "42825839636",
    appId: "1:42825839636:web:c78272e94b975208c2a301",
    measurementId: "G-5LTKJNRNVG"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore()
// const timeStamp = projectFirestore.FieldValue.serverTimestamp;

export { firebase, auth, projectStorage, projectFirestore }