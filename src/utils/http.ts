import axios, {type AxiosInstance} from "axios";
import {
	clearLS,
	getAccessTokenFromLS,
	getRefreshTokenFromLS,
	setAccessTokenToLS,
	setRefreshTokenToLS,
	setUserToLS,
} from "./auth";

// const BACKEND_URL = "https://api.okchoi68.live";
export const BACKEND_URL_ISPORT = "http://localhost:8010/api";
export const BACKEND_URL = "http://127.0.0.1:8192";
const API_VERSION = "api/v1";

const API_SERVICE = `${BACKEND_URL}/${API_VERSION}`;

class Http {
	instance: AxiosInstance;
	private accessToken: string | null;
	private refreshToken: string | null;
	private refreshTokenReq: Promise<any> | null;

	constructor() {
		this.accessToken = getAccessTokenFromLS();
		this.refreshToken = getRefreshTokenFromLS();
		this.refreshTokenReq = null;
		this.instance = axios.create({
			baseURL: API_SERVICE,
			timeout: 50000,
			headers: {
				"Content-Type": "application/json",
			},
		});

		this.instance.interceptors.request.use(
			(config) => {
				if (config.headers && this.accessToken) {
					config.headers.Authorization = `Bearer ${this.accessToken}`;
				}
				return config;
			},
			(error) => {
				return Promise.reject(error);
			}
		);

		this.instance.interceptors.response.use(
			(response) => {
				const {url} = response.config;
				const data = response.data;

				if (url === "/auth/sign-up" || url === "/auth/sign-in") {
					this.accessToken = data?.accessToken;
					this.refreshToken = data?.refreshToken;
					setAccessTokenToLS(this.accessToken);
					setRefreshTokenToLS(this.refreshToken);
					setUserToLS(data?.user);
				} else if (url === "/auth/logout") {
					this.accessToken = null;
					this.refreshToken = null;
					clearLS();
				}
				return response;
			},

			async (error) => {
				const originalRequest = error.config;
				if (
					error.response.status === 401 &&
					!originalRequest._retry &&
					error.response?.data?.message === "EXPIRED_ACCESS_TOKEN"
				) {
					if (!this.refreshTokenReq) {
						this.refreshTokenReq = this.refreshAccessToken();
					}
					originalRequest._retry = true;

					try {
						const {accessToken} = await this.refreshTokenReq;
						this.refreshTokenReq = null;

						// Retry the original request with the new access token.
						originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
						return this.instance(originalRequest);
					} catch (refreshError) {
						this.refreshTokenReq = null;
						console.error("Token refresh failed:", refreshError);
						this.accessToken = null;
						this.refreshToken = null;
						clearLS();
						return Promise.reject(refreshError);
					}
				}
				return Promise.reject(error); // For all other errors, return the error as is.
			}
		);
	}

	private async refreshAccessToken() {
		try {
			const response = await axios.post(`${API_SERVICE}/auth/refresh-token`, {
				refreshToken: this.refreshToken,
			});
			const {accessToken, refreshToken: newRefreshToken} = response.data;

			this.accessToken = accessToken;
			this.refreshToken = newRefreshToken;
			setAccessTokenToLS(accessToken);
			setRefreshTokenToLS(newRefreshToken);

			// Update the instance's default Authorization header.
			this.instance.defaults.headers.common[
				"Authorization"
			] = `Bearer ${accessToken}`;

			return {accessToken, refreshToken: newRefreshToken};
		} catch (error) {
			throw new Error("Unable to refresh token");
		}
	}
}

const http = new Http().instance;
export default http;
