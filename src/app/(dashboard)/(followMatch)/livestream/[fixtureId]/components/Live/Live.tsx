import React from "react";

const Live = ({ url }: { url: string }) => {
	return (
		<div className="w-full h-[630px]">
			<iframe className="w-full h-full" src={url}></iframe>
		</div>
	);
};

export default Live;
