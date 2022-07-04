import React from "react";
import {
	Accordion,
	AccordionDetails,
	Typography,
	AccordionSummary,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
function Details() {
	const detailsListItems = [
		"6.51 Inch 16.5cm HD+ Puch-hole Display with 1600x720 pixels. Larger screen to body ratio of 89.2 %.Side Fingerprint Sensor",
		"MediaTek Helio P35 GPU IMG GE8320 680 MHz Powerful 2.3 GHz Octa-core processorsupport LPDDR4X 1600 Mhz memory",
		"5000 mAh lithium polymer battery",
		"13MP Quad Camera 13MP Main + 2MP Macro + 2MP Bokeh Lens 16MP Front Camera",
		"Dual SIM nano+nano dual-standby 4G+4G.",
		"Color OS 7.2 based on Android 10.0 operating system Connector type: USB Type C",
	];
	return (
		<ul className='details-list'>
			{detailsListItems.map((detail) => {
				return <li>{detail}</li>;
			})}
		</ul>
	);
}
function MyAccordion({ summary, details }) {
	return (
		<Accordion
			className='myaccordion'
			// sx={{
			// 	marginBottom: "1rem",
			// 	maxWidth: "80vw",
			// 	marginLeft: "auto",
			// 	marginRight: "auto",
			// }}
		>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls='panel1a-content'
				id='panel1a-header'
				// sx={{
				// 	marginBottom: "1rem",
				// 	maxWidth: "80vw",
				// 	marginLeft: "auto",
				// 	marginRight: "auto",
				// }}
			>
				<Typography>{summary}</Typography>
				{/* <Typography>This is summayr</Typography> */}
			</AccordionSummary>
			<AccordionDetails>
				{/* <Details /> */}
				{details}
			</AccordionDetails>
		</Accordion>
	);
}

export default MyAccordion;
