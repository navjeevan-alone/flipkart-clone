import React, { useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Button, Box, Paper, Rating, Typography, Grid } from "@mui/material";
import MyAccordion from "./MyAccordion";
import ToggleAddToCart from "./ToggleAddToCart";
import { Link, useLocation } from "react-router-dom";
function Details() {
	const detailsListItems = [
		"6.51 Inch 16.5cm HD+ Puch-hole Display with 1600x720 pixels. Larger screen to body ratio of 89.2 %.Side Fingerprint Sensor",
		"MediaTek Helio P35 GPU IMG GE8320 680 MHz Powerful 2.3 GHz Octa-core processorsupport LPDDR4X 1600 Mhz memory",
		"5000 mAh lithium polymer battery",
		"13MP Quad Camera 13MP Main + 2MP Macro + 2MP Bokeh Lens 16MP Front Camera",
		"Dual SIM nano+nano dual-standby 4G+4G.",
		"Color OS 7.2 based on Android 10.0 operating system Connector type: USB Type C",
	];
	return (
		<ul className='details-list'>
			{detailsListItems.map((detail, index) => {
				return <li key={index}>{detail}</li>;
			})}
		</ul>
	);
}

function ProductPage() {
	const [isAdded, setIsAdded] = useState(false);
	const location = useLocation();
	const { getProductData } = location.state;
	// console.log(getProductData);
	// getProductData.property we want will have required data
	return (
		<div className='product-page-grid'>
			<div className='prodocut-image'>
				<img
					src={getProductData.image}
					alt={getProductData.title}
					sx={{
						objectFit: "contain",
						width: "100%",
						// width: 118,
						margin: 0,
					}}></img>
			</div>
			<div className='product-details'>
				{/* <Typography variant='p'>Category: Electronics</Typography> */}
				<Typography variant='h5'>{getProductData.title}</Typography>
				<Rating
					value={getProductData.rating}
					precision={0.1}
					readOnly
					size='normal'
				/>
				<Box display='flex' alignItems='center' gap='1rem'>
					<Typography variant='p'>Price : </Typography>
					<Typography variant='h4'>
						<sup>₹</sup>
						{getProductData.price}
					</Typography>
				</Box>
				<ToggleAddToCart />
				{/* <MyAccordion summary='Specifications' details={<Details />} /> */}
			</div>
		</div>

		// </Container>
	);
}

export default ProductPage;
