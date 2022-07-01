import React from "react";
import ProductCard from "./ProductCard";
import { useStateValue } from "../StateProvider";

import {
	Stack,
	Container,
	Typography,
	CardContent,
	Card,
	Button,
} from "@mui/material";
function CardsList() {
	const [{ products }] = useStateValue();
	return (
		<Container
			maxWidth='lg'
			sx={{
				margin: "0 auto",
				padding: "1rem .5rem",
				background: "white",
			}}>
			<Card p='.5rem' sx={{ margin: "1rem 0" }}>
				<Stack
					direction='row'
					alignItems='center'
					justifyContent='space-between'
					p='0 .5rem'>
					<Typography variant='h6' sx={{ fontWeight: "bold" }} p='.5rem 0'>
						Products
					</Typography>
					{/* <Button variant='contained' size='small' sx={{ height: "50" }}>
						View More
					</Button> */}
				</Stack>
			</Card>

			<Stack
				direction='row'
				sx={{ flexWrap: "wrap", gap: "1rem" }}
				justifyContent='space-between'>
				{products.map((product) => {
					return (
						<ProductCard
							id={product.id}
							title={product.title}
							image={product.image}
							rating={product.rating}
							price={product.price}
							isInCart={product.isInCart}
							key={product.id}
							quantity={product.quantity}
						/>
					);
				})}
			</Stack>
		</Container>
	);
}

export default CardsList;
