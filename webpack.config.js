const path = require('path');
const cleanPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode:'development',
    entry:'./src/main.ts',
    output:{
        filename:'bundle.js',
        path:path.resolve(__dirname,'dist')
    },
    devtool:'inline-source-map',
    module:{
        rules:[
            {
                test:/\.ts$/,
                use: 'ts-loader',
                exclude:/node_modules/
            }
        ]
    },
    resolve:{
        extensions:['.ts','.js']
    },
    devServer: {
        liveReload: true,
        static: {
            directory: path.join(__dirname, 'dist'),
            publicPath: '/',
          },
        devMiddleware: {
            writeToDisk: true,
          },
    },
    plugins: [
        new cleanPlugin.CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'public' }
            ]
        })
    ]
};