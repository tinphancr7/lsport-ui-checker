import { BACKEND_URL_ISPORT } from "@/utils/http";
import axios from "axios";

const leaugesApi = {
	getAllLeagues: () => axios.get(`${BACKEND_URL_ISPORT}/get-all-leagues`),
};

export default leaugesApi;

export const { getAllLeagues } = leaugesApi;
