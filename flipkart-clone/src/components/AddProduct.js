import React, { useState, useRef } from "react";
import "../todoApp/todo.css";
import { db } from "../firebase-config";
import { collection, addDoc } from "firebase/firestore";
function AddProduct() {
	const [title, setTitle] = useState("");
	const [price, setPrice] = useState(0);
	const [imgSrc, setImgSrc] = useState("");

	const handleAddProduct = async (e) => {
		e.preventDefault();
		let productData = {
			title,
			price,
			imgSrc,
		};
		if (title !== "" || price !== 0 || imgSrc !== "") {
			await addDoc(collection(db, "products"), {
				...productData,
				rating: 2.5,
				isInCart: false,
				quantity: 0,
			});
			setTitle("");
			setPrice(0);
			setImgSrc("");
		} else {
			alert("can not add product try again");
		}
	};

	return (
		<form onSubmit={handleAddProduct} className='addProduct-form'>
			<div className='inner-container'>
				<h2 className='app-title'>Add Product</h2>

				<input
					type='text'
					placeholder='Product title'
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>

				<input
					className='inp'
					type='number'
					placeholder='Price in ₹'
					value={price}
					min={0}
					onChange={(e) => setPrice(e.target.value)}
				/>

				<input
					type='text'
					placeholder='Image url'
					value={imgSrc}
					onChange={(e) => setImgSrc(e.target.value)}
				/>

				<button
					type='submit'
					className='add-btn'
					style={{ alignSelf: "flex-end" }}>
					Add Product
				</button>
			</div>
		</form>
	);
}

export default AddProduct;
