import { useEffect } from "react";
import "./App.css";
import Nav from "./components/Nav";
import CardsList from "./components/CardsList";
import ProductPage from "./components/ProductPage";
import Checkout from "./components/Checkout";
import Login from "./components/Login";
import TodoApp from "./todoApp/TodoApp";
//
import { Routes, Route } from "react-router-dom";
import { auth } from "./firebase-config";
import { ACTIONS } from "./reducer";
import { useStateValue } from "./StateProvider";
import { onAuthStateChanged } from "firebase/auth";
import {
	collection,
	addDoc,
	getDocs,
	query,
	onSnapshot,
	doc,
	updateDoc,
	deleteDoc,
} from "firebase/firestore";
import { db } from "./firebase-config";

function App() {
	const [{ user, products }, dispatch] = useStateValue();
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (authUser) => {
			if (authUser) {
				const uid = authUser.id;
				dispatch({ type: ACTIONS.SET_USER, user: authUser });
			} else {
				dispatch({ type: ACTIONS.SET_USER, user: null });
			}
		});
		const q = query(collection(db, "products"));
		const getProducts = onSnapshot(q, (querySnapshot) => {
			let productsArray = [];
			querySnapshot.forEach((doc) => {
				productsArray.push({ ...doc.data(), id: doc.id });
			});
			dispatch({ type: ACTIONS.SET_PRODCUTS, products: productsArray });
		});
		return () => {
			unsubscribe();
			getProducts();
		};
	}, []);

	return (
		<div className='App'>
			<Nav />
			<Routes>
				<Route path='/' element={<CardsList />} />
				<Route path='/products/:id' element={<ProductPage />} />
				<Route path='/products' element={<CardsList />} />
				<Route path='/cart' element={<Checkout />} />
				<Route path='/Login' element={<Login />} />
				<Route path='/todo' element={<TodoApp />} />
			</Routes>
			{/* <Counter /> */}
			{/* <Todo></Todo> */}
		</div>
	);
}

export default App;
