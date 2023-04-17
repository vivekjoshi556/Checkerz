const path = require('path');

const commonJSConfig = {
    entry: './src/Validator.js',
    target: "node",
    resolve: {
        alias: {
            Checkerz: path.resolve(__dirname, 'src/Validator.js')
        }
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'Checkerz_ES5.js',
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
  
// ES6 module configuration
const es6ModuleConfig = {
    entry: './src/Validator.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'Checkerz_ES6.js',
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
                presets: [['@babel/preset-env', { modules: false }]],
                },
            },
        }],
    },
    experiments: {
      outputModule: true,
    },
};
  
module.exports = [commonJSConfig, es6ModuleConfig];
