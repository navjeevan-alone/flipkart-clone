import React from "react";
import { Button, Grid, Typography, TextField, Paper } from "@mui/material";

function Login() {
	return (
		<Paper
			elevation={3}
			sx={{
				margin: "0 auto",
				padding: "1rem .5rem",
				background: "white",
				flexGrow: 1,
				gap: "1rem",
				width: "clamp(50vw,20rem,100vw)",
			}}>
			<Grid
				container
				direction='column'
				sx={{ maxWidth: "18rem", gap: "1rem", margin: "auto" }}>
				<Typography variant='h5' textAlign='center'>
					Login
				</Typography>
				<TextField
					required
					id='outlined-required'
					label='Username'
					size='small'
				/>
				<TextField
					required
					id='outlined-password-input'
					label='Password'
					type='password'
					size='small'
				/>
				<Button variant='contained'>Login</Button>
			</Grid>
		</Paper>
	);
}

export default Login;
