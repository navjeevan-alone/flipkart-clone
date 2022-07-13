import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
	Button,
	CardActionArea,
	CardActions,
	Rating,
	Stack,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import { ACTIONS } from "../reducer";
import { collection, updateDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config";
export default function ProductCard({
	title,
	id,
	image,
	rating,
	price,
	isInCart,
	quantity,
}) {
	const productData = {
		title,
		id,
		image,
		rating,
		price,
		isInCart,
		quantity,
	};
	const [{ basket }, dispatch] = useStateValue();
	const [itemQuantity, setItemQuantity] = useState(0);
	const [isAdded, setIsAdded] = useState(false);

	const getData = async () => {
		try {
			const docRef = doc(db, "products", id);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				return setIsAdded(docSnap.data().isInCart, id);
			}
		} catch (error) {
			console.log("document dosent exist");
		}
	};
	// getData();
	useEffect(() => {
		return () => getData();
	}, []);
	const addToBasket = async () => {
		setItemQuantity(itemQuantity + 1);
		setIsAdded(true);

		handleCart();
		dispatch({
			type: ACTIONS.ADD_TO_BASKET,
			item: {
				id,
				title,
				image,
				rating,
				price,
				isInCart: true,
				quantity: 1,
			},
		});
	};
	const handleCart = async () => {
		try {
			await updateDoc(doc(db, "products", id), {
				isInCart: !isInCart,
				quantity: 1,
			});
		} catch (error) {
			alert(error.message);
		}
	};
	return (
		<Card
			sx={{
				maxWidth: 216,
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
			}}>
			<CardActionArea>
				<Link to={`/products/${id}`} state={{ getProductData: productData }}>
					<CardMedia
						objectfit='contain'
						component='img'
						width='100%'
						image={image}
						alt={title}
						sx={{
							objectFit: "contain",
							maxHeight: "10rem",
						}}
					/>

					<CardContent sx={{ padding: "0.2rem .8rem" }}>
						<Typography variant='h6' as='p' sx={{ fontSize: "1.15rem" }}>
							{title}
						</Typography>
					</CardContent>
				</Link>
			</CardActionArea>

			<Stack p={"0.5rem"}>
				<Rating size='small' value={rating} readOnly />
				<Typography variant='h5'>
					{" "}
					<sup>₹</sup>
					{price}
				</Typography>
				{isAdded ? (
					<Button
						onClick={() => {
							dispatch({ type: ACTIONS.REMOVE_FROM_BASKET, id: id });
							setIsAdded(false);
							handleCart();
						}}
						variant='outlined'
						size='small'
						color='error'
						sx={{ width: "100%" }}
						disableElevation
						startIcon={<DeleteForeverIcon />}>
						Remove
					</Button>
				) : (
					<Button
						onClick={addToBasket}
						variant='contained'
						size='small'
						color='warning'
						sx={{ width: "100%" }}
						disableElevation
						startIcon={<ShoppingCartIcon />}>
						Add to Cart
					</Button>
				)}
			</Stack>
		</Card>
	);
}
