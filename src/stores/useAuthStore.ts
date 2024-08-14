import {getAccessTokenFromLS, getUserFromLS} from "@/utils/auth";
import {create} from "zustand";

interface STATE {
	user: any;
	isAuthenticated: boolean;
	isLoading: boolean;
}

const INITIAL_USER = {
	user: getUserFromLS(),
	isAuthenticated: Boolean(getAccessTokenFromLS()),
	isLoading: false,
};

interface ACTIONS {
	setUser: (user: any) => void;
	setIsLoading: (isLoading: boolean) => void;
	setIsAuthenticated: (value: boolean) => void;
	setAvatar: (payload: any) => void;
	logout: () => void;
}

export const useAuthStore = create<STATE & ACTIONS>((set, get) => ({
	...INITIAL_USER,
	setUser: (user: any) => {
		set({user});
	},

	setIsAuthenticated: (value: boolean) => {
		set({isAuthenticated: value});
	},
	setIsLoading: (isLoading: boolean) => set({isLoading}),
	setAvatar: (payload: any) => {
		set((state) => {
			const newUserData = {
				...state.user,
				avatar: payload,
			};

			if (typeof window !== "undefined") {
				localStorage.setItem("user", JSON.stringify(newUserData));
			}

			return {
				...state,
				user: newUserData,
			};
		});
	},
	logout: () => {
		set({
			user: null,
			isAuthenticated: false,
		});
	},
}));
