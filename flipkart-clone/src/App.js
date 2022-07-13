import { useEffect } from "react";
import "./App.css";
import Nav from "./components/Nav";
import CardsList from "./components/CardsList";
import ProductPage from "./components/ProductPage";
import Checkout from "./components/Checkout";
import Login from "./components/Login";
import TodoApp from "./todoApp/TodoApp";
import AddProduct from "./components/AddProduct";
import NewCheckout from "./components/NewCheckout";
//
import { Routes, Route } from "react-router-dom";
import { auth } from "./firebase-config";
import { ACTIONS, getProducts } from "./reducer";
import { useStateValue } from "./StateProvider";
import { onAuthStateChanged } from "firebase/auth";

function App() {
	const [{ products, user }, dispatch] = useStateValue();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (authUser) => {
			if (authUser) {
				const uid = authUser.id;
				dispatch({ type: ACTIONS.SET_USER, user: authUser });
			} else {
				dispatch({ type: ACTIONS.SET_USER, user: null });
			}
		});

		return () => {
			unsubscribe();
			// getProducts();
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
				<Route path='/add-product' element={<AddProduct />} />
				<Route path='/new-checkout' element={<NewCheckout />} />
			</Routes>
			{/* <AddProduct /> */}
			{/* <Counter /> */}
			{/* <Todo></Todo> */}
		</div>
	);
}

export default App;
