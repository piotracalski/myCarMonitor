<template>
    <div id="header">
        <Navigation v-on:btnClick="emitButtonClick"/>
        <HeaderLoader />
    </div>
</template>

<script>
import Navigation from './header/Navigation.vue'
import HeaderLoader from './header/HeaderLoader.vue'


export default {
    name: 'Header',
    components: {
        Navigation,
        HeaderLoader
    },
    methods: {
        emitButtonClick: function(btn) {
            this.$emit('btnClick',btn);
        }
    }
}
</script>

<style scoped>
    #header {
        background-color: #41B883;
        width: 100vw;
        height: 70px;
        box-shadow: 0px 1px 10px 1px #000;
        position: fixed;
        top: 0px;
        z-index: 11;
        display: flex;
    }
</style>
