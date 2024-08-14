"use client";
// const TabCSR = dynamic(() => import("@/components/TabComp/TabCSR"));
import React, {useState} from "react";
const ListFixture = dynamic(() => import("../ListFixture/ListFixture"));
import {upcomingTabs} from "@/constants";
import dynamic from "next/dynamic";
import TabCSR from "@/components/TabComp/TabCSR";
import ListScheduleAndResult from "../ListFixture/ListScheduleAndResult";
// const ListScheduleAndResult = dynamic(
// 	() => import("../ListFixture/ListScheduleAndResult")
// );

const UpcomingComp = ({search}: {search: string}) => {
	const [currentTab, setCurrentTab] = useState("1");
	return (
		<div className="flex flex-col gap-5">
			<TabCSR
				tabs={upcomingTabs}
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
			<ListScheduleAndResult
				preHours={currentTab}
				statuses="0"
				search={search}
				startDate={null}
				endDate={null}
			/>
		</div>
	);
};

export default UpcomingComp;
