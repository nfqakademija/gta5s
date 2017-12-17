const webpack = require("webpack");
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    devtool: "source-map",
    entry: {
        spinner: path.join(__dirname, "assets/js/spinner.js"),
        profile: path.join(__dirname, "assets/js/profile-sidebar.js"),
        youtube: path.join(__dirname, "assets/js/youtube.js"),
        main: path.join(__dirname, "assets/js/main.js"),
        reactMap: path.join(__dirname, "assets/js/reactApp/index.js")
    },
    output: {
        path: path.join(__dirname, "web/assets"),
        filename: '[name].js',
        publicPath: "/"
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new ExtractTextPlugin("css/[name].css", {
            allChunks: true
        }),
        new webpack.optimize.UglifyJsPlugin(),
        new OptimizeCssAssetsPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.(jpe?g|png|gif)$/i,   //to support eg. background-image property
                loader:"file-loader",
                query:{
                    name:'[name].[ext]',
                    outputPath:'../assets/images/'
                    //the images will be emmited to ./web/assets/images/ folder
                    //the images will be put in the DOM <style> tag as eg. background: url(...);
                }
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,    //to support @font-face rule
                loader: "url-loader",
                query:{
                    limit:'10000',
                    name:'[name]/[name].[ext]',
                    outputPath:'../assets/fonts/'
                    //the fonts will be emmited to ./web/assets/fonts/ folder
                    //the fonts will be put in the DOM <style> tag as eg. @font-face{ src:url(...); }
                }
            },
            {
                test: /\.(scss|css)$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader","sass-loader"]
                })
            }
        ]
    }
}