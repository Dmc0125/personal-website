/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				'bg-1': {
					light: '#FFFFFF',
					dark: '#11151C',
				},
				'bg-2': {
					light: '#E6E6E6',
					dark: '#212D40',
				},
				'font-1': {
					light: '#000000',
					dark: '#FFFFFF',
				},
				'font-2': {
					light: '#4B5563',
					dark: '#A9B7CF',
				},
				theme: '#FC5130',
			},
		},
	},
	plugins: [],
};
