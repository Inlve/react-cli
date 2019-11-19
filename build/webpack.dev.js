const path = require("path");

const webpack = require("webpack");


module.exports = {
    mode: "development",
    devtool: "source-map",
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        contentBase: path.join(__dirname, "../dist/"),
        port: 3000,
        publicPath: "/",
        hot: true,
        open: true
    },
};
