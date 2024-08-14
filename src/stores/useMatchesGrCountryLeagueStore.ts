import matchApi from "@/apis/match.api";
import {create} from "zustand";

interface State {
	data: any[];
	isLoading: boolean;
	isLoadMore: boolean;
	error: any;
}

interface Actions {
	fetchData: (params: any) => Promise<void>;
}

const INITIAL_STATE: State = {
	data: [],
	isLoading: true,
	isLoadMore: false,
	error: null,
};

export const useMatchesGrCountryLeagueStore = create<State & Actions>(
	(set) => ({
		data: INITIAL_STATE.data,
		isLoading: INITIAL_STATE.isLoading,
		isLoadMore: INITIAL_STATE.isLoadMore,
		error: INITIAL_STATE.error,
		fetchData: async ({
			search = "",
			date,
			statuses,
			page,
			startDate,
			endDate,
			leagueId,
		}: any) => {
			try {
				set({isLoading: true, error: null});
				const response = await matchApi.getMatchesGrCountryLeague({
					search,
					date,
					statuses,
					page,
					startDate,
					endDate,
					leagueId,
				});

				const data = response?.data?.result;
				const isLoadMore = response?.data?.meta?.pages
					? response?.data?.meta?.pages > 1
					: false;

				set({data, isLoading: false, isLoadMore});
			} catch (error) {
				set({error, isLoading: false});
			}
		},
	})
);
