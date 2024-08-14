import http from "@/utils/http";

export interface CreateNewTipProps {
	league: string;
	match: string;
	type: string;
	vote?: any;
	descript: string;
}

const tipsApi = {
	getAllTips() {
		return http.get("/tips/get-all");
	},

	getPagingTipsPublic(query: { pageIndex: number; pageSize: number }) {
		return http.get("/tips/public-get-paging", {
			params: query,
		});
	},

	getPagingTips(query: { pageIndex: number; pageSize: number }) {
		return http.get(`/tips/get-paging`, {
			params: query,
		});
	},

	getTipById(id: string) {
		return http.get(`/tips/${id}`);
	},

	createNewTip(data: CreateNewTipProps) {
		return http.post("/tips", data);
	},

	createVote(id: string, data: any) {
		return http.put(`/tips/vote/${id}`, data);
	},
};

export const {
	getAllTips,
	getPagingTipsPublic,
	getPagingTips,
	getTipById,
	createNewTip,
	createVote,
} = tipsApi;
