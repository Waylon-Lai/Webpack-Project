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
        // 通过对象的方式可以构建多个入口
        main: './src/main.js',
        // index: './src/index.js'
    },
    // 出口文件
    output: {
        path: path.resolve(__dirname, '../dist'), // 输出地址
        filename: 'js/[name].js' // 输出文件名
    },
    // 处理对应模块
    module: {},
    // 对应插件
    plugins: [
        // generate dist index.html with correct asset hash for caching.
        // you can customize output by editing /index.html
        // see https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            title: '手搭 Webpack 开发环境', // html 模板内通过设置<%= htmlWebpackPlugin.options.title %> 拿到的变量
            template: './src/index.html', // 使用的 html 模板地址
            filename: 'home.html', // 输出文件名
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
                    // more options:
                    // https://github.com/kangax/html-minifier#options-quick-reference
            },
            chunksSortMode: 'none',
            scripts: `<script src="https://cdn.bootcss.com/echarts/4.1.0/echarts.min.js"></script>`,
            // inject: 'body',
            // scriptLoading: 'blocking'
        }),
    ],
    // 开发服务器配置
    devServer: {}
};
