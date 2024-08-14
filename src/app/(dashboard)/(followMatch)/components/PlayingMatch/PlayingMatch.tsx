"use client";
import React, {useState} from "react";
const InputMatch = dynamic(() => import("../InputMatch/InputMatch"));

import Image from "next/image";
const PlayingComp = dynamic(() => import("./PlayingComp"));
import dynamic from "next/dynamic";

const PlayingMatch = () => {
	const [searchText, setSearchText] = useState("");

	return (
		<div className="flex flex-col gap-5">
			<InputMatch setSearchText={setSearchText} />
			<div className="h-[90px] w-full relative">
				<Image src="/imgs/frame.png" fill alt="" />
			</div>
			<PlayingComp search={searchText} />
		</div>
	);
};

export default PlayingMatch;
