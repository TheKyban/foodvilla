/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js,jsx}"],
	theme: {
		fontSize: {
			sm: "0.8rem",
			base: "1rem",
			xl: "1.25rem",
			"2xl": "1.563rem",
			"3xl": "1.953rem",
			"4xl": "2.441rem",
			"5xl": "3.052rem",
			10:"10px",
		},
		extend: {
			width: {
				180: "180px",
				200: "200px",
				"mobile":"360px",
				"tablet":"540px",
				"pc":"920px"
			},
		},
	},
	plugins: [],
};
