import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
	Button,
	Box,
	Container,
	Rating,
	Typography,
	Grid,
} from "@mui/material";
import MyAccordion from "./MyAccordion";
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
			{detailsListItems.map((detail) => {
				return <li>{detail}</li>;
			})}
		</ul>
	);
}

function ProductPage() {
	return (
		<Container
			maxWidth='lg'
			sx={{
				margin: "0 auto",
				padding: "1rem .5rem",
				background: "white",
				flexGrow: 1,
			}}>
			<Grid
				className='product-page-grid'
				container
				spacing={2}
				columns={{ xs: 4, sm: 8, md: 12 }}>
				<Grid
					item
					xs={4}
					pt={0}
					pl={0}
					// border={1}
					sx={{
						display: "grid",
						placeItems: "center",
					}}>
					<img
						src='img/phone.jpg'
						alt=''
						sx={{
							objectFit: "cover",
							maxHeight: "15rem",
							width: 118,
							margin: 0,
						}}></img>
				</Grid>
				<Grid item xs sx={{ padding: 0 }}>
					<Typography variant='p'>Category: Electronics</Typography>
					<Typography variant='h5'>
						Oppo A54 (Starry Blue, 4GB RAM, 64GB Storage) with No Cost EMI &
						Additional Exchange Offers
					</Typography>
					<Rating value={3.3} precision={0.1} readOnly size='large' />
					<Box display='flex' alignItems='center' gap='1rem'>
						<Typography variant='p'>Price : </Typography>
						<Typography variant='h4'>
							<sup>₹</sup> 150
						</Typography>
					</Box>
					<MyAccordion summary='Specifications' details={<Details />} />
					<Box display='flex' mt={1}>
						<Button
							variant='contained'
							color='warning'
							size='medium'
							disableElevation
							startIcon={<ShoppingCartIcon />}>
							Add to Cart
						</Button>
						{/* <Button
							variant='outlined'
							size='medium'
							color='error'
							disableElevation
							startIcon={<DeleteForeverIcon />}>
							Remove item
						</Button> */}
					</Box>
				</Grid>
			</Grid>
		</Container>
	);
}

export default ProductPage;
