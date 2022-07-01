import React, { useState, useReducer } from "react";
//reducer function
import { Container, Paper } from "@mui/material";
const ACTIONS = {
	ADD_TODO: "Add_Todo",
	REMOVE_TODO: "Remove_Todo",
};
const reducer = ({ todos, action }) => {
	switch (action.type) {
		case ACTIONS.ADD_TODO:
			return [...todos, newTodo(action.payload.name)];
		case ACTIONS.REMOVE_TODO:
			return todos;
		default:
			return todos;
	}
};
function newTodo(name) {
	return { id: Date.now(), name: name, complete: false };
}
export default function Todo() {
	const [todos, dispatch] = useReducer(reducer, []);
	const [name, setName] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch({ type: "add-todo", payload: { name: name } });
		setName("");
	};

	return (
		<Container>
			<Paper>
				<form onSubmit={handleSubmit}>
					<input
						type='text'
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<ul>
						{/* {todos.Todos.map((item) => {
							<li>{item}</li>;
						})} */}
					</ul>
				</form>
			</Paper>
		</Container>
	);
}
