import {SignIn} from "@/interfaces/signInRequest";
import {SignUp} from "@/interfaces/signUpRequest";
import http from "@/utils/http";

const authApi = {
	async signUp(data: SignUp) {
		return http.post("/auth/sign-up", data);
	},

	async signIn(data: SignIn) { 
		return http.post("/auth/sign-in", data);
	},
	async signOut(refreshToken: string) {
		return http.post("/auth/logout", {refreshToken});
	},
};

export const {signUp, signIn, signOut} = authApi;
