"use client";
import React from "react";
import InputMatch from "../../components/InputMatch/InputMatch";
import {useMetaParamsStore} from "@/stores/useMetaParamsStore";

const SearchLive = () => {
	const {setSearchText} = useMetaParamsStore();
	return (
		<div className="flex items-center justify-start w-full bg-white rounded-full">
			<InputMatch
				setSearchText={setSearchText}
				className={{
					width: "w-[500px]",
				}}
			/>
		</div>
	);
};

export default SearchLive;
