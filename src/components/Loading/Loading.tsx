import {Spinner} from "@nextui-org/react";
import React from "react";

const Loading = () => {
	return (
		<div className="flex justify-center items-center h-[300px] uppercase font-bold">
			<Spinner size="lg" color="warning" />
		</div>
	);
};

export default Loading;
