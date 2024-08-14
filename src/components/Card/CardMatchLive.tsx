"use client";
import React from "react";
import StatusBadge from "./StatusBadge";
import Participant from "./Participant";
import Scoreboard from "./Scoreboard";
import BetOption from "./BetOption";
import Link from "next/link";

const CardMatchLive = ({item}: any) => {
	const convertToBetData = () => {
		const betData = item.Result?.Markets || [];
		const handicapFullTimeHome = betData
			.find((item: any) => item.Name == "Asian Handicap")
			?.Providers?.[0]?.Bets?.find((item: any) => item.Name == "1");

		const handicapFullTimeAway = betData
			.find((item: any) => item.Name == "Asian Handicap")
			?.Providers?.[0]?.Bets?.find((item: any) => item.Name == "2");

		return {
			handicapFullTimeHome,
			handicapFullTimeAway,
		};
	};

	const data = convertToBetData();

	return (
		<Link
			href={`/livestream/${item?.FixtureId}`}
			className="bg-white rounded-xl py-3 px-4 flex flex-col  gap-2 h-[190px] "
		>
			<div className="flex items-center justify-between text-xs font-medium">
				<StatusBadge status={item?.Status} date={item?.StartDate} />
				{/* <span className="text-white bg-primary rounded w-[47px] px-1 pt-1">43</span> */}
			</div>

			<div className="bg-[#E5E7EB] uppercase text-[8px] rounded-full p-1 font-bold  text-center ">
				{item?.LeagueName}
			</div>
			<div className="flex flex-col justify-between h-full">
				<div className="grid grid-cols-12">
					<Participant
						logo={item?.Participants[0]?.logo}
						name={item?.Participants[0]?.Name}
					/>
					<Scoreboard
						homeScore={
							item?.Result?.Livescore?.Scoreboard[0]?.Results[0]?.Value
						}
						awayScore={
							item?.Result?.Livescore?.Scoreboard[0]?.Results[1]?.Value
						}
					/>
					<Participant
						logo={item?.Participants[1]?.logo}
						name={item?.Participants[1]?.Name}
						alignRight
					/>
				</div>
				<div className="flex items-center justify-between gap-5">
					<BetOption
						text={data?.handicapFullTimeHome?.Line || "-"}
						value={data?.handicapFullTimeHome?.Price || "-"}
					/>
					<BetOption
						text={data?.handicapFullTimeAway?.Line || "-"}
						value={data?.handicapFullTimeAway?.Price || "-"}
					/>
				</div>
			</div>
		</Link>
	);
};

export default CardMatchLive;
