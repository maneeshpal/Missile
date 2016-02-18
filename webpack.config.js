
var path = require('path');
module.exports = {
    entry: { 
        promisetest: './static/js/src/promisetest.js', 
        dropdown: './static/js/src/dropdown.js',
        routertest: './static/js/src/routertest.js'
    },

    output: {
        path: __dirname + '/public/js',
        filename: '[name].js'
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [
                    path.resolve(__dirname, './static/js/src')
                ],
                query: {
                    plugins: ['transform-runtime'],
                    presets: ['es2015','stage-0', 'react'],
                }
            }
        ]
    }
};