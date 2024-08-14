import {
	CreateNewTipProps,
	getAllTips,
	getPagingTips,
	createNewTip,
} from "@/apis/tips.api";
import NotifyMessage from "@/utils/notify";
import {create} from "zustand";

interface STATE {
	tips: Array<any>;
	total: number;
	isLoadMore: boolean;
	isLoading: boolean;
	isSubmit: boolean;
	pageIndex: number;
	pageSize: number;
}

const initialState: STATE = {
	tips: [],
	total: 1,
	isLoadMore: false,
	isLoading: false,
	isSubmit: false,
	pageIndex: 1,
	pageSize: 10,
};

interface ACTIONS {
	setTips: (payload: Array<any>) => void;
	setPageIndex: (payload: number) => void;
	setIsSubmit: (payload: boolean) => void;
	setIsLoading: (payload: boolean) => void;
	getAll: () => void;
	getPaging: (query: {pageIndex: number; pageSize: number}) => void;
	addTip: (payload: CreateNewTipProps) => Promise<boolean>;
}

export const useTipStore = create<STATE & ACTIONS>((set, get) => ({
	...initialState,

	setTips: (payload: Array<any>) => {
		set({tips: payload});
	},

	setPageIndex: (payload: number) => {
		set({pageIndex: payload});
	},

	setIsSubmit: (payload: boolean) => {
		set({isSubmit: payload});
	},

	setIsLoading: (payload: boolean) => {
		set({isLoading: payload});
	},

	getAll: async () => {
		try {
			set({isLoading: true});

			const {data} = await getAllTips();

			if (data?.status === 1) {
				set({tips: data?.data});
			}
		} catch (error) {
			console.log("error: ", error);
		} finally {
			set({isLoading: false});
		}
	},

	getPaging: async (query: {pageIndex: number; pageSize: number}) => {
		try {
			set((state) => {
				if (state.pageIndex === 1) {
					return {isLoading: true};
				}

				return {isLoading: false};
			});

			const {data} = await getPagingTips(query);

			if (data?.status === 1) {
				const total = query?.pageSize * query?.pageIndex;

				if (
					data?.data?.data?.length === query?.pageSize &&
					total < data?.data?.counts
				) {
					set((state) => ({
						...state,
						isLoadMore: true,
						pageIndex: state?.pageIndex + 1,
					}));
				} else {
					set({
						isLoadMore: false,
						pageIndex: 1,
					});
				}

				if (query?.pageIndex === 1) {
					set({
						total: data?.data.counts,
						tips: [...data?.data?.data],
					});
				} else {
					set((state) => ({
						...state,
						tips: [...state.tips, ...data?.data?.data],
					}));
				}
			}
		} catch (error) {
			console.log("error: ", error);
		} finally {
			set({isLoading: false});
		}
	},

	addTip: async (payload: CreateNewTipProps): Promise<boolean> => {
		let status: boolean = false;

		try {
			set({isSubmit: true});

			const {data} = await createNewTip(payload);

			if (data?.status === 1) {
				NotifyMessage("Đăng bài viết thành công !", "success");

				status = true;
			}
		} catch (error) {
			console.log("error: ", error);

			status = false;

			NotifyMessage("Đăng bài viết thất bại!", "error");
		} finally {
			set({isSubmit: false});
		}

		return status;
	},
}));
