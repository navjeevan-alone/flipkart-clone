import React from "react";

function Loading() {
	const style = {
		height: "2rem",
	};
	return (
		<div className='loading-container'>
			<span className='loading-icon' style={style}>
				{/* loading... */}
			</span>
		</div>
	);
}

export default Loading;
