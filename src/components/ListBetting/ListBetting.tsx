import React from "react";
import fixtureApi from "@/apis/fixtures.api";
import ListBoard from "../ListBoard/ListBoard";
import SkeletonBoard from "../ListBoard/SkeletonBoard";
import EmptyData from "../EmptyData/EmptyData";

const ListBetting = async ({
	search,
	statuses,
	date,
	preHours,
	leaguesId,
	period,
	statistic,
}: {
	search?: string;
	statuses?: string;
	date?: string;
	preHours?: string;
	leaguesId?: string;
	period?: number;
	statistic?: number;
}) => {
	const result = await fixtureApi.getPagingFixturesFollowStatus({
		statuses,
		date,
		search,
		preHours,
		leaguesId,
		period,
		statistic,
	});
	const data = result?.data?.results?.data || [];
	const isLoadMore = result?.data?.results?.totalPages
		? result?.data?.results?.totalPages > 1
		: false;

	return (
		<div className="flex flex-col gap-5">
			{data?.length > 0 ? (
				<>
					<ListBoard
						data={data}
						isLoadMore={isLoadMore}
						statuses={statuses}
						date={date}
						preHours={preHours}
						period
						statistic
					/>
				</>
			) : (
				<EmptyData />
			)}
		</div>
	);
};

export default ListBetting;
