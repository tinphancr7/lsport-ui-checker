import {useEffect, useState} from "react";

const useLoadMore = ({fetchData, isLoadMore, initialData = []}: any) => {
	const [items, setItems] = useState([]);
	const [page, setPage] = useState(1);
	const [hasMoreData, setHasMoreData] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const loadMoreData = async () => {
		if (hasMoreData) {
			setIsLoading(true);
			const response = await fetchData({page: page + 1});

			const data = response?.data?.result || [];

			if (!data.length || response?.data?.meta?.pages <= page + 1) {
				setHasMoreData(false);
			}

			setItems((prev) => [...prev, ...data]);
			setPage((prev) => prev + 1);
			setIsLoading(false);
		}
	};
	useEffect(() => {
		setItems(initialData);
		setHasMoreData(isLoadMore);
		setPage(1);
	}, [initialData, isLoadMore]);
	return {
		items,
		loadMoreData,
		hasMoreData,
		isLoading,
	};
};

export default useLoadMore;
