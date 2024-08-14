import {generateData} from "@/utils";
import React from "react";

const BoardBettingThreeCol = ({title, data, type}) => {
	return (
		<div className="p-4 rounded-xl bg-light max-md:px-2 w-full">
			<div className="pb-4">{title}</div>
			<div className="flex w-full flex-col gap-2">
				<BoardBettingItemThreeCol data={data} type={type} />
			</div>
		</div>
	);
};
const BoardBettingItemThreeCol = ({data, type}) => {
	return (
		<div className="grid grid-cols-12 gap-5">
			<div className="col-span-4 py-2 bg-cell rounded-md flex items-center justify-between text-xl max-md:text-xs max-md:px-2 px-9">
				<span className="text-primary font-medium max-md:text-xs max-md:text-right">
					{generateData({type, pos: "home", item: data})?.head}
				</span>
				<span>{generateData({type, pos: "home", item: data})?.bot}</span>
			</div>
			<div className=" col-span-4 py-2 bg-cell rounded-md flex items-center justify-between text-xl max-md:text-xs max-md:px-2 px-9">
				<span className="text-primary font-medium max-md:text-xs max-md:text-right">
					{generateData({type, pos: "dray", item: data})?.head}
				</span>
				<span>{generateData({type, pos: "dray", item: data})?.bot}</span>
			</div>
			<div className=" col-span-4 py-2 bg-cell rounded-md flex items-center justify-between text-xl max-md:text-xs max-md:px-2 px-9">
				<span className="text-primary font-medium max-md:text-xs max-md:text-right">
					{generateData({type, pos: "away", item: data})?.head}
				</span>
				<span>{generateData({type, pos: "home", item: data})?.bot}</span>
			</div>
		</div>
	);
};
export default BoardBettingThreeCol;
