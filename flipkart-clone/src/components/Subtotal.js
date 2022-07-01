import { Grid, Typography, Button } from "@mui/material";
import { useStateValue } from "../StateProvider";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "../reducer";
function Subtotal() {
	const [{ basket }, dispatch] = useStateValue();

	return (
		<Grid item xs>
			<Typography variant='h5'>Total ({basket.length}) :</Typography>
			<Typography variant='h4'>
				<CurrencyFormat
					decimalScale={2}
					value={getBasketTotal(basket)}
					displayType={"text"}
					thousandSeparator={true}
					thousandSpacing='2s'
					prefix={"₹"}
				/>
			</Typography>

			<Button
				variant='contained'
				// variant={basket.length == 0 ? "disabled" : "contained"}
				color='warning'
				startIcon={<AccountBalanceWalletOutlinedIcon />}
				disabled={basket.length == 0 ? true : false}>
				Pay Now
			</Button>
		</Grid>
	);
}

export default Subtotal;
