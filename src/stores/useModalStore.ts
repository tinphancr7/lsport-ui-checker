import {create} from "zustand";

type BACKDROP = "opaque" | "blur" | "transparent";

interface STATE {
	isOpen: boolean;
	title: string;
	body: any;
	maxWidth: string;
	isLoading: boolean;
	isDismissable: boolean;
	header: any;
	hideCloseButton: boolean;
	classNames: any;
	backdrop: BACKDROP;
	motionProps: any;
	footer: any;
}

const INITIAL_MODAL: STATE = {
	isOpen: false,
	title: "",
	body: "",
	maxWidth: "",
	isLoading: false,
	isDismissable: true,
	header: "",
	hideCloseButton: false,
	classNames: "",
	backdrop: "opaque",
	motionProps: "",
	footer: "",
};

interface ACTIONS {
	resetModal: () => void;
	setModal: (params: Partial<STATE>) => void;
}

export const useModalStore = create<STATE & ACTIONS>((set) => ({
	...INITIAL_MODAL,
	resetModal: () => {
		set(INITIAL_MODAL);
	},
	setModal: (payload: Partial<STATE>) => {
		set((state) => ({...state, ...payload}));
	},
}));
