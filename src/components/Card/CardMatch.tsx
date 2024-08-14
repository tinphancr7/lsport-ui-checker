"use client";
import React from "react";
import StatusBadge from "./StatusBadge";
import Participant from "./Participant";
import Scoreboard from "./Scoreboard";
import BetOption from "./BetOption";
import Link from "next/link";
import slugify from "slugify";
import {generateData} from "@/utils";

const CardMatch = ({item}: any) => {
	return (
		<div className="bg-white rounded-xl py-3 px-4 flex flex-col  gap-2 h-[190px] ">
			<div className="flex items-center justify-between text-xs font-medium">
				<StatusBadge
					status={item?.status}
					matchTime={item?.matchTime}
					halfStartTime={item?.halfStartTime}
				/>
			</div>

			<div className="bg-[#E5E7EB] uppercase text-[8px] rounded-full p-1 font-bold  text-center ">
				{item?.leagueName}
			</div>

			<div className="flex flex-col justify-between h-full">
				<Link
					href={`match/${slugify(`${item?.homeName} vs ${item?.awayName}`, {
						lower: true,
						replacement: "-",
						locale: "vi",
						trim: true,
					})}/${item?.matchId}`}
					className="grid grid-cols-12"
				>
					<Participant logo={item?.homeIcon} name={item?.homeName} />
					<Scoreboard homeScore={item?.homeScore} awayScore={item?.awayScore} />
					<Participant logo={item?.awayIcon} name={item?.awayName} alignRight />
				</Link>
				<div className="flex items-center justify-between gap-5">
					<BetOption
						text={
							generateData({type: "handicap", pos: "home", item})?.head || "-"
						}
						value={
							generateData({type: "handicap", pos: "home", item})?.bot || "-"
						}
					/>
					<BetOption
						text={
							generateData({type: "handicap", pos: "away", item})?.head || "-"
						}
						value={
							generateData({type: "handicap", pos: "away", item})?.bot || "-"
						}
					/>
				</div>
			</div>
		</div>
	);
};

export default CardMatch;
