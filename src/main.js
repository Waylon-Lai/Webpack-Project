// 入口文件
// 导入css文件
import './assets/index.css';
// 导入less文件
import './assets/index.less';
// 导入图片
// import './assets/lyf.jpg';
// 这种方式导入会按照给定的chunkName进行模块化打包 并且执行里面的代码 属于异步加载
import(/* webpackChunkName: "test-chunk-file-name-1" */'./testChunk/testChunkFileName1');

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
// 此时还没完虽然配置了插件和开启了热更新，但实际上并不会生效
let a = 'hello world123';
console.log(a);

// 还需要在主要的js文件里写入下面这段代码
if (module.hot) {
    // 实现热更新
    module.hot.accept();
}
