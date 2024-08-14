"use client";
import {getNextDays} from "@/utils";
import {useEffect, useState} from "react";

const TabCSR = dynamic(() => import("@/components/TabComp/TabCSR"));
const ListLeague = dynamic(() => import("../ListLeague/ListLeague"));
import SkeletonLeague from "../League/SkeletonLeague";

import dynamic from "next/dynamic";
import moment from "moment";
import EmptyData from "@/components/EmptyData/EmptyData";
import ListScheduleAndResult from "../ListFixture/ListScheduleAndResult";
import {useScheduleAndResultGrCountryLeagueStore} from "@/stores/useScheduleAndResultGrCountryLeagueStore";

const SoonComp = ({search}: {search: string}) => {
	const [currentTab, setCurrentTab] = useState("0");
	const [leaguesId, setLeaguesId] = useState("");
	const statuses = "0,1,2,3,4,5";
	const {data, isLoading, isLoadMore, error, fetchData} =
		useScheduleAndResultGrCountryLeagueStore();

	const tabs = [
		{
			id: 0,
			label: "Tất cả",
		},
		...getNextDays({
			num: 7,
			pos: 1,
		}),
	];
	const startDate = moment(tabs[Number(currentTab)]?.day || new Date())
		?.startOf("day")
		?.unix();
	const endDate = moment(
		tabs[Number(currentTab)]?.day || moment().add(7, "days").toISOString()
	)
		?.endOf("day")
		?.unix();
	useEffect(() => {
		fetchData({
			search,
			statuses,
			startDate,
			endDate,
			date: tabs[Number(currentTab)]?.day || "",
		});
	}, [currentTab, fetchData, search]);

	return (
		<div className="flex flex-col gap-5 w-full">
			<TabCSR
				tabs={tabs}
				currentTab={currentTab}
				setCurrentTab={setCurrentTab}
				setLeaguesId={setLeaguesId}
				className={{
					tabList:
						"gap-6 w-full border-0  relative rounded-lg bg-white   p-2 font-semibold flex item-center justify-between ",
					tab: `flex-1 text-center  h-10`,
					tabContent:
						"group-data-[selected=true]:text-white  group-data-[selected=true]:border-none text-black37 ",
				}}
			/>
			{leaguesId ? (
				<ListScheduleAndResult
					search={search}
					startDate={startDate}
					endDate={endDate}
					statuses={statuses}
					leaguesId={leaguesId}
				/>
			) : (
				<>
					{isLoading ? (
						<div className="flex items-center flex-col gap-4 w-full">
							{new Array(2).fill(2).map((item, index) => (
								<SkeletonLeague key={index} />
							))}
						</div>
					) : (
						<div className="flex flex-col gap-5">
							{!data?.length ? (
								<EmptyData />
							) : (
								<ListLeague
									data={data}
									isLoadMore={isLoadMore}
									search={search}
									leaguesId={leaguesId}
									setLeaguesId={setLeaguesId}
									statuses={statuses}
									startDate={startDate}
									endDate={endDate}
								/>
							)}
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default SoonComp;
