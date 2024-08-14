import {filterParams} from "@/utils";
import {BACKEND_URL_ISPORT} from "@/utils/http";
import axios from "axios";

const matchApi = {
	getMatchesFlowStatus: ({
		search,
		statuses,
		page,
		startDate,
		endDate,
		preHours,
		leaguesId,
	}: any) =>
		axios.get(`${BACKEND_URL_ISPORT}/getLiveScoreTodayForLSport`, {
			params: filterParams({
				statuses,
				search,
				page,
				startDate,
				endDate,
				preHours,
				leaguesId,
			}),
		}),
	getScheduleAndResult: ({
		search,
		statuses,
		page,
		startDate,
		endDate,
		preHours,
		leaguesId,
	}: any) =>
		axios.get(`${BACKEND_URL_ISPORT}/getScheduleAndResultForLSport`, {
			params: filterParams({
				statuses,
				search,
				page,
				startDate,
				endDate,
				preHours,
				leaguesId,
			}),
		}),
	getMatchesGrCountryLeague: ({
		search,
		statuses,
		page,
		startDate,
		endDate,
		preHours,
		leagueId,
	}: any) =>
		axios.get(
			`${BACKEND_URL_ISPORT}/getLiveScoreTodayAndGroupCountryForLSport`,
			{
				params: filterParams({
					statuses,
					search,
					page,
					startDate,
					endDate,
					preHours,
					leagueId,
				}),
			}
		),
	getScheduleAndResultGrCountryLeague: ({
		search,
		statuses,
		page,
		startDate,
		endDate,
		preHours,
		leagueId,
	}: any) =>
		axios.get(
			`${BACKEND_URL_ISPORT}/getScheduleAndResultGroupCountryForLSport`,
			{
				params: filterParams({
					statuses,
					search,
					page,
					startDate,
					endDate,
					preHours,
					leagueId,
				}),
			}
		),

	getMatchsListByLeagueId: (id: string) => {
		return axios.get(
			`${BACKEND_URL_ISPORT}/getScheduleAndResultJustByLeagueId`,
			{
				params: {leagueId: id},
			}
		);
	},
	getMatchDetailAndOdd: (matchId: string) => {
		return axios.get(`${BACKEND_URL_ISPORT}/getMatchDetailAndOdd`, {
			params: {matchId},
		});
	},
};

export default matchApi;
