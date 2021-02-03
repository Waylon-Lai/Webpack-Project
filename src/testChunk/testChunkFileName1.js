// 这种方式导入也会按照给定的chunkName进行模块化打包 但是不会执行里面的代码 也属于异步加载 但是是懒加载的，只有用到的时候才会加载
const testChunkFileName2 = () => import(/* webpackChunkName: "test-chunk-file-name-2" */'./testChunkFileName2');
// const testChunkFileName2 = resolve => require.ensure([], () => resolve(require('./testChunkFileName2'), 'test2'));
console.log('用于测试webpack分包的文件1');
