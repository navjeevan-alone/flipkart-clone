import { useState } from "react";
import {
	Button,
	Grid,
	Typography,
	TextField,
	Paper,
	Divider,
	Chip,
} from "@mui/material";
export default function CreateAccount() {
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
				<TextField required id='create-name' label='Name' size='small' />
				<TextField required id='create-email' label='Email' size='small' />
				<TextField
					required
					id='create-password'
					label='Password'
					type='password'
					size='small'
				/>
				<TextField
					required
					id='create-confirm-password'
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
