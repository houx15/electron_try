var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const extractCSSandSCSS = new ExtractTextPlugin('style.css');
const srcPath = path.join(__dirname, 'src')

let defineObj = {};
defineObj['process.env'] = {
    "NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "development"
    )
}

module.exports = {
    entry: "./src/index.js",
    output: {
        publicPath: "/",
        path: __dirname + "/build",
        filename: "bundle.js"
    },
    resolve: {
        alias: {
            style: path.join(srcPath,'static/style'),
            image: path.join(srcPath, 'static/image')
        }
    },
    module: {
        rules: [
            {
                test: /\.(|s)css$/,
                use: extractCSSandSCSS.extract({
                    use: [
                        'css-loader',
                        'resolve-url-loader',
                        'sass-loader'
                    ]
                })
            },
            {
                test: /\.less$/,
                user: extractCSSandSCSS.extract({
                    use: [
                        'css-loader',
                        'less-loader'
                    ]
                })
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            },
            {
                test: /\.json$/,
                use: 'json-loader'
            }
        ]
    },
    plugins: [
        extractCSSandSCSS,
        new webpack.DefinePlugin(defineObj),
        new ExtractTextPlugin("style.css"),
        new webpack.ProvidePlugin({
            "$": "jquery",
            "jQuery": "jquery",
            "window.jQuery": "jquery"
        })
    ],
    devServer: {
        contentBase: "./public",
        hot: true,
        inline: true,
        historyApiFallback: true,
        disableHostCheck: true
    }
};