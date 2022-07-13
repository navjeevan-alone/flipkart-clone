import { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import {
	AppBar,
	Box,
	Toolbar,
	IconButton,
	Typography,
	InputBase,
	Badge,
	MenuItem,
	Menu,
	Button,
} from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LoginIcon from "@mui/icons-material/Login";
//our import
import { useStateValue } from "../StateProvider";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase-config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
// app bar functions readonly
const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	"&:hover": {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: "100%",
	[theme.breakpoints.up("sm")]: {
		marginLeft: theme.spacing(3),
		width: "auto",
	},
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "inherit",
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("md")]: {
			width: "20ch",
		},
	},
}));

export default function Nav() {
	const [{ basket, user }, dispatch] = useStateValue();
	const [searchTerm, setSearchTerm] = useState("");
	const searchQuery = query(
		collection(db, "products"),
		where("title", "==", searchTerm)
	);
	onSnapshot(() => {
		let newArray = [];
		searchQuery.doc.forEach((doc) => {
			newArray.push({ ...doc.data(), id: doc.id });
		});
		console.log(newArray);
	});
	let navigate = useNavigate();
	const handleLogout = async (e) => {
		e.preventDefault();
		try {
			const user = await auth.signOut(auth);
			navigate("/");
			// console.log(user);
		} catch (error) {
			alert(error.message);
		}
	};
	// mui code
	const [anchorEl, setAnchorEl] = useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const handleMobileMenuOpen = (event) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const menuId = "nav";
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			id={menuId}
			keepMounted
			transformOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			open={isMenuOpen}
			onClose={handleMenuClose}>
			{/* <MenuItem onClick={handleMenuClose}>
				<PersonIcon sx={{ marginRight: ".8rem" }} />
				<span>{user != null ? user.split("@")[0] : ""}</span>
			</MenuItem>
			<MenuItem onClick={handleMenuClose}>
				<LogoutIcon sx={{ marginRight: ".8rem" }} />
				<span>Log out</span>
			</MenuItem> */}
		</Menu>
	);

	const mobileMenuId = "primary-search-account-menu-mobile";
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}>
			<MenuItem>
				<Link to='/products' className='flex-link'>
					<IconButton
						size='normal'
						aria-label='show 4 new mails'
						color='inherit'
						sx={{ marginRight: ".6rem" }}>
						<Badge>
							<LocalOfferIcon />
						</Badge>
					</IconButton>
					<p>Products</p>
				</Link>
			</MenuItem>
			<MenuItem>
				<Link to='/cart' className='flex-link'>
					<IconButton
						size='normal'
						aria-label='show 4 new mails'
						color='inherit'
						sx={{ marginRight: ".6rem" }}>
						<Badge badgeContent={basket?.length} color='error'>
							<ShoppingCartIcon />
						</Badge>
					</IconButton>
					<p>Cart</p>
				</Link>
			</MenuItem>
			<MenuItem>
				<IconButton size='normal' color='inherit' sx={{ marginRight: ".6rem" }}>
					<AccountCircle />
				</IconButton>
				<p>{user != null ? auth?.currentUser.email.split("@")[0] : "Guest"}</p>
			</MenuItem>
			{user != null ? (
				<MenuItem onClick={handleLogout}>
					<IconButton
						size='normal'
						color='inherit'
						sx={{ marginRight: ".6rem" }}>
						<LogoutIcon />
					</IconButton>
					<p>Log out</p>
				</MenuItem>
			) : (
				<MenuItem>
					<Link to='/login' className='flex-link'>
						<IconButton
							size='normal'
							color='inherit'
							sx={{ marginRight: ".6rem" }}>
							<LoginIcon />
						</IconButton>
						<p>Log in</p>
					</Link>
				</MenuItem>
			)}
		</Menu>
	);

	return (
		<Box sx={{ flexGrow: 1, marginBottom: "1rem" }}>
			<AppBar position='static'>
				<Toolbar>
					<IconButton
						size='large'
						edge='start'
						color='inherit'
						aria-label='open drawer'
						sx={{ mr: 2 }}>
						<MenuIcon />
					</IconButton>
					<Typography
						variant='h6'
						noWrap
						component='div'
						sx={{ display: { xs: "none", sm: "block" } }}>
						Flipkart
					</Typography>
					<Search value='chetan'>
						<SearchIconWrapper>
							<SearchIcon />
						</SearchIconWrapper>
						<StyledInputBase
							placeholder='Search products'
							value={searchTerm}
							inputProps={{ "aria-label": "search" }}
						/>
					</Search>
					<Box sx={{ flexGrow: 1 }} />
					<Box
						sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
						<Button variant='contained' disableElevation>
							<Link to='/products'>Products</Link>
						</Button>
						<Button size='normal' color='inherit'>
							<Link to='/cart'>
								<Badge badgeContent={basket?.length} color='error'>
									<ShoppingCartIcon />
								</Badge>
							</Link>
						</Button>
						{user === null ? (
							<Button variant='contained' color='warning' disableElevation>
								<Link to='/login'>Login</Link>
							</Button>
						) : (
							""
						)}
					</Box>
					<Box sx={{ display: { xs: "flex", md: "flex" } }}>
						<IconButton
							size='normal'
							aria-label='show more'
							aria-controls={mobileMenuId}
							aria-haspopup='true'
							onClick={handleMobileMenuOpen}
							color='inherit'>
							<MoreIcon />
						</IconButton>
					</Box>
				</Toolbar>
			</AppBar>
			{renderMobileMenu}
			{renderMenu}
		</Box>
	);
}
