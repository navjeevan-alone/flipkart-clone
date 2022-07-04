import React, { useState, useEffect } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import { ACTIONS } from "../reducer";
import { db } from "../firebase-config";
import { updateDoc, doc, getDoc } from "firebase/firestore";

function ToggleAddToCart() {
	const [isAdded, setIsAdded] = useState(false);
	const [{ basket }, dispatch] = useStateValue();
	const location = useLocation();
	const { getProductData } = location.state;
	const id = getProductData.id;
	const handleCart = async () => {
		const docSnap = await getDoc(id);
		if (docSnap.exists()) {
			console.log(docSnap.data().toString());
			await updateDoc(doc(db, "products", getProductData.id), {
				isInCart: !isAdded,
			});
		} else {
			alert("some error occured");
		}
	};
	useEffect(() => {
		return () => handleCart();
	}, []);
	return (
		<div className='btn-box'>
			{isAdded ? (
				<Button
					onClick={() => {
						dispatch({
							type: ACTIONS.REMOVE_FROM_BASKET,
							id: getProductData.id,
						});
						setIsAdded(!isAdded);
					}} //
					variant='outlined' //
					color='error' //
					size='large'
					// sx={{ width: "100%",maxWidth:"" }}
					disableElevation
					startIcon={<DeleteForeverIcon />}>
					{/*  */}
					Remove
				</Button>
			) : (
				<Button
					onClick={() => {
						dispatch({ type: ACTIONS.ADD_TO_BASKET, id: getProductData.id });

						setIsAdded(!isAdded);
					}}
					variant='contained'
					size='large'
					color='warning'
					// sx={{ width: "100%" }}
					disableElevation
					startIcon={<ShoppingCartIcon />}>
					Add to Cart
				</Button>
			)}
		</div>
	);
}

export default ToggleAddToCart;
