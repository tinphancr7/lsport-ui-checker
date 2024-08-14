"use client";
import moment from "moment";
import {useEffect, useState} from "react";

import ListLeague from "../ListLeague/ListLeague";

import SkeletonLeague from "../League/SkeletonLeague";
import {useMatchesGrCountryLeagueStore} from "@/stores/useMatchesGrCountryLeagueStore";
import EmptyData from "@/components/EmptyData/EmptyData";
import ListScheduleAndResult from "../ListFixture/ListScheduleAndResult";
import {useScheduleAndResultGrCountryLeagueStore} from "@/stores/useScheduleAndResultGrCountryLeagueStore";

const FinishComp = ({search}: {search: string}) => {
	const [leaguesId, setLeaguesId] = useState("");

	const {data, isLoading, isLoadMore, error, fetchData} =
		useScheduleAndResultGrCountryLeagueStore();

	useEffect(() => {
		fetchData({
			search,
			statuses: "-1",
			date: moment().toISOString(),
		});
	}, [fetchData, search]);

	return (
		<div className="flex flex-col gap-5">
			{leaguesId ? (
				<ListScheduleAndResult
					searchText={search}
					date={moment().toISOString()}
					statuses="-1"
					leaguesId={leaguesId}
				/>
			) : (
				<>
					{isLoading ? (
						<div className="flex items-center flex-col gap-4 w-full">
							{new Array(2).fill(2).map((item, index) => (
								<SkeletonLeague key={index} />
							))}
						</div>
					) : (
						<div className="flex flex-col gap-5">
							{!data?.length ? (
								<EmptyData />
							) : (
								<>
									<ListLeague
										data={data}
										statuses="-1"
										date={moment().toISOString()}
										isLoadMore={isLoadMore}
										searchText={search}
										leaguesId={leaguesId}
										setLeaguesId={setLeaguesId}
									/>
								</>
							)}
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default FinishComp;
