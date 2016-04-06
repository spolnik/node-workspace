module.exports = {
    entry: './source/app/main.ts',
    output: {
        filename: './dist/bundle.js'
    },
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    module: {
        loaders: [
            { test: /\.tsx?$/, loader: 'ts-loader?additionalFiles[]=typings/main/ambient/jquery.datatables.index.d.ts' },
            { test: /\.hbs$/, loader: 'handlebars-loader' }
        ]
    },
    devtool: 'source-map'
};
