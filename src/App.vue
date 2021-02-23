<template>
    <div id="app">
        <h1>Hello World</h1>
        <hr>
        <button id="btnA">按钮A</button>
        <br>
        <button id="btnB">按钮B</button>
        <hr>
        <div class="box" @click="tap">{{ title }}</div>
    </div>
</template>
<script>
    // JSDoc 是一个根据 JavaScript 文件中注释信息，生成 JavaScript 应用程序或模块的API文档的工具。你可以使用 JSDoc 标记如：命名空间，类，方法，方法参数等。从而使开发者能够轻易地阅读代码，掌握代码定义的类和其属性和方法，从而降低维护成本，和提高开发效率
    // JSDoc注释一般应该放置在方法或函数声明之前，它必须以/ **开始，以便由JSDoc解析器识别。其他任何以  /*  ，  /***  或者超过3个星号的注释，都将被JSDoc解析器忽略。如下所示：
    
    /**
    * @author Waylon Lai
    * @description  主 vue
    * @module App
    */
export default {
    name: 'app',
    data () {
        return {
            /**
            * @author Waylon Lai
            * @description 标题
            * @member title
            */
            title: 'Vue实例'
        };
    },
    methods: {
        /**
        * @author Waylon Lai
        * @function tap
        * @description  点击方法
        */
        tap () {
            this.title = this.title.split('').reverse().join('');
        }
    }
};
</script>
<style>
.box{
    font-size: 30px;
    background: orange;
}
</style>
