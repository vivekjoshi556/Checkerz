const path = require('path');

module.exports = {
    entry: './src/Validator.js',
    target: "node",
    resolve: {
        alias: {
            Checkerz: path.resolve(__dirname, 'src/Validator.js')
        }
    },
    output: {
        path: path.resolve(__dirname),
        filename: 'Checkerz.js',
        library: 'Checkerz',
        libraryTarget: 'umd',
        libraryExport: 'default',
        globalObject: 'this'
    },
    mode: 'production',
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                },
            },
        }],
    }
};
