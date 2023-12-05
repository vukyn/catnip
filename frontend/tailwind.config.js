/** @type {import('tailwindcss').Config} */
const { nextui } = require('@nextui-org/react');

export default {
	content: ['./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		extend: {},
	},
	darkMode: 'class',
	plugins: [nextui()],
};
