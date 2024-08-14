"use client";

import {getNextDays} from "@/utils";
import {useState} from "react";

import dynamic from "next/dynamic";
import moment from "moment";
import FinishComp from "../FinishMatch/FinishComp";
const InputMatch = dynamic(() => import("../InputMatch/InputMatch"));
const TabCSR = dynamic(() => import("@/components/TabComp/TabCSR"));
const UpcomingComp = dynamic(() => import("../UpcomingMatch/UpcomingComp"));
const PlayingComp = dynamic(() => import("../PlayingMatch/PlayingComp"));
const ListFixture = dynamic(() => import("../ListFixture/ListFixture"));

const BettingMatch = () => {
	const tabs1 = [
		{
			id: 0,
			label: "Trong Trận",
		},
		{
			id: 1,
			label: "Sắp diễn ra",
		},
		{
			id: 2,
			label: "Chung cuộc",
		},
	];
	const tabs2 = getNextDays({
		num: 6,
		pos: 3,
	});
	const tabs = [...tabs1, ...tabs2];
	const [searchText, setSearchText] = useState("");
	const [currentTab, setCurrentTab] = useState("0");
	const renderComponent = (pos) => {
		switch (pos) {
			case "0":
				return <PlayingComp search={searchText} />;
			case "1":
				return <UpcomingComp search={searchText} />;
			case "2":
				return <FinishComp search={searchText} />;
			default:
				return (
					<ListFixture
						statuses="0,1,2,3,4,5"
						date={tabs[Number(currentTab)]?.day || ""}
						startDate={moment(tabs[Number(currentTab)]?.day || new Date())
							?.startOf("day")
							?.unix()}
						endDate={moment(tabs[Number(currentTab)]?.day || new Date())
							?.endOf("day")
							?.unix()}
						search={searchText}
						period={0}
						statistic={0}
					/>
				);
		}
	};
	return (
		<div className="flex flex-col gap-5">
			<InputMatch setSearchText={setSearchText} />
			<TabCSR
				tabs={tabs}
				currentTab={currentTab}
				setCurrentTab={setCurrentTab}
				className={{
					tabList:
						"gap-6 w-full border-0  relative rounded-lg bg-white   p-2 font-semibold flex item-center justify-between ",
					tab: `flex-1 text-center  h-10`,
					tabContent:
						"group-data-[selected=true]:text-white  group-data-[selected=true]:border-none text-black37 ",
				}}
			/>
			{renderComponent(currentTab)}
		</div>
	);
};

export default BettingMatch;
