import SkeletonBoard from "@/components/ListBoard/SkeletonBoard";
import { FixtureScoreboardStatus } from "@/constants/enum";
import { useFavouriteStore } from "@/stores/useFavouriteStore";
import React, { useEffect } from "react";
import ListBoardFavourite from "./ListBoardFavourite";

function ListFixtureFavourite({
	statuses,
}: {
	statuses: FixtureScoreboardStatus;
}) {
	const { favourites, isLoadMore, pageIndex, isLoading, fetchFavouriteData } =
		useFavouriteStore();

	useEffect(() => {
		fetchFavouriteData({
			status: statuses,
			pageIndex,
			pageSize: 5,
		});
	}, [fetchFavouriteData, pageIndex, statuses]);

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
					{!favourites?.length ? (
						<div className="flex justify-center items-center h-[300px] uppercase font-bold">
							Mục yêu thích trống!
						</div>
					) : (
						<ListBoardFavourite
							data={favourites}
							isLoadMore={isLoadMore}
							statuses={statuses}
						/>
					)}
				</div>
			)}
		</div>
	);
}

export default ListFixtureFavourite;
