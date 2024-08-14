import http from "@/utils/http";

const chatApi = {
	addMessage: (data: any) => {
		return http.post("/messages", data);
	},
	getMessages: ({fixtureId, page}: any) => {
		return http.get(`/messages/${fixtureId}?page=${page}`);
	},
};

export default chatApi;
