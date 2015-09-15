
var path = require('path');
module.exports = {
    entry: {
        routerTest: './static/js/src/todo.omni.js'
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
                ]
            }
        ]
    }
};