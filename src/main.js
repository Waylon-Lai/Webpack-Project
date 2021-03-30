// 入口文件
// 导入css文件
import './assets/index.css';
// 导入less文件
import './assets/index.less';
// 导入图片
// import './assets/lyf.jpg';
// 这种方式导入会按照给定的chunkName进行模块化打包 并且执行里面的代码 属于异步加载
import(/* webpackChunkName: "test-chunk-file-name-1" */'./testChunk/testChunkFileName1');

// -----------------------------------------------Vue--------------------------------------------------------
import Vue from 'vue';
import App from './App.vue';

new Vue({
    render: h => h(App)
}).$mount('#app');
// -----------------------------------------------Vue--------------------------------------------------------


document.getElementById('btnA').onclick = function () {
    //异步加载A
    // import(/* webpackChunkName: "test-chunk-file-name-4" */'./testChunk/testChunkFileName4').then((data) => {
    //     alert(data.default);
    // });
    //异步加载A
    require.ensure([], function () {
        const A = require('./testChunk/testChunkFileName4');
        alert(A);
    }, 'test-chunk-file-name-4');
};

document.getElementById('btnB').onclick = function () {
    //异步加载b
    import(/* webpackChunkName: "test-chunk-file-name-5" */'./testChunk/testChunkFileName5').then((data) => {
        alert(data.default);
    });
};
console.log('这是入口文件');

const asyncFunc = async () => {
    await setTimeout(() => {
        console.log('测试babel对async和await的支持');
    });
};
asyncFunc();
// 此时还没完 虽然配置了插件和开启了热更新，但实际上直接修改js文件（如对下面的a重新赋值）并不会生效，依然会刷新页面
// 那为什么直接修改样式和vue会生效而直接修改js文件却不会生效呢？
// 因为样式文件是经过 Loader 处理的，在 style-loader 中就已经自动处理了样式文件的热更新，所以就不需要我们额外手动去处理了
// 而vue是因为你使用的是框架，使用框架开发时，我们项目中的每个文件就有了规律，例如 React 中要求每个模块导出的必须是一个函数或者类，那这样就可以有通用的替换办法，所以这些工具内部都已经帮你实现了通用的替换操作，自然就不需要手动处理了。
// 而我们所编写的 JavaScript 模块是没有任何规律的，你可能导出的是一个对象，也可能导出的是一个字符串，还可能导出的是一个函数，使用时也各不相同。所以 Webpack 面对这些毫无规律的 JS 模块，根本不知道该怎么处理更新后的模块，也就无法直接实现一个可以通用所有情况的模块替换方案
let a = 'hello world123';
console.log(a);

// 解决方法：还需要在主要的js文件里写入下面这段代码
// if (module.hot) {
//     // 实现热更新
//     module.hot.accept();
// }
