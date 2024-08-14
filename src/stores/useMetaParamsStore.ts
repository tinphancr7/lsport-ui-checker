import moment from "moment";
import {create} from "zustand";

interface State {
	searchText: string;
	currentDate: string;
	leagueId: string;
}

interface Actions {
	setSearchText: (value: string) => void;
	setCurrentDate: (value: string) => void;
	resetSearchText: () => void;
	setLeagueId: (value: string) => void;
}

const INITIAL_STATE: State = {
	searchText: "",
	currentDate: moment().format("DD-MM"),
	leagueId: "",
};

export const useMetaParamsStore = create<State & Actions>((set) => ({
	searchText: INITIAL_STATE.searchText,
	currentDate: INITIAL_STATE.currentDate,
	leagueId: INITIAL_STATE.leagueId,
	setSearchText: (value) => set({searchText: value}),
	setCurrentDate: (value) => set({currentDate: value}),
	setLeagueId: (value) => set({leagueId: value}),
	resetSearchText: () => set({searchText: ""}),
}));
