var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var ENV = process.env.npm_lifecycle_event;
var isTest = ENV === 'test' || ENV === 'test-watch';
var isProd = ENV === 'build';

module.exports = function makeWebpackConfig() {

  var config = {};

  config.entry = isTest ? void 0 : {
    app: './src/app.js',
    vendor: [
      "angular",
      "angular-aria",
      "angular-animate",
      "angular-resource",
      "angular-sanitize",
      "@uirouter/angularjs",
      "angular-material",
      "ocLazyLoad"
    ]
  };

  config.output = isTest ? {} : {
    
    path: __dirname + '/dist',

    publicPath: isProd ? '/' : 'http://localhost:8080/',

    filename: isProd ? '[name].[hash].js' : '[name].bundle.js',

    chunkFilename: isProd ? '[name].[hash].js' : '[name].bundle.js'
  };

  if (isTest) {
    config.devtool = 'inline-source-map';
  }
  else if (isProd) {
    config.devtool = 'source-map';
  }
  else {
    config.devtool = 'eval-source-map';
  }

  config.module = {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      loader: isTest ? 'null-loader' : [{
           loader: "style-loader"
       }, {
           loader: "css-loader"
       }],
      exclude: /node_modules/
    },
    {
        test: /\.scss$/,
        use: isTest ? 'null-loader' :[{
             loader: "style-loader"
         }, {
             loader: "css-loader"
         }, {
             loader: "sass-loader"
         }],
        exclude: /node_modules/
    },
    {
      test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
      loader: 'file-loader?name=assets/images/[name].[ext]',
    }, {
      test: /\.html$/,
      loader: 'raw-loader'
    }]
  };

  if (isTest) {
    config.module.rules.push({
      enforce: 'pre',
      test: /\.js$/,
      exclude: [
        /node_modules/,
        /\.spec\.js$/
      ],
      loader: 'istanbul-instrumenter-loader',
      query: {
        esModules: true
      }
    });
  }

  config.plugins = [
    new webpack.LoaderOptionsPlugin({
      test: /\.scss$/i,
      options: {
        postcss: {
          plugins: [autoprefixer]
        }
      }
    }),
    new webpack.ProvidePlugin({
      Promise: 'es6-promise-promise'
    })
  ];

  if (!isTest) {
    config.plugins.push(
      new HtmlWebpackPlugin({
        template: './src/index.html',
        inject: 'body'
      }),
      new ExtractTextPlugin({filename: 'css/[name].css', disable: !isProd, allChunks: true})
    );
    config.performance = {
        hints: "warning",
        maxAssetSize: 200000,
        maxEntrypointSize: 400000,
        assetFilter: function(assetFilename) {
          return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
        }
    };
  }
  if (isProd) {
    config.plugins.push(
      new webpack.NoErrorsPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin()
    );
  }
  config.devServer = {
    contentBase: './src/',
    stats: 'minimal'
  };

  return config;
}();
