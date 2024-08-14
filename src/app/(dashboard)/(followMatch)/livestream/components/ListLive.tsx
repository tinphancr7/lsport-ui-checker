"use client";
import fixtureApi from "@/apis/fixtures.api";
// import ButtonLoadMore from "@/components/Button/ButtonLoadMore";
const ButtonLoadMore = dynamic(
	() => import("@/components/Button/ButtonLoadMore")
);

import CardMatchLive from "@/components/Card/CardMatchLive";
import useQueryConfig from "@/hooks/useQueryConfig";
import moment from "moment";
import dynamic from "next/dynamic";
import React, {useEffect, useState} from "react";

const ListLive = ({data, isLoadMore = true, statuses}: any) => {
	const queryConfig = useQueryConfig();
	const [items, setItems] = useState([]);
	const [page, setPage] = useState(1);
	const [hasMoreData, setHasMoreData] = useState(true);
	const [isLoading, setIsLoading] = useState(false);

	const loadMoreData = async () => {
		if (hasMoreData) {
			setIsLoading(true);
			const result = await fixtureApi.getPagingFixturesFollowStatus({
				statuses,
				pageIndex: page + 1 || 1,
				pageSize: 12,
				date: moment().toISOString(),
				search: queryConfig?.search || "",
			});

			const data = result?.data?.results?.data || [];
			if (!data.length || result?.data?.results?.totalPages <= page + 1) {
				setHasMoreData(false);
			}

			setItems((prev) => [...prev, ...data]);
			setPage((prev) => prev + 1);
			setIsLoading(false);
		}
	};
	useEffect(() => {
		setItems(data);
		setHasMoreData(isLoadMore);
	}, [data, isLoadMore]);
	return (
		<div>
			<div className="grid grid-cols-12 gap-5">
				{items?.map((item, index) => (
					<div
						className="col-span-4 max-sm:col-span-12 max-md:col-span-6"
						key={index}
					>
						<CardMatchLive item={item} />
					</div>
				))}
			</div>
			<ButtonLoadMore
				isLoading={isLoading}
				loadMoreData={loadMoreData}
				hasMoreData={hasMoreData}
			/>
		</div>
	);
};

export default ListLive;
