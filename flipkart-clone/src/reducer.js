import { useEffect } from "react";
import { auth } from "./firebase-config";
import { signOut } from "firebase/auth";
// import { useNavigate } from "react-router-dom";

export const ACTIONS = {
	ADD_TO_BASKET: "ADD_TO_BASKET",
	REMOVE_FROM_BASKET: "REMOVE_FROM_BASKET",
	SET_TOTAL: "SET_TOTAL",
	CHANGE_TOTAL: "CHANGE_TOTAL",
	SET_USER: "SET_USER",
	CREATE_USER: "CREATE_USER",
	LOGOUT: "LOGOUT",
};
export const errorType = {
	errorWeakPassword: "(auth/weak-password)",
	// errorWeakPassword:
	// 	"Firebase: Password should be at least 6 characters (auth/weak-password).",
	errorInvalidEmail: "Firebase: Error (auth/invalid-email).",
	errorMissingEmail: " Firebase: Error (auth/missing-email).",
	errorOffline: "Firebase: Error (auth/network-request-failed).",
	errorInternal: "Firebase: Error (auth/internal-error).",
	errorEmailInUse: "Firebase: Error (auth/email-already-in-use).",
	// error: "",
};
export const initialState = {
	basket: [],
	products: [
		{
			id: 1,
			title:
				"Hp Victus Latest AMD Ryzen 5 5600H Processor 16.1 Inches Fhd Gaming Laptop (8Gb Ram/512Gb Ssd",
			image: "https://m.media-amazon.com/images/I/71h7F81EBoS._SX450_.jpg",
			rating: 3,
			price: 100,
			isInCart: false,
			quantity: 0,
		},
		{
			id: 2,
			title:
				"Hp Pavilion 14, Amd Ryzen 5-5625U 8Gb Ram/512Gb Ssd 14 Inches Laptop, Fhd Ips Micro-Edge Display",
			image:
				"https://images-eu.ssl-images-amazon.com/images/I/41q8qusoglL._SX300_SY300_QL70_FMwebp_.jpg",
			rating: 4.5,
			price: 200,
			isInCart: false,
			quantity: 0,
		},
		{
			id: 3,
			title:
				"AirCase Laptop Bag Sleeve Case Cover Pouch for 14.1-Inch Laptop for Men & Women Neoprene(Black)",
			image: "https://m.media-amazon.com/images/I/71eknZxZLmL._SY450_.jpg",
			rating: 1.5,
			price: 300,
			isInCart: false,
			quantity: 0,
		},
		{
			id: 4,
			title:
				"Leather World Pu Leather 15.6 inch Water Resistant Laptop Bags Sleeve Office Bag for Men",
			image: "https://m.media-amazon.com/images/I/812CNNKjLAL._SY355_.jpg",
			rating: 1,
			price: 400,
			isInCart: false,
			quantity: 0,
		},
		{
			id: 5,
			title: "Realme X7 (Space Silver, 6GB RAM, 128GB Storage) Without Offer",
			image: "https://m.media-amazon.com/images/I/41B-BnAwg2S.jpg",
			rating: 2.5,
			price: 500,
			isInCart: false,
			quantity: 0,
		},
	],
	user: null,
	total: 0,
	isLoggedIn: false,
};

export const getBasketTotal = (basket) =>
	basket?.reduce((amount, item) => item.price * item.quantity + amount, 0);

const reducer = (state, action) => {
	// let navigate = useNavigate();
	switch (action.type) {
		case ACTIONS.ADD_TO_BASKET:
			return { ...state, basket: [...state.basket, action.item] };

		case ACTIONS.REMOVE_FROM_BASKET:
			let newBasket = [...state.basket];
			const index = state.basket.findIndex((basketItem) => {
				return basketItem.id === action.id;
			});

			if (index >= 0) {
				newBasket[index].isInCart = false;
				newBasket.splice(index, 1);
			} else {
				console.warn(
					`can't remove product (id :${action.id}) as its not existed`
				);
			}
			return { ...state, basket: newBasket };
		// we have id,quantity now change the quantity of product with given id
		case ACTIONS.CHANGE_TOTAL:
			let priceBasket = [...state.basket];
			const i = state.basket.findIndex((basketItem) => {
				return basketItem.id === action.id;
			});
			if (i >= 0) {
				state.basket[i].quantity = action.quantity;
			} else {
				console.warn(
					`can't remove product (id :${action.id}) as its not existed`
				);
			}
			return { ...state, basket: priceBasket };

		case ACTIONS.SET_USER:
			return { ...state, user: action.user };
			// case ACTIONS.LOGOUT:
			// 	// signOut(auth);
			// 	const logout = async (e) => {
			// 		e.preventDefault();
			// 		try {
			// 			const user = await auth.signOut(auth);

			// 			// console.log(user);
			// 		} catch (error) {
			// 			// console.log(error.message);
			// 			alert("can not logout", error.message);
			// 		}
			// 	};
			return { ...state, user: null };
		default:
			return state;
	}
};
export default reducer;
