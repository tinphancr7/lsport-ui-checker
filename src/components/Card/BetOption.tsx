import React from "react";

const BetOption = ({text, value}: {text: string; value: string}) => (
	<div className="bg-[#F3F4F6] text-xs flex items-center justify-between font-medium rounded-md flex-1 px-2.5 py-1">
		<span className="text-primary">{text}</span>
		<span className="text-primary">{value}</span>
	</div>
);

export default BetOption;
