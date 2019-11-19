require("@babel/polyfill");

const path = require("path");
const glob = require('glob')


const merge = require('webpack-merge');
const MiniCssExtract = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const PurgecssPlugin = require('purgecss-webpack-plugin');

const productionConfig = require("./build/webpack.prod.js");
const developmentConfig = require("./build/webpack.dev.js");


/***
 * 根据不同环境,生成相应配置
 * @param env {String} "development" or "production"
 */

module.exports = env => {
    const isDevelopment = env === "development";
    const styleLoader = isDevelopment
        ? "style-loader"
        : {
            loader: MiniCssExtract.loader,
            options: {
                publicPath: "../",
                hmr: true,
            }
        };
    const baseConfig = {
        entry: [
            "@babel/polyfill",
            path.join(__dirname, "src/index.js")
        ],
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    loader: "babel-loader"
                },
                {
                    test: /\.(sc|c)ss$/,
                    use: [
                        styleLoader,
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: isDevelopment
                            }
                        },
                        "postcss-loader",
                        {
                            loader: "sass-loader",
                        },
                    ]
                }, {
                    test: /\.(jpg|jpeg|png|gif|svg)$/,
                    use: [
                        {
                            loader: "url-loader",
                            options: {
                                limit: 10000,
                                fallback: {
                                    loader: "file-loader",
                                    options: {
                                        name: "images/[name].[hash:8].[ext]",
                                    }
                                }
                            }
                        }
                    ]
                }, {
                    test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                    use: [
                        {
                            loader: "url-loader",
                            options: {
                                limit: 10000,
                                fallback: {
                                    loader: "file-loader",
                                    options: {
                                        name: "media/[name].[hash:8].[ext]",
                                    }
                                }
                            }
                        }
                    ]
                }, {
                    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
                    use: [
                        {
                            loader: "url-loader",
                            options: {
                                limit: 10000,
                                fallback: {
                                    loader: "file-loader",
                                    options: {
                                        name: "fonts/[name].[hash:8].[ext]",
                                    }
                                }
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            new CopyWebpackPlugin([{
                from: path.join(__dirname, "src/assets/"),
                to: path.join(__dirname, "dist/")
            }]),
            new HtmlWebpackPlugin({
                filename: "index.html",
                template: path.join(__dirname, "public/index.html"),
                favicon: path.join(__dirname, "public/favicon.ico"),
            }),
            new MiniCssExtract({
                filename: "[name].css",
                chunkFilename: "[id].css",
                ignoreOrder: false
            }),
            new PurgecssPlugin({
                paths: glob.sync(`${path.join(__dirname, "src")}/**/*`, { nodir: true }),
            }),
            new OptimizeCssAssetsPlugin({
                assetNameRegExp: /\.css$/g,
                cssProcessor: require('cssnano'),
                cssProcessorPluginOptions: {
                    preset: "default",
                },
                canPrint: true
            }),
        ],
        resolve: {
            extensions: [".js", ".jsx", ".css", ".scss"],
            alias: {
                "~": __dirname,
                "@": path.join(__dirname, "src/"),
            }
        },
        output: {
            filename: "[name].bundle.js",
            chunkFilename: "[name].chunk.js",
            path: path.join(__dirname, "dist/"),
        },
    };
    const otherConfig = isDevelopment ? developmentConfig : productionConfig;
    return merge(baseConfig, otherConfig);
};
