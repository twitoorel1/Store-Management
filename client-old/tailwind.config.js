//tailwind.config.js
const { tailwindcssPaletteGenerator } = require('@bobthered/tailwindcss-palette-generator');
const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

const PRIMARY_COLOR = '#2563EB';
const SECONDARY_COLOR = '#db2777';
const BG_LIGHT_MODE = '#FFFFFF';
const BG_DARK_MODE = '#000000';
const TEXT_LIGHT_MODE = '#41454c';
const TEXT_DARK_MODE = '#b3c3d9';
const ROUNDED_CORNER = '5px';
const HEADING_FONT = 'DM Sans';
const BODY_FONT = 'DM Sans';
const BTN_BORDER = '0';
const BTN_TEXT_CASE = 'capitalize';

const colors = tailwindcssPaletteGenerator({
	names: ['primary', 'secondary'],
	colors: [PRIMARY_COLOR, SECONDARY_COLOR]
});

//adding default colors
colors.primary.DEFAULT = PRIMARY_COLOR;
colors.secondary.DEFAULT = SECONDARY_COLOR;

//setting additional colors
colors.bgLightMode = BG_LIGHT_MODE;
colors.bgDarkMode = BG_DARK_MODE;
colors.textLightMode = TEXT_LIGHT_MODE;
colors.textDarkMode = TEXT_DARK_MODE;

export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			borderRadius: {
				global: ROUNDED_CORNER
			},
			fontFamily: {
				heading: [HEADING_FONT, ...defaultTheme.fontFamily.sans],
				body: [BODY_FONT, ...defaultTheme.fontFamily.sans]
			},
			colors: colors
		}
	},
	plugins: [
		plugin(function ({ addUtilities, addComponents, e, config }) {
			// Add your custom styles here
		}),

		plugin(function ({ addUtilities, addBase, theme }) {
			addBase({
				'h1,h2,h3,h4,h5,h6': {
					fontFamily: theme('fontFamily.heading')
				},
				body: {
					fontFamily: theme('fontFamily.body'),
					color: theme('colors.textLightMode'),
					backgroundColor: theme('colors.bgLightMode')
				},
				'.dark body': {
					color: theme('colors.textDarkMode'),
					backgroundColor: theme('colors.bgDarkMode')
				}
			});
			addUtilities({
				'btn-border': {
					border: BTN_BORDER
				},
				'btn-text-case': {
					textTransform: BTN_TEXT_CASE
				}
			});
		}),
		/**/
		require('@tailwindcss/forms'),
		require('@tailwindcss/aspect-ratio'),
		require('@tailwindcss/typography'),
		require('@tailwindcss/line-clamp'),
		require('@headlessui/tailwindcss')
	]
};
