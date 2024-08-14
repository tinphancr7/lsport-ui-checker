import React from "react";
import {GiGolfFlag} from "react-icons/gi";
import Cell from "../Cell/Cell";

const HalfTimeRow = ({item}: any) => {
	return (
		<div className="grid grid-cols-12 gap-2">
			<div className="col-span-4 text-gray9E flex items-center gap-6">
				<div className="flex flex-row items-center gap-2 max-md:flex-col max-md:gap-1">
					<span className="border inline-flex rounded-full text-[10px] flex-shrink-0 p-0.5">
						H-T
					</span>
					<div className="flex items-center text-gray9E">
						{item?.homeHalfScore} -{item?.awayHalfScore}
					</div>
				</div>
				<div className="flex flex-row items-center gap-2 max-md:flex-col max-md:gap-1 text-gray9E">
					<span>
						<GiGolfFlag size={20} />
					</span>
					<div className="flex items-center text-gray9E">
						{item?.homeCorner}- {item?.awayCorner}
					</div>
				</div>
			</div>

			{/* PC */}
			<div className="hidden col-span-8 md:grid grid-cols-6 gap-2">
				{new Array(6).fill(0).map((it: any, index: number) => (
					<div key={index} className="col-span-1">
						{index === 2 || index === 5 ? (
							<Cell item={item} lock={index === 5} type="" pos="" />
						) : null}
					</div>
				))}
			</div>
		</div>
	);
};

export default HalfTimeRow;
