"use client";
import React, {useEffect} from "react";

import {useMatchDetailStore} from "@/stores/useMatchDetailStore";
import Image from "next/image";
import {IoFootballSharp} from "react-icons/io5";
import {generateMatchTime} from "@/utils";
import {Progress} from "@nextui-org/react";
import {LOGO_DEFAULT} from "@/constants";
import {GiGolfFlag} from "react-icons/gi";

function MatchStat({matchId}: {matchId: string}) {
	const {data, fetchData} = useMatchDetailStore();

	useEffect(() => {
		fetchData({
			matchId,
		});
	}, [matchId, fetchData]);

	return (
		<div className="relative flex items-center justify-center">
			<div className="h-[120px] w-full relative">
				<Image
					src="/imgs/match-info.png"
					alt=""
					fill
					className="h-auto object-cover"
				/>
			</div>
			<div className="absolute z-10 top-0 left-0 bottom-0 right-0 bg-slate-900/70 rounded-lg">
				<div className="h-full grid grid-cols-12 justify-between items-center max-md:py-3 max-md:gap-1">
					<div className="col-span-4 max-md:col-span-3 flex justify-center items-center gap-5 max-md:flex-col-reverse max-md:justify-end max-md:gap-2 max-md:h-full">
						<p className="max-w-64 text-light text-center text-2xl font-bold max-md:text-xs max-md:font-medium line-clamp-3">
							{data?.homeName}
						</p>
						<div className="bg-white rounded-full p-2 max-md:p-0">
							<div className="w-14 h-14 bg-transparent ring-offset-white max-md:w-10 max-md:h-10 relative">
								<Image
									src={data?.homeIcon || LOGO_DEFAULT}
									alt=""
									fill
									className="rounded-lg"
								/>
							</div>
						</div>
					</div>
					<div className="col-span-4 max-md:col-span-6 text-light max-md:h-full">
						<div className="font-bold text-2xl flex justify-center items-center gap-8 mb-3 max-md:text-xl">
							<span>{data?.homeScore}</span>
							<span>:</span>
							<span>{data?.awayScore}</span>
						</div>
						<div className="flex justify-between items-center">
							<p className="flex items-center gap-2 max-md:text-xs max-md:gap-1">
								<IoFootballSharp className="max-md:text-base text-xl" />
								<span>
									{data?.homeHalfScore} - {data?.awayHalfScore}
								</span>
							</p>
							<span className="max-md:text-xs">
								{generateMatchTime({
									matchTime: data?.matchTime,
									status: data?.status,
									halfStartTime: data?.halfStartTime,
								})}
							</span>
							<p className="flex items-center gap-2 max-md:text-xs max-md:gap-1">
								<GiGolfFlag className="max-md:text-base text-xl" />
								<span>
									{data?.homeCorner} - {data?.awayCorner}
								</span>
							</p>
						</div>
						<Progress
							label="Monthly expenses"
							size="sm"
							value={data?.status === "1" ? 0 : 9000}
							maxValue={9000}
							color="warning"
							showValueLabel={true}
							classNames={{labelWrapper: "hidden"}}
						/>
						{/* <p className="text-center mt-1 max-md:text-xs">{periodStatus}</p> */}
					</div>
					<div className="col-span-4 max-md:col-span-3 flex justify-center items-center gap-5 max-md:flex-col max-md:justify-start max-md:gap-2 max-md:h-full">
						<div className="bg-white rounded-full p-2 max-md:p-0">
							<div className="w-14 h-14 bg-transparent ring-offset-white max-md:w-10 max-md:h-10 relative">
								<Image
									src={data?.awayIcon || LOGO_DEFAULT}
									alt=""
									fill
									className="rounded-lg"
								/>
							</div>
						</div>
						<p className="max-w-64 text-light text-center text-2xl font-bold max-md:text-xs max-md:font-medium line-clamp-3">
							{data?.awayName}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default MatchStat;
