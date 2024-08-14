import EmptyData from "@/components/EmptyData/EmptyData";
import ListBoard from "@/components/ListBoard/ListBoard";
import SkeletonBoard from "@/components/ListBoard/SkeletonBoard";
import {useAuthStore} from "@/stores/useAuthStore";
import {useFavouriteStore} from "@/stores/useFavouriteStore";
import {useMatchesFollowStatusStore} from "@/stores/useMatchesFollowStatusStore";
import React, {useEffect} from "react";

const ListFixture = ({
	search,
	date,
	statuses,
	startDate,
	endDate,
	preHours,
	leaguesId,
}: any) => {
	const {data, isLoading, isLoadMore, error, fetchData} =
		useMatchesFollowStatusStore();

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
			{isLoading ? (
				<div className="flex flex-col gap-4">
					{new Array(2).fill(0).map((_, index) => (
						<SkeletonBoard key={index} />
					))}
				</div>
			) : (
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
			)}
		</div>
	);
};

export default ListFixture;
