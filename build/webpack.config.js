// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
console.log(__dirname);

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
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, // 解析图片
                use: [
                    {
                        //url-loader可以处理webpack加载css背景图片、img元素指向的网络图片、使用es6的import引入的图片 但不能处理在html的img标签中直接写入src属性的图片(原因可能是因为在入口文件中没有引入该文件？？？)
                        loader: 'url-loader',
                        options: {
                            limit: 8192, // 小于8k的图片自动转成base64格式，并且不会存在实体图片；超过8k则使用file-loader加载图片，存在实体图片
                            // outputPath: 'images/' // 图片打包后存放的目录
                            name: 'images/[name].[hash:7].[ext]', // 指定图片打包后存放的目录以及文件名格式
                            publicPath: '../', // 指定公共路径 最终路径为 publicPath + name 即 ../images/[name].[hash:7].[ext]
                            // 注意：这时候html中的图片路径受publicPath的影响，无法加载出来
                            // 解决办法：可以把HtmlWebpackPlugin中的filename设置成 html/home.html 加多一层文件夹
                            // esModule: false // 使用html-withimg-loader打包html中img引入的图片，很好用，但是webpack4.x及以上版本会和html-webpack-plugin产生冲突 解决方案：需要在file-loader（或者是内置了file-loader的其他loader，比如url-loader）的options里使用一个配置：esModule:false
                        }
                    },
                    {
                        loader: 'image-webpack-loader', // 压缩图片
                        options: {
                            bypassOnDebug: true,
                            pngquant: { quality: [0.3, 0.5], speed: 4 } // 针对png格式的图片进行特别处理
                        }
                    }
                ]
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, // 解析音频视频
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    publicPath: '../',
                    name: 'media/[name].[hash:7].[ext]',
                    // esModule: false
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/, // 解析字体
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    publicPath: '../',
                    name: 'fonts/[name].[hash:7].[ext]',
                    // esModule: false
                }
            },
            // 补充一个问题：html-withimg-loader和html-webpack-plugin还会产生这样的冲突：html模板里面设置的类似 <%= htmlWebpackPlugin.options.title %> 将会无效
            // 因此不建议使用此插件
            // {
            //     test: /\.(htm|html)$/i,
            //     loader: 'html-withimg-loader'
            // }
            {
                test: /\.m?js$/,
                include: /src/, // 只转化src目录下的js
                exclude: /node_modules/, // 排除掉node_modules，优化打包速度
                use: {
                    loader: 'babel-loader', // 把ES6的或者更高级别的语法编译成ES5的语法，提高兼容性
                    // 这里的配置也可以在项目根目录新建一个 .babelrc 文件 在里面写配置内容
                    options: {
                    //     presets: [
                    //         [
                    //             "@babel/preset-env",
                    //             {
                    //                 "targets": {
                    //                     "browsers": ["> 1%", "last 2 versions", "not ie <= 8"] // 这里 browsers 的配置，就是让 env 去识别要打包代码到什么程度，版本选的越新，打包出来的代码就越小。因为通常版本越低的浏览器，代码转译的量会更大
                    //                 }
                    //             }
                    //         ]
                    //     ],
                    //     plugins: ['@babel/plugin-transform-runtime'], // 避免重复引入一些运行期间重复的公共文件从而导致代码体积大冗余
                        cacheDirectory: true // 当有设置时，指定的目录将用来缓存 loader 的执行结果。之后的 webpack 构建，将会尝试读取缓存，来避免在每次执行时，可能产生的、高性能消耗的 Babel 重新编译过程(注意：写在.babelrc 文件中会报错)
                    }
                }
            },
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
            filename: 'index.html', // 输出文件名 网站默认寻找路径是 index.html 最好采用这个名字
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
        // 打包前先清空先前打包的内容
        new CleanWebpackPlugin(),
    ],
    // 开发服务器配置
    devServer: {
        contentBase: path.resolve(__dirname, '../dist'),
        host: 'localhost',      // 默认是localhost
        port: 3600,             // 端口
        open: true,             // 自动打开浏览器
        hot: true               // 开启热更新
    }
};
