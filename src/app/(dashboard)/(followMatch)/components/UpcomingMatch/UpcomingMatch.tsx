"use client";
const InputMatch = dynamic(() => import("../InputMatch/InputMatch"));
import {useState} from "react";
const UpcomingComp = dynamic(() => import("./UpcomingComp"));
import dynamic from "next/dynamic";

const UpcomingMatch = () => {
	const [searchText, setSearchText] = useState("");

	return (
		<div className="flex flex-col gap-5">
			<InputMatch setSearchText={setSearchText} />
			<UpcomingComp search={searchText} />
		</div>
	);
};

export default UpcomingMatch;
