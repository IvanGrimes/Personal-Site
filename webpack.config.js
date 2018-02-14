var webpack = require('webpack');
var path = require('path');
var util = require('gulp-util');
var config = require('./gulp/config');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

function createConfig(env) {
    var webpackConfig;

    webpackConfig = {
        context: path.join(__dirname, config.src.js),

        entry: {
            app: './app.js'
        },

        output: {
            path: path.join(__dirname, config.dest.js),
            filename: '[name].js',
            publicPath: 'js/'
        },

        //devtool: '#source-map',

        resolve: {
            extensions: ['.js'],
            alias: {
                "jquery": path.resolve('bower_components/jquery/dist/jquery.js'),
                "mixitup": path.resolve('bower_components/mixitup/dist/mixitup.js'),
                "coreslider": path.resolve('bower_components/coreSlider/coreSlider.js'),
                "owlcarousel": path.resolve('bower_components/owl.carousel/dist/owl.carousel.js'),
            }
        },

        module: {
          rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
          }]
        },

        plugins: [
            new webpack.ProvidePlugin({
              $: "jquery",
              jQuery: "jquery",
              'window.jQuery': "jquery"
            }),

            new webpack.NoEmitOnErrorsPlugin(),

            new webpack.LoaderOptionsPlugin({
                minimize: true
            }),

            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            }),

            new BundleAnalyzerPlugin({
                analyzerMode: 'static',
                analyzerPort: 4000,
                openAnalyzer: false
            })
        ]
    }
    return webpackConfig;
}

module.exports = createConfig();
module.exports.createConfig = createConfig;
