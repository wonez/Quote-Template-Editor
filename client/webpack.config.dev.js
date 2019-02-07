const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        port: 5000,
        open: true,
        overlay: true,
        publicPath: '/',
        historyApiFallback: true,
    },
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, "src")
                ],
                exclude: [
                    path.resolve(__dirname, "node_modules")
                ],
                loader: 'babel-loader',
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "style-loader",
                    },
                    { 
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[name]__[local]--[hash:base64:5]',
                            importLoaders: 2,
                            sourceMap: true,
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [require('autoprefixer')({
                                'browsers': ['> 1%', 'last 2 versions']
                            })],
                            sourceMap: true
                        }
                    },
                    { 
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            includePaths: [
                                path.resolve(__dirname, "./src")
                            ]
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        })
    ]
}