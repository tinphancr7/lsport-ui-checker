import fixtureApi from "@/apis/fixtures.api";
import matchApi from "@/apis/match.api";
import {create} from "zustand";

interface State {
	data: any;
	isLoading: boolean;

	error: any;
}

interface Actions {
	fetchData: (params: any) => Promise<void>;
}

const INITIAL_STATE: State = {
	data: {},
	isLoading: true,

	error: null,
};

export const useMatchDetailStore = create<State & Actions>((set) => ({
	data: INITIAL_STATE.data,

	isLoading: INITIAL_STATE.isLoading,

	error: INITIAL_STATE.error,

	fetchData: async ({matchId}: any) => {
		try {
			set({isLoading: true, error: null});
			const response = await matchApi.getMatchDetailAndOdd(matchId);

			const data = response?.data?.result;

			set({data, isLoading: false});
		} catch (error) {
			set({error, isLoading: false});
		}
	},
}));
