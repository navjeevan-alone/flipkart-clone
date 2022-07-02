import "./App.css";
import Nav from "./components/Nav";
import CardsList from "./components/CardsList";
import ProductPage from "./components/ProductPage";
import Checkout from "./components/Checkout";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { auth } from "./firebase-config";
import { ACTIONS } from "./reducer";
import { useStateValue } from "./StateProvider";
import { onAuthStateChanged } from "firebase/auth";
function App() {
	const [{ user }, dispatch] = useStateValue();
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (authUser) => {
			if (authUser) {
				const uid = authUser.id;
				dispatch({ type: ACTIONS.SET_USER, user: authUser });
			} else {
				dispatch({ type: ACTIONS.SET_USER, user: null });
			}

			// if (auth.currentUser !== null) {
			// 	auth.currentUser.providerData.forEach((profile) => {
			// 		console.log("Sign-in provider: " + profile.providerId);
			// 		console.log("  Provider-specific UID: " + profile.uid);
			// 		console.log("  Name: " + profile.displayName);
			// 		console.log("  Email: " + profile.email);
			// 		console.log("  Photo URL: " + profile.photoURL);
			// 	});
			// }
		});
		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<div className='App'>
			<Nav />
			<Routes>
				{/* <Route path='/' element={<CardsList />} /> */}
				<Route path='/' element={<CardsList />} />
				<Route path='/products/:id' element={<ProductPage />} />
				<Route path='/products' element={<CardsList />} />
				<Route path='/cart' element={<Checkout />} />
				<Route path='/Login' element={<Login />} />
			</Routes>
			{/* <Counter /> */}
			{/* <Todo></Todo> */}
		</div>
	);
}

export default App;
