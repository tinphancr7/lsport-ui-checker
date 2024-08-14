"use client";
import Board from "./Board";
import useLoadMore from "@/hooks/useLoadMore";
import ButtonLoadMore from "../Button/ButtonLoadMore";
import matchApi from "@/apis/match.api";
import {useFavouriteStore} from "@/stores/useFavouriteStore";

const ListBoard = ({
	data,
	isLoadMore = true,
	statuses,
	date,
	statistic,
	search,
	preHours,
}: any) => {
	const {fetchFavouriteForMatch, pageIndex} = useFavouriteStore();

	const fetchData = async ({page}) => {
		fetchFavouriteForMatch({pageIndex: page, pageSize: 10, status: statuses});

		return await matchApi.getMatchesFlowStatus({
			statuses,
			page,
			date,
			search,
			statistic,
			preHours,
		});
	};
	const {items, loadMoreData, hasMoreData, isLoading} = useLoadMore({
		fetchData,
		isLoadMore,
		initialData: data,
	});

	return (
		<div className="flex items-center flex-col gap-4 w-full">
			{items?.length > 0 &&
				items.map((item, index) => <Board key={index} item={item} />)}
			<ButtonLoadMore
				isLoading={isLoading}
				loadMoreData={loadMoreData}
				hasMoreData={hasMoreData}
			/>
		</div>
	);
};

export default ListBoard;
