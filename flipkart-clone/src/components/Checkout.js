import React, { useState, useEffect } from "react";
import {
	Paper,
	Stack,
	Grid,
	Typography,
	Button,
	Container,
	Divider,
	IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CheckoutItem from "./CheckoutItem";
import Subtotal from "./Subtotal";
import { useStateValue } from "../StateProvider";
import { db } from "../firebase-config";
import { collection, where, query, onSnapshot } from "firebase/firestore";
import { ACTIONS } from "../reducer";
function Checkout() {
	const [basket, setBasket] = useState([]);
	const q = query(collection(db, "products"), where("isInCart", "==", true));
	onSnapshot(q, (snapshot) => {
		let newBasket = [];
		snapshot.docs.forEach((doc) => {
			newBasket.push({ ...doc.data(), id: doc.id });
		});
		setBasket(newBasket);
	});
	return (
		<Container sx={{ borderRadius: "0 0 4px 4px" }}>
			<Paper p='.5rem' elevation={0} sx={{ borderRadius: "4px 4px 0 0" }}>
				<Stack
					direction='row'
					alignItems='center'
					justifyContent='space-between'
					p='0 .5rem'
					sx={{ margin: "0 0" }}>
					<Link to='/'>
						<IconButton aria-label='link'>
							<ArrowBackIosIcon />
						</IconButton>
					</Link>
					<Typography variant='h6' sx={{ fontWeight: "bold" }} p='.5rem 0'>
						Shopping Cart
					</Typography>
				</Stack>
				<Divider></Divider>
			</Paper>
			<Grid
				container
				columns={4}
				sx={{
					maxWidth: "80vw",
					margin: "0 auto",
					padding: "1rem .5rem",
					background: "white",
					flexGrow: 1,
					gap: "1rem",
				}}>
				<Grid item xs={3}>
					{basket.length != 0 ? (
						basket.map((item) => {
							return (
								<CheckoutItem
									title={item.title}
									image={item.image}
									id={item.id}
									price={item.price}
									key={item.id}
								/>
							);
						})
					) : (
						<EmptyBasket />
					)}
				</Grid>

				<Subtotal />
			</Grid>
		</Container>
	);
}

export default Checkout;
function EmptyBasket() {
	return (
		<div>
			<Typography variant='h5' as='h3'>
				Your Cart is empty.
			</Typography>
			<Typography variant='p' as='p'>
				Do some shopping my friend. <br /> let us have profits!
			</Typography>
			<span>Go to</span>
			<Button>
				<Link to='/products'>Products</Link>
			</Button>
		</div>
	);
}
