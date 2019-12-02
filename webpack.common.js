const autoprefixer = require('autoprefixer');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
   entry: ['./src/styles/app.scss', './src/scripts/app.js'],
   output: {
      path: path.join(__dirname, 'dist'),
      filename: '[contenthash].js',
   },
   plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
         template: './src/templates/index.pug',
         filename: 'index.html',
      }),
      new HtmlWebpackPlugin({
         template: './src/templates/contact.pug',
         filename: 'contact.html',
      }),
      new MiniCssExtractPlugin({
         filename: '[name].[contenthash].css',
         chunkFilename: '[id].[contenthash].css',
      }),
   ],
   module: {
      rules: [
         {
            test: /\.(png|svg|jpg|jpeg|gif)$/,
            use: ['file-loader'],
         },
         {
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
               presets: ['@babel/preset-env'],
            },
         },
         {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: ['file-loader'],
         },
         {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
         },
         {
            test: /\.scss$/,
            use: [
               {
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                     // only enable hot in development
                     hmr: process.env.NODE_ENV === 'development',
                     // if hmr does not work, this is a forceful method.
                     reloadAll: true,
                  },
               },
               { loader: 'css-loader' },
               {
                  loader: 'postcss-loader',
                  options: {
                     plugins: () => [autoprefixer()],
                  },
               },
               {
                  loader: 'sass-loader',
                  options: {
                     sassOptions: {
                        includePaths: ['./node_modules'],
                     },
                  },
               },
            ],
         },
         {
            test: /\.pug$/,
            use: [
               {
                  loader: 'pug-loader',
               },
            ],
         },
      ],
   },
   optimization: {
      minimizer: [
         new OptimizeCSSAssetsPlugin({
            cssProcessorPluginOptions: {
               preset: ['default', { discardComments: { removeAll: true } }],
            },
         }),
      ],
   },
   devServer: {
      contentBase: path.join(__dirname, 'public'),
   },
};
