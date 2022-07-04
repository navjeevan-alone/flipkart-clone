import "./todo.css";
import React, { useState, useEffect } from "react";
import AddTodo from "./AddTodo";
import Todo from "./TodoItem";
import Loading from "../components/Loading";
import {
	collection,
	query,
	onSnapshot,
	doc,
	updateDoc,
	deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase-config";

function TodoApp() {
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		const q = query(collection(db, "todos"));
		const unsub = onSnapshot(q, (querySnapshot) => {
			let todosArray = [];
			querySnapshot.forEach((doc) => {
				todosArray.push({ ...doc.data(), id: doc.id });
			});
			setTodos(todosArray);
		});
		return () => unsub();
	}, []);

	const handleEdit = async (todo, title) => {
		await updateDoc(doc(db, "todos", todo.id), { title: title });
	};
	const toggleComplete = async (todo) => {
		await updateDoc(doc(db, "todos", todo.id), { completed: !todo.completed });
	};
	const handleDelete = async (id) => {
		await deleteDoc(doc(db, "todos", id));
	};
	return (
		<div className='todo-app'>
			<div className='inner-container'>
				<AddTodo />
				<div className='todo_container'>
					{todos.length !== 0 ? (
						todos.map((todo) => (
							<Todo
								key={todo.id}
								todo={todo}
								toggleComplete={toggleComplete}
								handleDelete={handleDelete}
								handleEdit={handleEdit}
							/>
						))
					) : (
						<Loading />
					)}
				</div>
			</div>
		</div>
	);
}
export default TodoApp;
