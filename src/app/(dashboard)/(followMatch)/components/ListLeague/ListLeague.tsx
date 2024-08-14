"use client";
import {RadioGroup} from "@nextui-org/react";

import useLoadMore from "@/hooks/useLoadMore";
import League from "../League/League";
import dynamic from "next/dynamic";
import matchApi from "@/apis/match.api";
import EmptyData from "@/components/EmptyData/EmptyData";

const ButtonLoadMore = dynamic(
	() => import("@/components/Button/ButtonLoadMore")
);

const ListLeague = ({
	data,
	isLoadMore,
	setLeaguesId,
	search,
	leaguesId,
	statuses,
	startDate,
	endDate,
}: any) => {
	const fetchData = async ({page}) => {
		return matchApi.getScheduleAndResultGrCountryLeague({
			search,
			page,
			pageSize: 1,
			statuses,
			startDate,
			endDate,
		});
	};
	const {items, loadMoreData, hasMoreData, isLoading} = useLoadMore({
		fetchData,
		isLoadMore,
		initialData: data,
	});

	return (
		<div>
			<RadioGroup
				value={leaguesId}
				onValueChange={(value) => setLeaguesId(value)}
				classNames={{
					wrapper: "flex flex-col gap-4",
				}}
			>
				{items?.length > 0 ? (
					<>
						{items.map((item, index) => (
							<League key={index} item={item} />
						))}
						<ButtonLoadMore
							isLoading={isLoading}
							loadMoreData={loadMoreData}
							hasMoreData={hasMoreData}
						/>
					</>
				) : (
					<EmptyData />
				)}
			</RadioGroup>
		</div>
	);
};

export default ListLeague;
