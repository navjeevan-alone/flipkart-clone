import firebase from "firebase";
const firebaseApp = firebase.initializeApp({
	apiKey: "AIzaSyD1Vp_kjYCokuTS_MnbIRuoMxPnP4D2LNE",
	authDomain: "clone-327f2.firebaseapp.com",
	projectId: "clone-327f2",
	storageBucket: "clone-327f2.appspot.com",
	messagingSenderId: "234950427395",
	appId: "1:234950427395:web:1bf5283a8e7152585f9f36",
	measurementId: "G-8Y0LQP0HDZ",
});
const db = firebaseApp.firestore();
const auth = firebase.auth();
export { db, auth };
