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
	ButtonGroup,
	cardActionsClasses,
} from "@mui/material";
import { auth } from "../firebase-config";
import LogoutIcon from "@mui/icons-material/Logout";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	sendEmailVerification,
} from "firebase/auth";
import { useStateValue } from "../StateProvider";
import { ACTIONS, errorType } from "../reducer";
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
			user.displayName = "chetan";
			navigate("/");
			// console.log(user);
		} catch (error) {
			const errorMessage = error.message;
			const errorCode = error.code;
			// console.log(error.message);
			switch (errorMessage) {
				case errorType.errorWeakPassword:
					return alert("Password should be at least 6 characters ");
				case errorType.errorInvalidEmail:
					return alert("errorInvalidEmail");
				case "Firebase: Error (auth/missing-email).":
					return alert("Email is required");

				case errorType.errorOffline:
					return alert("Your device is offline! ");
				case errorType.errorInternal:
					return alert("Sorry, error from our side. Try again");
				case errorType.errorEmailInUse:
					return alert(
						"Email is already in use.Login instead or try different email"
					);

				default:
					return alert("You are logged in");
			}
		}
	};
	// login here

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			// try signing in
			const loginUser = await signInWithEmailAndPassword(auth, email, password);
			// ...rest of logic if neccessary
			navigate("/");
			console.log(user.email, "logged in successfully");
		} catch (error) {
			// catch error if there is
			alert(error.message + "  " + error.code);
		}
	};

	return user == null ? (
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
					<div className='btn-group-login'>
						<Button variant='contained' color='warning' onClick={handleLogin}>
							Login
						</Button>
						<Divider orientaion='verticle'>
							<Chip label='OR' />
						</Divider>
						<Button variant='outlined' color='warning' onClick={handleRegister}>
							Sign Up
						</Button>
					</div>
				</Grid>
			</form>
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
							// onClick={logoutReducer}
							// not working try to fix
						/>
					}>
					Log out
				</Button>
			</Paper>
		</Container>
	);
}

export default Login;
