import React, { useState, useEffect } from "react";
import {
	Grid,
	Typography,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Button,
	Box,
	Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { ACTIONS } from "../reducer";
import { useStateValue } from "../StateProvider";
import { getBasketTotal } from "../reducer";

function CheckoutItem({ id, title, image, price, isInCart }) {
	const [{ basket }, dispatch] = useStateValue();
	const [quantity, setQuantity] = useState(1);
	// useEffect(() => {}, [quantity]);
	const handleChange = (event) => {
		setQuantity(event.target.value);
		getBasketTotal(basket);
		dispatch({ type: ACTIONS.CHANGE_TOTAL, quantity: quantity, id: id });
	};

	const handleRemoveItem = () => {
		dispatch({ type: ACTIONS.REMOVE_FROM_BASKET, id: id });
	};

	return (
		<>
			<Grid
				className='product-page-grid'
				container
				spacing={2}
				mt={2}
				mb={2}
				columns={{ xs: 4, sm: 8, md: 12 }}>
				<Grid
					item
					xs={3}
					p={0}
					className='grid-item'
					sx={{
						display: "grid",
						placeItems: "center",
					}}>
					<img
						src={image}
						alt={title}
						className='checkout-image'
						// objectFit='contain'
						//maxWidth="100%"
					></img>
				</Grid>
				<Grid
					item
					container
					className='grid-item'
					xs
					sx={{ padding: 0 }}
					display='flex'
					direction='column'
					alignItems='flex-start'>
					<Typography variant='p' fontWeight='500' fontSize='1.2rem'>
						{title}
					</Typography>
					<FormControl sx={{ margin: ".5rem 0", minWidth: 120 }} size='small'>
						<InputLabel id='demo-select-small'>Quantity</InputLabel>
						<Select
							labelId='quantity'
							id='quantity'
							value={quantity}
							label='Quantity'
							onChange={handleChange}>
							{Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], (item) => {
								return (
									<MenuItem value={item} key={item}>
										{item}
									</MenuItem>
								);
							})}
						</Select>
					</FormControl>
					<Box display='flex' alignItems='flex-end' mt={1}>
						<Button
							onClick={handleRemoveItem}
							variant='contained'
							size='medium'
							color='error'
							disableElevation>
							<DeleteIcon />
						</Button>
					</Box>
				</Grid>
				<Box
					display='flex'
					alignItems='flex-start'
					direction='column'
					gap='1rem'>
					<Typography variant='subtitle1' fontWeight='bold' fontSize='1.5rem'>
						<sup>₹</sup>
						{price * quantity}
					</Typography>
				</Box>
			</Grid>
			<Divider />
		</>
	);
}

export default CheckoutItem;
