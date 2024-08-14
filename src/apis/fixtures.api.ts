import {filterParams} from "@/utils";
import http from "@/utils/http";
const fixtureApi = {
	getPagingFixturesFollowStatus: ({
		statuses,
		pageIndex = 1,
		pageSize = 5,
		preHours,
		search,

		date,
	}: any) => {
		return http.get("/fixtures/get-paging-fixtures-by-status", {
			params: filterParams({
				statuses,
				pageSize,
				preHours,
				search,
				pageIndex,
				date,
			}),
		});
	},

	getPagingFixtureGrLocationLeague: ({
		search,
		date,
		statuses,
		pageIndex = 1,
		pageSize = 5,
	}: any) => {
		const params = {
			statuses,
			pageIndex,
			pageSize,
			search,
			date,
		};

		return http.get("/fixtures/get-paging-fixture-gr-location-league", {
			params: filterParams(params),
		});
	},
	getDetailFixture: ({
		fixtureId,
		marketsId = "1,2,3",
		market,
		scoreboard,
		statistic,
		period,
		livescore,
	}: any) => {
		const params = {
			fixtureIds: fixtureId,
			marketsId,
			providersId: "8",
			market,
			scoreboard,
			statistic,
			period,
			livescore,
		};

		return http.get("/fixtures/get-detail-fixture", {
			params: filterParams(params),
		});
	},
	getBookedEvent: ({fixtureId}: {fixtureId: string}) =>
		http.get(`/fixtures/get-booked-event/${fixtureId}`),
};

export default fixtureApi;
