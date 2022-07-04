import React, { useState } from "react";
import { db } from "../firebase-config";
import { collection, addDoc } from "firebase/firestore";

export default function AddTodo() {
	const [title, setTitle] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (title !== "") {
			await addDoc(collection(db, "todos"), {
				title,
				completed: false,
			});
			setTitle("");
		}
	};
	return (
		<>
			<h2 className='app-title'>Todo App</h2>
			<form onSubmit={handleSubmit} className='addtodo-form'>
				<input
					type='text'
					placeholder='Enter todo...'
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<button type='submit' className='add-btn'>
					Add
				</button>
			</form>
		</>
	);
}
