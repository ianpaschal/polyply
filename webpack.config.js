const Path = require("path");
module.exports = {
	watch: true,
	target: "electron",
	entry: "./src/rendering.js",
	output: {
		path: Path.resolve( __dirname, "src/windows/packed"),
		publicPath: "packed/",
		filename: "rendering.pack.js"
	},
	devtool: "source-map",
	module: {
		loaders: [
			{
				test: /\.vue$/,
				loader: "vue-loader"
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: "file-loader",
				query: {
					name: "[name].[ext]?[hash]"
				}
			}
		]
	},
	resolve: {
		alias: { vue: "vue/dist/vue.common.js" }
	}
};
