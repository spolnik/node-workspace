var webpack = require('webpack');
var BowerWebpackPlugin = require("bower-webpack-plugin");



module.exports = {
    entry: './source/app/main.ts',
    output: {
        filename: './dist/bundle.js'
    },
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
        moduleDirectories: ["bower_components"]
    },
    module: {
        loaders: [
            { test: /\.tsx?$/, loader: 'ts-loader' },
            { test: /\.hbs$/, loader: 'handlebars-loader' }
        ]
    },
    devtool: 'source-map',
    plugins: [
        new BowerWebpackPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jquery: "jquery",
            jQuery: "jquery",
            "windows.jQuery": "jquery",
            Q: "q",
            Handlebars: "handlebars"
        })
    ]
};
