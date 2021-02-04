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
