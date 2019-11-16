const autoprefixer = require('autoprefixer');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['./src/styles/app.scss', './src/scripts/app.js', './src/index.pug'],
    output: {
        filename: 'bundle.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: `./src/index.pug`
        }),
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'bundle.css',
                        },
                    },
                    {loader: 'extract-loader'},
                    {loader: 'css-loader'},
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [autoprefixer()]
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: {
                                includePaths: ['./node_modules'],
                            }
                        },
                    }
                ],
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['@babel/preset-env'],
                },
            },
            {
                test: /\.jpg$/,
                loader: "file-loader"
            },
            {
                test: /\.pug$/,
                loader: "pug-loader"
            },
        ],
    },
    devServer: {
        contentBase: path.join(__dirname, 'public'),
    }
};