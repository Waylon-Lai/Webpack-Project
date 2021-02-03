// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
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
        filename: 'js/[name].[chunkhash].js', // 指列在 entry 中，打包后输出的文件的名称
        chunkFilename: 'js/[id].[chunkhash].js' // 指未被列在 entry 中，却又需要被打包出来的 chunk 文件的名称。一般来说，这个 chunk 文件指的就是要懒加载的代码
    },
    // 处理对应模块
    module: {
        rules: [
            // {
            //     test: /\.css$/, // 解析css
            //     use: ['style-loader', 'css-loader'] // 从右向左解析
            //     /* 
            //         也可以这样写，这种方式方便写一些配置参数
            //         use: [
            //             {loader: 'style-loader'},
            //             {loader: 'css-loader'}
            //         ]
            //     */
            // },
            // {
            //     test: /\.less$/, // 解析less
            //     use: ['style-loader', 'css-loader', 'less-loader'] // 从右向左解析
            // }
            {
                test: /\.(le|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    // 'style-loader', //使用MiniCssExtractPlugin将css用link的方式引入就不再需要style-loader了
                    {
                        loader: 'css-loader',
                        options: {
                            // The option importLoaders allows you to configure how many loaders before css-loader should be applied to @imported resources.
                            importLoaders: 2,
                            // 0 => no loaders (default);
                            // 1 => postcss-loader;
                            // 2 => postcss-loader, less-loader
                        },
                    },
                    {
                        loader: 'postcss-loader',// 为解决浏览器兼容问题而使用兼容性前缀
                        // options: {
                        //     // 出现报错Invalid options object. PostCSS Loader has been initialized using an options object that does not match the API schema.
                        //     // 原因： 可能是该r版本的postcss-loade不支持在webpack.config.js文件中这么写
                        //     // 解决办法：在项目根目录新建一个postcss.config.js文件 在里面写
                        //     plugins: [
                        //         require("autoprefixer")("last 100 versions")
                        //     ]
                        // }
                    },
                    'less-loader'
                ]
            }
        ]
    },
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
            scripts: `<script src="https://cdn.bootcss.com/echarts/4.1.0/echarts.min.js"></script>`, // html 模板内通过设置<%= htmlWebpackPlugin.options.scripts %> 拿到的变量
            styles: '<link rel="stylesheet" href="https://cdn.bootcss.com/element-ui/2.10.0/theme-chalk/index.css">' // html 模板内通过设置<%= htmlWebpackPlugin.options.styles %> 拿到的变量
            // inject: 'body',
            // scriptLoading: 'blocking'
        }),
        // 把css文件从默认js文件中拆分出来的插件
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:16].css',
            chunkFilename: 'css/[id].[contenthash:16].css'
        }),
    ],
    // 开发服务器配置
    devServer: {}
};
