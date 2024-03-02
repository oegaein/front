const path = require('path');

module.exports = {
	webpack: {
		alias: {
			'@': path.resolve(__dirname, 'src/'),
			'@components': path.resolve(__dirname, 'src/components/'),
			'@common': path.resolve(__dirname, 'src/components/common/'),
			'@assets': path.resolve(__dirname, 'src/assets/'),
			'@pages': path.resolve(__dirname, 'src/pages/'),
			'@services': path.resolve(__dirname, 'src/services/'),
			'@styles': path.resolve(__dirname, 'src/styles/'),
			'@store': path.resolve(__dirname, 'src/store/'),
			'@constants': path.resolve(__dirname, 'src/constants/'),
			'@utils': path.resolve(__dirname, 'src/utils/'),
		},
	},
};
