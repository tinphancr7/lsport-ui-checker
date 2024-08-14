import {nextui} from "@nextui-org/react";
import type {Config} from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/configs/*.{js,ts,jsx,tsx,mdx}",
		"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				light: "#FFFFFF",
				dark: "#1E1E1E",
				link: "#0053DF",
				gray: "#71717A", // color text default
				gray9D: "#9DA5AC", // color text disibled
				black37: "#373737",
				primary: "#FF9900",
				grayF5: "#F5F5F5",
				grayF7: "#F7F8FA",
				gray9E: "#9E9E9E",
				grayCE: "#CECFD2",
				grayB3: "#B3B3B3",
				black: "#373737",
				winner: "#66BB6A",
				lose: "#B42318",
			},
			backgroundColor: {
				primary: "#FF9900",
				"primary-hover": "#ff990087",
				layout: "#f4f4f4",
				light: "white",
				"btn-close": "#999999",
				grayCE: "#CECFD2", //background Card
				cell: "#F7F8FA",
				winner: "#ECFDF3",
				lose: "#FEF3F2",
				success: "#3F8922",
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			boxShadow: {
				container: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
			},
			borderColor: {
				primary: "#FF9900",
			},
			height: {
				page: "calc(100vh - 64px - 24px)",
				chat: "calc(100vh - 64px - 24px - 50px)",
			},
			maxHeight: {
				page: "calc(100vh - 64px - 24px)",
				"modal-mobile": "calc(100vh - 56px)",
				chat: "calc(100vh - 64px - 24px - 64px)",
			},
		},
	},
	plugins: [nextui()],
};
export default config;
