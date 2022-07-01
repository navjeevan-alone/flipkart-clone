import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	Button,
	Box,
	Grid,
	Typography,
	TextField,
	Paper,
	Divider,
	Chip,
	Container,
} from "@mui/material";
import { auth } from "../Firebase";
import LogoutIcon from "@mui/icons-material/Logout";
// import CreateAccount from "./CreateAccount";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth";
import { useStateValue } from "../StateProvider";
import { ACTIONS } from "../reducer";
function Login() {
	const [{ user }, dispatch] = useStateValue();
	let navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	//register here
	// lets try async and await :working great
	const handleRegister = async (e) => {
		e.preventDefault();
		try {
			const user = await createUserWithEmailAndPassword(auth, email, password);
			navigate("/");
			console.log(user);
		} catch (error) {
			console.log(error.message);
		}
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
	return user === null ? (
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
			<form id='login'>
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
					<Button variant='contained' color='warning' onClick={handleLogin}>
						Login
					</Button>
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
	) : (
		<Container>
			<Paper
				sx={{
					padding: "1rem 0",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
				}}>
				<Typography
					variant='h5'
					fontWeight='500'
					fontFamily='poppins'
					textAlign='center'
					margin={2}>
					You are already logged in
				</Typography>

				<Button
					variant='contained'
					color='error'
					startIcon={
						<LogoutIcon
							sx={{ marginRight: ".8rem" }}
							onClick={() => {
								dispatch({ type: ACTIONS.LOGOUT });
							}}
						/>
					}>
					Log out
				</Button>
			</Paper>
		</Container>
	);
}

export default Login;
