"use client";
import React, {useEffect, useMemo} from "react";
import {getPreviousDays} from "@/utils";

import {useMetaParamsStore} from "@/stores/useMetaParamsStore";
import LocationList from "./LocationList";

import moment from "moment";
import EmptyData from "@/components/EmptyData/EmptyData";
import SkeletonLeague from "../../components/League/SkeletonLeague";
import {useScheduleAndResultGrCountryLeagueStore} from "@/stores/useScheduleAndResultGrCountryLeagueStore";

const ResultList = () => {
	const {currentDate, searchText, leagueId} = useMetaParamsStore();

	const dates = getPreviousDays() || [];
	const {data, isLoading, isLoadMore, error, fetchData} =
		useScheduleAndResultGrCountryLeagueStore();
	const statuses = "-1";
	const getDayFromCurrentDate = useMemo(() => {
		return dates?.find((d: any) => d.date === currentDate);
	}, [currentDate]);
	const startDate = moment(getDayFromCurrentDate?.day || new Date())
		?.startOf("day")
		?.unix();
	const endDate = moment(getDayFromCurrentDate?.day || new Date())
		?.endOf("day")
		?.unix();
	useEffect(() => {
		fetchData({
			search: searchText,
			statuses,
			startDate,
			endDate,
			leagueId,
		});
	}, [fetchData, searchText, currentDate, leagueId]);
	return (
		<div>
			{data?.length > 0 ? (
				<LocationList
					data={data}
					isLoadMore={isLoadMore}
					date={getDayFromCurrentDate?.day}
					search={searchText}
					startDate={startDate}
					endDate={endDate}
					statuses={statuses}
				/>
			) : (
				<EmptyData />
			)}
		</div>
	);
};

export default ResultList;
