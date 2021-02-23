// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const assetsPublicPath = '/';

module.exports = env => {
    // 在package.json文件中通过命令行传入参数env："webpack --env.NODE_ENV=local --env.production --config ./build/webpack.config.js"
    // Use env.<YOUR VARIABLE> here:
    // console.log('NODE_ENV: ', env.NODE_ENV); // 'local'
    // console.log('Production: ', env.production); // true
    return {
        // 模式配置
        mode: 'development',
        // 上下文
        context: path.resolve(__dirname, '../'),
        // 入口文件
        entry: {
            // 通过对象的方式可以构建多个入口
            app: './src/main.js',
            // index: './src/index.js'
        },
        // 出口文件
        output: {
            path: path.resolve(__dirname, '../dist'), // 输出地址
            filename: 'js/[name].[chunkhash].js', // 指列在 entry 中，打包后输出的文件的名称
            chunkFilename: 'js/[id].[chunkhash].js', // 指未被列在 entry 中，却又需要被打包出来的 chunk 文件的名称。一般来说，这个 chunk 文件指的就是要懒加载的代码
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
                        // 'style-loader', // 使用MiniCssExtractPlugin将css用link的方式引入就不再需要style-loader了
                        // 并且，一般来说，我们在开发环境使用style-loader，生产环境使用MiniCssExtractPlugin
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
            // 热更新插件，热更新是指在不刷新页面的情况下更新页面内容
            new webpack.HotModuleReplacementPlugin()
        ],
        // 开发服务器配置
        devServer: {
            // contentBase: path.resolve(__dirname, '../dist'), // 用来指定被访问html页面所在目录 如不配置，devServer默认html所在的目录就是项目的根目录
            host: '0.0.0.0',        // 默认是localhost 设置成0.0.0.0 既可以通过localhost访问，也可以通过本机IP访问
            port: 3600,             // 端口
            open: true,             // 自动打开浏览器
            hot: true,              // 开启热更新
            compress: true,         //启用gzip压缩
            clientLogLevel: 'silent', // 当使用 inline mode 时， DevTools 会输出信息，例如：重新加载之前，出错之前或 Hot Module Replacement 被开启时。可能会导致日志过于冗余，可以通过将其设置为 'silent' 来关闭日志
            historyApiFallback: {
                // 当使用 HTML5 History API 时, 所有的 404 请求都会响应回 rewrites 重定向的页面，避免出现404页面
                // 并且，设置rewrites后可以不用再设置 前面的contentBase
                rewrites: [
                    // from 对应匹配规则的路径
                    // to 重定向的页面 'index.html'与HtmlWebpackPlugin中的filename对应
                    { from: /.*/, to: path.posix.join(assetsPublicPath, 'index.html') }
                ]
            },
            overlay: {
                // 用来在编译出错的时候，在浏览器页面上显示错误和警告
                warnings: true, // 显示错误
                errors: true, // 显示警告
            },
            // stats: 'errors-only' // 用来控制编译的时候shell上的输出内容 "errors-only"表示只打印错误
            quiet: true, // 这个配置属性和devServer.stats属于同一类型的配置属性 当它被设置为true的时候，控制台只输出第一次编译的信息，当你保存后再次编译的时候不会输出任何内容，包括错误和警告
            watchOptions: {
                aggregateTimeout: 300, // 一旦第一个文件改变，在重建之前添加一个延迟。填以毫秒为单位的数字。
                poll: 1000, // 观察许多文件系统会导致大量的CPU或内存使用量。可以排除一个巨大的文件夹。
                ignored: /node_modules/ // 填以毫秒为单位的数字。每隔（你设定的）多少时间查一下有没有文件改动过。不想启用也可以填false。
            },
            proxy: {
                '/proxy': {
                    target: 'http://your_api_server.com',
                    changeOrigin: true,
                    pathRewrite: {
                        '^/proxy': ''
                    }
                }
                // 假设你主机名为 localhost:8080 , 请求 API 的 url 是 http：//your_api_server.com/user/list
                // '/proxy'：如果点击某个按钮，触发请求 API 事件，这时请求 url 是http：//localhost:8080/proxy/user/list 。
                // changeOrigin：如果 true ，那么 http：//localhost:8080/proxy/user/list 变为 http：your_api_server.com/proxy/user/list 。但还不是我们要的 url 。
                // pathRewrite：重写路径。匹配 /proxy ，然后变为'' ，那么 url 最终为 http：//your_api_server.com/user/list 。
            }
        }
    };
};
