const path = require("path");

const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: "development",
    devtool: "source-map",
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: path.join(__dirname, "../public/index.html"),
            favicon: path.join(__dirname, "../public/favicon.ico"),
        }),
        new CopyWebpackPlugin([{
            from: path.join(__dirname, "../src/assets/"),
            to: path.join(__dirname, "../dist/")
        }]),
    ],
    devServer: {
        contentBase: path.join(__dirname, "../dist/"),
        port: 3000,
        publicPath: "/",
        hot: true,
        open: true
    },
    // output: undefined
};
