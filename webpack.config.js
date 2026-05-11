const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, isProduction ? 'dist' : 'build'),
      filename: isProduction ? '[name].[contenthash].js' : '[name].bundle.js',
      clean: true,
    },
    devtool: isProduction ? 'source-map' : 'eval-cheap-module-source-map',
    devServer: {
      static: path.resolve(__dirname, 'build'),
      hot: true,
      compress: true,
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /(blockly[/\\].*\.js)$/,
          use: [require.resolve('source-map-loader')],
          enforce: 'pre',
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        minify: isProduction ? {
          removeComments: true,
          collapseWhitespace: true,
          minifyJS: true,
          minifyCSS: true,
        } : false,
      }),
    ],
    resolve: {
      fallback: {
        "vm": require.resolve('vm-browserify'),
      },
    },
    optimization: {
      moduleIds: 'deterministic',
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    },
    ignoreWarnings: [/Failed to parse source map.*blockly/],
  };
};
