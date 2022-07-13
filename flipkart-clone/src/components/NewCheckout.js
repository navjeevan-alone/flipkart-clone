import React from "react";
import { Card, Button } from "react-bootstrap";
function newCheckout() {
	return (
		<div className='checkout'>
			<section className='products'>
				<Card className='product-item'>
					<div className='img-box'>
						<img src='' alt='' />
					</div>
					<div className='details-box'>
						<h3 className='product-title'>hello </h3>
						<Button variant='primary'>Hello</Button>
					</div>
				</Card>
			</section>
			<section className='total'></section>
		</div>
	);
}

export default newCheckout;
