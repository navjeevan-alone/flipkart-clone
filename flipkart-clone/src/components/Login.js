import React, { useState } from "react";
import {
	Button,
	Grid,
	Typography,
	TextField,
	Paper,
	Divider,
	Chip,
} from "@mui/material";
import { auth } from "../firebase";
function CreateAccount() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const handleCreateAccount = (e) => {
		e.preventDefault();

		console.log("created account successfully");
	};

	return (
		<form id='create-account' onSubmit={handleCreateAccount}>
			<Grid
				container
				direction='column'
				sx={{ maxWidth: "18rem", gap: "1rem", margin: " .5rem auto" }}>
				<Typography variant='h5' textAlign='center'>
					Create Account
				</Typography>
				<TextField required id='outlined-required' label='Name' size='small' />
				<TextField required id='outlined-required' label='Email' size='small' />
				<TextField
					required
					id='outlined-password-input'
					label='Password'
					type='password'
					size='small'
				/>
				<TextField
					required
					id='outlined-password-input'
					label='Confirm Password'
					type='password'
					size='small'
				/>
				<Button variant='contained' color='warning'>
					Create Account
				</Button>
			</Grid>
		</form>
	);
}
function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const handleLogin = (e) => {
		e.preventDefault();

		console.log("logged in");
	};
	return (
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
					id='outlined-required'
					label='Email'
					size='small'
					value={email}
					onChange={(e) => {
						setEmail(e.target.value);
					}}
				/>
				<TextField
					required
					id='outlined-password-input'
					label='Password'
					type='password'
					size='small'
					value={password}
					onChange={(e) => {
						setPassword(e.target.value);
					}}
				/>
				<Button variant='contained' color='warning'>
					Login
				</Button>
			</Grid>
		</form>
	);
}
function signUpPage() {
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
			<Login />
			<Divider mt={5}>
				<Chip label='OR' />
			</Divider>
			<CreateAccount />
		</Paper>
	);
}

export default signUpPage;
