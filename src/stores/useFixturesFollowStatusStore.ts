import fixtureApi from "@/apis/fixtures.api";
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

export const useFixturesFollowStatusStore = create<State & Actions>((set) => ({
	data: INITIAL_STATE.data,
	isLoading: INITIAL_STATE.isLoading,
	isLoadMore: INITIAL_STATE.isLoadMore,
	error: INITIAL_STATE.error,

	fetchData: async ({
		search,
		preHours,
		statuses,
		date,
		pageIndex,
		period,
		statistic,
		pageSize,
	}: any) => {
		try {
			set({isLoading: true, error: null});

			const response = await fixtureApi.getPagingFixturesFollowStatus({
				search,
				preHours,
				statuses,
				date,
				period,
				statistic,
				pageSize,
				pageIndex,
			});

			const data = response?.data?.results?.data;
			const isLoadMore = response?.data?.results?.totalPages
				? response?.data?.results?.totalPages > 1
				: false;
			set({data, isLoading: false, isLoadMore});
		} catch (error) {
			set({error, isLoading: false});
		}
	},
}));
