"use client";
import {useState} from "react";
import InputMatch from "../InputMatch/InputMatch";
import FinishComp from "./FinishComp";

const FinishMatch = () => {
	const [searchText, setSearchText] = useState("");

	return (
		<div className="flex flex-col gap-5">
			<InputMatch setSearchText={setSearchText} />
			<FinishComp search={searchText} />
		</div>
	);
};

export default FinishMatch;
