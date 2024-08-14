"use client";
import {useFixturesFollowStatusStore} from "@/stores/useFixturesFollowStatusStore";
import moment from "moment";
import React, {useEffect} from "react";

import SkeletonCardMatch from "@/components/Card/SkeletonCardMatch";
import {useMetaParamsStore} from "@/stores/useMetaParamsStore";
import ListLive from "./ListLive";
import EmptyData from "@/components/EmptyData/EmptyData";

const Livestream = () => {
	const {searchText} = useMetaParamsStore();

	const {data, isLoading, isLoadMore, error, fetchData} =
		useFixturesFollowStatusStore();

	useEffect(() => {
		fetchData({
			statuses: "1,2",
			pageIndex: 1,
			pageSize: 12,
			date: moment().toISOString(),
			search: searchText,
			period: 0,
			statistic: 0,
		});
	}, [searchText]);
	return (
		<div>
			{isLoading ? (
				<>
					<div className="max-md:hidden grid grid-cols-12 gap-5">
						{Array.from({length: 12}, (_) => _).map((_, index) => (
							<div key={index} className="col-span-4">
								<SkeletonCardMatch />
							</div>
						))}
					</div>

					<div className="md:hidden grid grid-cols-12 gap-5">
						{Array.from({length: 12}, (_) => _).map((_, index) => (
							<div key={index} className="col-span-12">
								<SkeletonCardMatch />
							</div>
						))}
					</div>
				</>
			) : (
				<>
					{data?.length > 0 ? (
						<ListLive data={data} isLoadMore={isLoadMore} statuses="1,2" />
					) : (
						<EmptyData />
					)}
				</>
			)}
		</div>
	);
};

export default Livestream;
