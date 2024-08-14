"use client";
import {useState} from "react";

const InputMatch = dynamic(() => import("../InputMatch/InputMatch"));
const SoonComp = dynamic(() => import("./SoonComp"));
import dynamic from "next/dynamic";

const SoonMatch = () => {
	const [searchText, setSearchText] = useState("");

	return (
		<div className="flex flex-col gap-5">
			<InputMatch setSearchText={setSearchText} />
			<SoonComp search={searchText} />
		</div>
	);
};

export default SoonMatch;
