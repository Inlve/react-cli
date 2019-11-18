const path = require("path");

const MiniCssExtract = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: "production",
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: path.join(__dirname, "../public/index.html"),
            favicon: path.join(__dirname, "../public/favicon.ico"),
        }),
        new CopyWebpackPlugin([{
            from: path.join(__dirname, "../src/assets/"),
            to: path.join(__dirname, "../dist/")
        }]),
        new MiniCssExtract({
            filename: "[name].css",
            chunkFilename: "[id].css",
            ignoreOrder: false
        }),
        new CleanWebpackPlugin(),
    ],
    optimization: {
        splitChunks: {
            chunks: "all",
        },
    },
};
