/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: "#202C39",
					50: "#9BB0C7",
					100: "#8EA6C0",
					200: "#7491B1",
					300: "#5B7DA2",
					400: "#4C6987",
					500: "#3D546D",
					600: "#2F4053",
					700: "#202C39",
					800: "#0C1015",
					900: "#000000",
					950: "#000000",
				},
				secondary: {
					DEFAULT: "#f0eace",
					50: "#f9f7ed",
					100: "#f0eace",
					200: "#e4d6a4",
					300: "#d4bb70",
					400: "#c6a249",
					500: "#b78e3b",
					600: "#9d7031",
					700: "#7e542a",
					800: "#6a4529",
					900: "#5c3b27",
					950: "#341f14",
				},

				light: {
					DEFAULT: "#F4F5F8",
				},
				dark: {
					DEFAULT: "#222326",
				},
			},
			fontFamily: {
				serif: ["Bodoni Moda", ...defaultTheme.fontFamily.serif],
			},
		},
	},
	plugins: [],
	darkMode: "class",
};
