import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles';
import colors from './colors';
import { spacing } from './units';

const colorProperties = defineProperties({
	properties: {
		color: colors,
		backgroundColor: colors,
		borderColor: colors,
		borderLeftColor: colors,
		borderRightColor: colors,
		borderTopColor: colors,
		borderBottomColor: colors
	},
	shorthands: {
		bg: ['backgroundColor'],
		b: ['borderColor'],
		bl: ['borderLeftColor'],
		br: ['borderRightColor'],
		bt: ['borderTopColor'],
		bd: ['borderBottomColor']
	}
});

const spacingProperties = defineProperties({
	properties: {
		padding: spacing,
		paddingTop: spacing,
		paddingRight: spacing,
		paddingBottom: spacing,
		paddingLeft: spacing,
		margin: spacing,
		marginTop: spacing,
		marginRight: spacing,
		marginBottom: spacing,
		marginLeft: spacing,
	},
	shorthands: {
		p: ['padding'],
		pt: ['paddingTop'],
		pr: ['paddingRight'],
		pb: ['paddingBottom'],
		pl: ['paddingLeft'],
		m: ['margin'],
		mt: ['marginTop'],
		mr: ['marginRight'],
		mb: ['marginBottom'],
		ml: ['marginLeft'],
	}
});

const responsiveProperties = defineProperties({
	properties: {
		display: ['none', 'block', 'flex'],
		flexDirection: ['row', 'column'],
	}
});

export const css = createSprinkles(
	colorProperties,
	spacingProperties,
	responsiveProperties
);