import {convertStringOddToArray, convertToOdd} from "@/utils";
import React from "react";
import {MdLockOutline} from "react-icons/md";

const Cell = ({lock = false, item, type, pos}) => {
	const generateData = () => {
		const getValue = (type, index) =>
			convertStringOddToArray(item?.[type])?.[index];

		let head = "";
		let bot = "";
		const index = pos === "home" ? 6 : 7;

		const handleHandicap = (key) => {
			const value = getValue(key, 5);
			if (!value) return {head: "", bot: ""};
			head = Number(value) >= 0 === (pos === "home") ? convertToOdd(value) : "";
			bot = getValue(key, index);
			return {head, bot};
		};

		switch (type) {
			case "handicap":
			case "handicapHalf":
				return handleHandicap(type);
			case "overUnder":
			case "overUnderHalf":
				const value = getValue(type, 5);
				if (!value) return {head: "", bot: ""};
				head = `${pos === "home" ? "Tài" : "Xỉu"} ${convertToOdd(value)}`;
				bot = getValue(type, index);
				return {head, bot};
			default:
				if (pos === "home" && getValue("europeOdds", 5)) {
					head = 1;
					bot = getValue("europeOdds", 5);
				} else if (pos === "away" && getValue("europeOdds", 6)) {
					head = 2;
					bot = getValue("europeOdds", 6);
				} else if (getValue("europeOdds", 7)) {
					head = "X";
					bot = getValue("europeOdds", 7);
				}
				return {head, bot};
		}
	};
	return (
		<div className="flex items-center flex-col justify-center h-14 bg-grayF7 rounded w-full">
			{lock || (!generateData()?.head && !generateData()?.bot) ? (
				<MdLockOutline size={20} className="text-gray" />
			) : (
				<>
					<span className="text-primary text-xs">{generateData()?.head}</span>
					<span className="text-xl font-bold text-black max-md:font-medium max-md:text-xs tracking-wide">
						{generateData()?.bot}
					</span>
				</>
			)}
		</div>
	);
};

export default Cell;
