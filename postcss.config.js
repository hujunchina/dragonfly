const autoprefixer = require('autoprefixer');

module.exports = {
	plugins: [
		autoprefixer({
			remove: false,
			grid: false,
			flexbox: true,
		}),
	],
};
