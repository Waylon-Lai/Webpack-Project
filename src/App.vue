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
export default {
    name: 'app',
    data () {
        return {
            title: 'Vue实例'
        };
    },
    methods: {
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
