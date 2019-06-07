const path = require('path');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PATHS = {
  src: path.resolve(__dirname, '..', 'src'),
  dist: path.resolve(__dirname, '..', 'dist'),
};

let htmlMinifyOptions = {
  collapseWhitespace: true,
  html5: true,
  minifyCSS: true,
  removeComments: true,
  removeEmptyAttributes: true,
};

module.exports = () => ({
  entry: `${PATHS.src}/index.js`,
  output: {
    path: PATHS.dist,
    filename: 'js/bundle.[hash].js',
    chunkFilename: 'js/[name].bundle.js',
    publicPath: '/',
  },
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
              plugins: [
                autoprefixer({
                  browsers: ['ie > 9', 'last 3 version'],
                }),
              ],
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
          'postcss-loader',
        ],
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader',
      },
      {
        test: /\.(gif|png|jpe?g)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: '/img',
              publicPath: '/img',
            },
          }],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'bundle.[hash].css',
      publicPath: './',
    }),
    new HtmlWebpackPlugin({
      template: `${PATHS.src}/index.html`,
      minify: htmlMinifyOptions,
    }),
  ],
  resolve: {
    modules: ['node_modules', path.resolve(__dirname, '..', 'src')],
    extensions: ['.js', '.json', '.jsx', '.css'],
  },
  optimization: {
    runtimeChunk: {
      name: 'manifest',
    },
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: -20,
          chunks: 'all',
        },
      },
    },
    namedChunks: true,
  },
});