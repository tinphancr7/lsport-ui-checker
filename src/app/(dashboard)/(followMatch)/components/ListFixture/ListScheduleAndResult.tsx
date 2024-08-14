import EmptyData from "@/components/EmptyData/EmptyData";
import ListBoard from "@/components/ListBoard/ListBoard";
import SkeletonBoard from "@/components/ListBoard/SkeletonBoard";
import {useAuthStore} from "@/stores/useAuthStore";
import {useFavouriteStore} from "@/stores/useFavouriteStore";

import {useScheduleAndResultStore} from "@/stores/useScheduleAndResultStore";
import React, {useEffect} from "react";

const ListScheduleAndResult = ({
	search,
	date,
	statuses,
	startDate,
	endDate,
	preHours,
	leaguesId,
}: any) => {
	const {data, isLoading, isLoadMore, error, fetchData} =
		useScheduleAndResultStore();

	const {fetchFavouriteForMatch} = useFavouriteStore();
	const {isAuthenticated} = useAuthStore();

	useEffect(() => {
		fetchData({
			search,
			statuses,
			startDate,
			endDate,
			preHours,
			leaguesId,
		});

		if (isAuthenticated) {
			fetchFavouriteForMatch({pageIndex: 1, pageSize: 10, status: statuses});
		}
	}, [
		date,
		fetchData,
		search,
		statuses,
		fetchFavouriteForMatch,
		isAuthenticated,
		startDate,
		endDate,
		preHours,
		leaguesId,
	]);

	return (
		<div>
			<div className="flex flex-col gap-5">
				{!data?.length ? (
					<EmptyData />
				) : (
					<ListBoard
						data={data}
						isLoadMore={isLoadMore}
						search={search}
						date={date}
						statuses={statuses}
						preHours={preHours}
					/>
				)}
			</div>
		</div>
	);
};

export default ListScheduleAndResult;
