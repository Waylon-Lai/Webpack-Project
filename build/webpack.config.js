// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // 模式配置
    mode: 'development',
    // 上下文
    context: path.resolve(__dirname, '../'),
    // 入口文件
    entry: {
        main: './src/main.js',
        // index: './src/index.js'
    },
    // 出口文件
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/[name].js'
    },
    // 处理对应模块
    module: {},
    // 对应插件
    plugins: [
        // generate dist index.html with correct asset hash for caching.
        // you can customize output by editing /index.html
        // see https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            title: '手搭 Vue 开发环境',
            template: './src/index.html',
            filename: 'home.html',
        }),
    ],
    // 开发服务器配置
    devServer: {}
};
