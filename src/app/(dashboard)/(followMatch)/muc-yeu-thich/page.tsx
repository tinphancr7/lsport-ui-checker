"use client"

import {homeTabs} from "@/constants";
import TabSSR from "@/components/TabComp/TabSSR";
import ListFixtureFavourite from "./components/ListFixtureFavourite";
import { useMemo } from "react";
import { FixtureScoreboardStatus } from "@/constants/enum";
import { useAuthStore } from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";
import routes from "@/configs/routes";

function Favorite({
	searchParams,
}: {
	searchParams: {
		tab: string;
	};
}) {
	const router = useRouter();
	const { isAuthenticated } = useAuthStore();

	const currentTab = searchParams?.tab || "playing";

	const tabs = useMemo(() => 
		homeTabs?.filter((item => ["playing", "upcoming", "finish"].includes(item.id)))
		, []
	);

	const status = useMemo(() => {
		switch(searchParams?.tab) {
			case "playing":
				return FixtureScoreboardStatus.InProgress;
			case "upcoming":
				return FixtureScoreboardStatus.NotStartedYet;
			case "finish":
				return FixtureScoreboardStatus.Finished;
			default:
				return FixtureScoreboardStatus.InProgress;
		}
	}, [searchParams?.tab]);

	if (!isAuthenticated) {
		router.push(routes.dashboard);
	}

	return (
		<div className=" flex flex-col gap-5 mb-10">
			<TabSSR tabs={tabs} currentTab={currentTab} />

			<ListFixtureFavourite statuses={status} />
		</div>
	);
}

export default Favorite;
