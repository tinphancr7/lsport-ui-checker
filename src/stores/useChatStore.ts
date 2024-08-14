import create from "zustand";
// import {devtools} from "zustand/middleware";
import chatApi from "@/apis/chat.api";

interface State {
	messages: any[];
	socket: any;
	isLoading: boolean;
	isLoadMore: boolean;
	error: any;
	page: number;
	scrollToBottom: boolean;
	initialScroll: number;
	maintainScrollPosition: boolean;
}

interface Actions {
	setMessages: (messages: any[]) => void;
	setSocket: (socket: any) => void;
	fetchMessages: (fixtureId: string) => void;
	setPage: (page: number) => void;
	setIsLoading: (isLoading: boolean) => void;
	setIsLoadMore: (isLoadMore: boolean) => void;
	setScrollToBottom: (scrollToBottom: boolean) => void;
	setInitialScroll: (initialScroll: number) => void;
	setMaintainScrollPosition: (maintainScrollPosition: boolean) => void;
}

const INITIAL_STATE: State = {
	messages: [],
	socket: null,
	isLoading: false,
	isLoadMore: true,
	error: null,
	page: 1,
	scrollToBottom: false,
	initialScroll: 0,
	maintainScrollPosition: false,
};

export const useChatStore = create<State & Actions>((set) => ({
	messages: INITIAL_STATE.messages,
	isLoading: INITIAL_STATE.isLoading,
	isLoadMore: INITIAL_STATE.isLoadMore,
	socket: null,
	error: INITIAL_STATE.error,
	page: INITIAL_STATE.page,
	scrollToBottom: false,
	initialScroll: 0,
	maintainScrollPosition: false,
	setIsLoading: (isLoading) => set({isLoading}),
	setIsLoadMore: (isLoadMore) => set({isLoadMore}),
	setPage: (page) => set({page}),
	setMessages: (messages) => set({messages}),
	setSocket: (socket) => set({socket}),
	setScrollToBottom: (scrollToBottom) => set({scrollToBottom}),
	setInitialScroll: (initialScroll) => set({initialScroll}),
	setMaintainScrollPosition: (maintainScrollPosition) =>
		set({maintainScrollPosition}),
	fetchMessages: async (fixtureId: string) => {
		try {
			set({isLoading: true, error: null});
			const res = await chatApi.getMessages({fixtureId});
			const data = res?.data?.data;
			const isLoadMore = res?.data?.totalPages
				? res?.data?.totalPages > 1
				: false;
			set({
				messages: data,
				isLoading: false,
				isLoadMore,
				page: 1,
				scrollToBottom: false,
				initialScroll: 0,
				maintainScrollPosition: false,
			});
		} catch (error) {
			set({error, isLoading: false});
		}
	},
}));
