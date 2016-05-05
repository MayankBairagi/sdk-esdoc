const webpack = require('webpack');
const IS_NPM = process.env.IS_NPM;
const path = IS_NPM ? __dirname : __dirname + '/build/sdk';
const filename = IS_NPM ? 'sdk.js' : 'sdk' + '.js';

module.exports = {
    entry: './index.js',
    files: [
        'src/*.js',
        'test/*.js'
    ],
    reporters: ['progress', 'coverage'],
    preprocessors: {
        // source files, that you wanna generate coverage for
        // do not include tests or libraries
        // (these files will be instrumented by Istanbul)
        'src/*.js': ['coverage']
    },
    coverageReporter: {
        type : 'html',
        dir : 'coverage/'
    },
    output: {
        path: path,
        filename: filename,
        libraryTarget: 'umd'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /(node_modules)/,
            loaders: ['babel','isparta'],
            // include: path.join(__dirname, 'src')
        }]
    },
    devServer: {
        contentBase: './example'
    }
};
