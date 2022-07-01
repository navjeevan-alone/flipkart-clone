import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	Button,
	Grid,
	Typography,
	TextField,
	Paper,
	Divider,
	Chip,
} from "@mui/material";
import { auth } from "../Firebase";
// import CreateAccount from "./CreateAccount";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth";

function Login() {
	let navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	// const { createUserWithEmailAndPassword } = auth;
	//register here

	const handleRegister = (e) => {
		e.preventDefault();
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				navigate("/");
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				alert(errorMessage);
				// ..
			});
		// try {
		// 	const user = await auth.createUserWithEmailAndPassword(
		// 		auth,
		// 		email,
		// 		password
		// 	);
		// 	console.log(user);
		// 	console.log("registered");
		// } catch (error) {
		// 	alert(error.message);
		// }
	};

	// login here
	const handleLogin = (e) => {
		e.preventDefault();
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				navigate("/");
				console.log(user.email, "logged in successfully");
				// ...
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
			});
	};
	return (
		<Paper
			elevation={3}
			sx={{
				margin: "1rem auto",
				padding: "1rem .5rem",
				background: "white",
				flexGrow: 1,
				gap: "1rem",
				width: "clamp(50vw,20rem,100vw)",
			}}>
			<form id='login' onSubmit={handleLogin}>
				<Grid
					container
					direction='column'
					sx={{ maxWidth: "18rem", gap: "1rem", margin: " .5rem auto" }}>
					<Typography variant='h5' textAlign='center'>
						Login
					</Typography>
					<TextField
						required
						id='login-email'
						label='Email'
						size='small'
						value={email}
						onChange={(e) => {
							setEmail(e.target.value);
						}}
					/>
					<TextField
						required
						id='login-password'
						label='Password'
						type='password'
						size='small'
						value={password}
						onChange={(e) => {
							setPassword(e.target.value);
						}}
					/>
					{/* <Button variant='contained' color='warning'>
						Login
					</Button> */}

					<button type='submit'>Login</button>
				</Grid>
			</form>
			<Divider mt={5}>
				<Chip label='OR' />
			</Divider>
			<Button
				variant='outlined'
				color='warning'
				sx={{
					margin: "1rem auto",
					display: "block",
					width: "20rem",
				}}
				onClick={handleRegister}>
				Create Account
			</Button>
			{/* <CreateAccount /> */}
		</Paper>
	);
}

export default Login;
