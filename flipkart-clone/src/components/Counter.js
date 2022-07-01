import React, { useState, useReducer } from "react";
//reducer function
import { Box, Button, Typography, Container, Paper } from "@mui/material";
const ACTIONS = {
	INCREMENT: "increment",
	DECREMENT: "decrement",
	INCREMENT_BY_FIVE: "increment_by_five",
	DECREMENT_BY_FIVE: "decrement_by_five",
};

function reducer(state, action) {
	switch (action.type) {
		case ACTIONS.INCREMENT:
			return { count: state.count + 1 };
		case ACTIONS.DECREMENT:
			return { count: state.count - 1 };
		case ACTIONS.INCREMENT_BY_FIVE:
			return { count: state.count + 5 };
		case ACTIONS.DECREMENT_BY_FIVE:
			return { count: state.count - 5 };

		default:
			return state;
	}
}
export default function Counter() {
	const [state, dispatch] = useReducer(reducer, {
		count: 0,
	});

	return (
		<Container>
			<Paper
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
				}}>
				<Typography variant='h2' textAlign='center'>
					{state.count}
				</Typography>
				<Box>
					<Button
						variant='contained'
						color='error'
						onClick={() => dispatch({ type: ACTIONS.DECREMENT })}>
						-1
					</Button>
					<Button
						variant='contained'
						onClick={() => dispatch({ type: ACTIONS.INCREMENT })}>
						+1
					</Button>
				</Box>
				<Box>
					<Button
						variant='contained'
						color='error'
						onClick={() => dispatch({ type: ACTIONS.DECREMENT_BY_FIVE })}>
						-5
					</Button>
					<Button
						variant='contained'
						onClick={() => dispatch({ type: ACTIONS.INCREMENT_BY_FIVE })}>
						+5
					</Button>
				</Box>
			</Paper>
		</Container>
	);
}
