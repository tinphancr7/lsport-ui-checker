import {
	getFavouritesByStatus,
	QueryFavouriteByStatus,
} from "@/apis/favourite.api";
import {FixtureScoreboardStatus} from "@/constants/enum";
import {create} from "zustand";

interface STATE {
	favourites: any[];
	favouritesUser: [];
	isLoading: boolean;
	isLoadMore: boolean;
	totalPages: number;
	pageIndex: number;
	pageSize: number;
}

const INITIAL_STATE: STATE = {
	favourites: [],
	favouritesUser: [],
	isLoading: false,
	isLoadMore: false,
	totalPages: 0,
	pageIndex: 1,
	pageSize: 10,
};

interface ACTIONS {
	setFavourite: (payload: any) => void;
	setIsLoading: (payload: boolean) => void;
	fetchFavouriteData: (payload: QueryFavouriteByStatus) => void;
	fetchFavouriteForMatch: (payload: QueryFavouriteByStatus) => void;
}

export const useFavouriteStore = create<STATE & ACTIONS>((set, get) => ({
	...INITIAL_STATE,

	setFavourite: (payload) => {
		set({favourites: payload});
	},

	setIsLoading: (payload) => {
		set({isLoading: payload});
	},

	fetchFavouriteData: async (query) => {
		try {
			const {data} = await getFavouritesByStatus(query);

			if (data?.status === 1) {
				const isLoadMore = data?.result ? data?.meta?.pages > 1 : false;

				set({
					isLoadMore,
					favourites: data?.result,
					totalPages: data?.meta?.total,
				});
			}
		} catch (error) {
			console.log("error :", error);
		}
	},

	fetchFavouriteForMatch: async (query) => {
		try {
			const {data} = await getFavouritesByStatus(query);

			if (data?.status === 1) {
				const isLoadMore = data?.result ? data?.meta?.pages > 1 : false;

				if (Number(query.pageIndex) > 1) {
					set((state) => ({
						isLoadMore,
						favouritesUser: data?.result.concat(state.favouritesUser),
						totalPages: data?.meta?.total,
					}));
				} else {
					set({
						isLoadMore,
						favouritesUser: data?.result,
						totalPages: data?.meta?.total,
					});
				}
			}
		} catch (error) {
			console.log("error :", error);
		}
	},
}));
