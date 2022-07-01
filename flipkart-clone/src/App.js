import "./App.css";
import Nav from "./components/Nav";
import CardsList from "./components/CardsList";
import ProductPage from "./components/ProductPage";
import MyAccordion from "./components/MyAccordion";
import Checkout from "./components/Checkout";
import Login from "./components/Login";
import Counter from "./components/Counter";
import Todo from "./components/Todo";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Routes, Route } from "react-router-dom";
function App() {
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
