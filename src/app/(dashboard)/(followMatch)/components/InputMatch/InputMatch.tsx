"use client";
import {useDebounce} from "@/hooks/useDebounce";
import React, {useEffect, useState} from "react";
import {IoSearch} from "react-icons/io5";

const InputMatch = ({className, setSearchText}: any) => {
	const [value, setValue] = useState("");
	const searchMatch = useDebounce(value, 500);
	useEffect(() => {
		setSearchText(value);
	}, [searchMatch]);
	return (
		<div
			className={`bg-white px-4 py-2 rounded-3xl ${
				className?.width ? className?.width : ""
			} `}
		>
			<div className="flex items-center bg-grayF5 px-2.5 rounded-full gap-2 py-1">
				<span>
					<IoSearch className="text-gray" size={20} />
				</span>
				<input
					type="text"
					placeholder="Tìm giải đấu hoặc đội"
					className="font-medium text-lg bg-transparent flex-1 py-0.5 rounded-none focus:outline-none max-md:text-base"
					onChange={(e) => {
						setValue(e.target.value);
					}}
					value={value}
				/>
			</div>
		</div>
	);
};

export default InputMatch;
