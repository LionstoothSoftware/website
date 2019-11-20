const autoprefixer = require('autoprefixer');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const htmlWebpackPlugins = [
   { template: './src/index.pug', filename: 'index.html' },
   { template: './src/contact.pug', filename: 'contact.html' },
].map(plugin => new HtmlWebpackPlugin(plugin));

module.exports = {
   entry: [
      './src/styles/app.scss',
      './src/styles/animate.min.css',
      './src/scripts/app.js',
      './src/fonts/line-awesome/css/line-awesome.min.css',
   ],
   plugins: htmlWebpackPlugins,
   module: {
      rules: [
         {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
         },
         {
            test: /\.(png|svg|jpg|gif)$/,
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
            test: /\.scss$/,
            use: [
               {
                  loader: 'file-loader',
                  options: {
                     name: 'bundle.css',
                  },
               },
               { loader: 'extract-loader' },
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
   devServer: {
      contentBase: path.join(__dirname, 'public'),
   },
};
