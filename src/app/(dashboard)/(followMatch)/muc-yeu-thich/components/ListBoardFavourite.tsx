"use client";

import useLoadMore from "@/hooks/useLoadMore";
import ButtonLoadMore from "@/components/Button/ButtonLoadMore";
import { favouriteApi } from "@/apis/favourite.api";
import BoardFavourite from "./BoardFavourite";

const ListBoardFavourite = ({ data, isLoadMore = true, statuses }: any) => {
	const fetchData = async ({ page }: any) => {
		return favouriteApi.getFavouritesByStatus({
			status: statuses,
			pageIndex: Number(page),
			pageSize: 5,
		});
	};

	const { items, loadMoreData, hasMoreData, isLoading } = useLoadMore({
		fetchData,
		isLoadMore,
		initialData: data,
	});

	return (
		<div className="flex items-center flex-col gap-4 w-full">
			{items?.length > 0 &&
				items.map((item, index) => (
					<BoardFavourite key={index} item={item} />
				))
			}
			
			<ButtonLoadMore
				isLoading={isLoading}
				loadMoreData={loadMoreData}
				hasMoreData={hasMoreData}
			/>
		</div>
	);
};

export default ListBoardFavourite;
