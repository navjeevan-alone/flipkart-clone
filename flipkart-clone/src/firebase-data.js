import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase-config";
try {
	const docRef = await addDoc(collection(db, "users"), {
		first: "chetan",
		last: "alone",
		age: 18,
	});
	console.log("Document written with ID: ", docRef.id);
} catch (e) {
	console.error("Error adding document: ", e);
}
