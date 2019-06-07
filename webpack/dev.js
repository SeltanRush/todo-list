const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  src: path.resolve(__dirname, '..', 'src'),
  dist: path.resolve(__dirname, 'dist'),
};

module.exports = () => ({
  entry: `${PATHS.src}/index.js`,
  output: {
    path: PATHS.dist,
    filename: 'bundle.[hash].js',
    publicPath: '/',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js|.jsx?$/,
        exclude: /(node_modules)/,
        loaders: ['babel-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: 'postcss.config.js',
              },
            },
          },
          'sass-loader',
        ],
        exclude: /(node_modules)/,
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      { test: /\.xml$/, loader: 'xml-loader' },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'assets/[name].[ext]',
          },
        }],
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader',
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'main.[hash].css',
    }),
    new HtmlWebpackPlugin({
      template: `${PATHS.src}/index.html`,
    }),
  ],
  resolve: {
    modules: ['node_modules', path.resolve(__dirname, '..', 'src')],
    extensions: ['.js', '.json', '.jsx', '.css'],
  },
  devServer: {
    port: 8000,
    stats: 'errors-only',
    publicPath: '/',
    historyApiFallback: true,
  },
});