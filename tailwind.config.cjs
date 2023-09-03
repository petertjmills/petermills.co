/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,jsx,astro}",
		"./components/**/*.{js,jsx,astro}",
		"./app/**/*.{js,jsx,astro}",
		"./src/**/*.{js,jsx,astro}",
	],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			colors: {
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
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
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				"accordion-down": {
					from: { height: 0 },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: 0 },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
			fontFamily: {
				serif: [...defaultTheme.fontFamily.serif],
				sans: ["inter", ...defaultTheme.fontFamily.sans],
			},
		},
	},
	plugins: [
		require("tailwindcss-animate"),
		// function ({ addComponents, theme }) {
		// 	addComponents({
		// 		".btn": {
		// 			filter-brightness: "brightness(0.5)",
		// 		},
		// 	});
		// },
	],
};
