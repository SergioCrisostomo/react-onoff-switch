var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry: './demo/demo.js',
	output: { path: __dirname, filename: './demo/compiled.js' },
	module: {
		loaders: [
			{
				test: /.jsx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: ['react', 'es2015', 'stage-0']
				}
			}
		]
	}
}
