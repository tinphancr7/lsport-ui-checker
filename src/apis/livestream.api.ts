import http from "@/utils/http";

const livestreamApi = {
	getLivestream: ({fixtureId}: {fixtureId: string}) =>
		http.get(`/livestream/${fixtureId}`),
};

export default livestreamApi;
