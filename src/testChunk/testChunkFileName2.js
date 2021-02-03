// 这种方式导入不会按照给定的chunkName进行模块化打包 但是会执行里面的代码 相当于直接导入
import /* webpackChunkName: "test-chunk-file-name-2" */'./testChunkFileName3';
console.log('用于测试webpack分包的文件2');
