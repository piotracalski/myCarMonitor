<template>
    <div class="navBar" id="navigation">
        <div :key="button" v-for="button in navBarBtn">
            <Button  :button="button" v-on:btnClick="$emit('btnClick',button)"/>
        </div>
    </div>
</template>

<script>
import Button from './Button.vue'

export default {
    name: 'Navigation',
    components: {
        Button
    },
    data() {
        return {
            navBarBtn: [
                'addNewCard',
                'saveData',
                'userProfile',
                'logout'
            ]
        }
    }
}
</script>

<style scoped>
    .navBar {
        height: 70px;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .loader01 {
        margin-left: 20px;
    }
    .loader01:hover {
        animation: rotating 0.5s linear infinite;
    }
    @keyframes rotating {
        from {
            -ms-transform: rotate(0deg);
            -moz-transform: rotate(0deg);
            -webkit-transform: rotate(0deg);
            -o-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        to {
            -ms-transform: rotate(-360deg);
            -moz-transform: rotate(-360deg);
            -webkit-transform: rotate(-360deg);
            -o-transform: rotate(-360deg);
            transform: rotate(-360deg);
        }
    }
    @-webkit-keyframes rotating {
        from {
            -webkit-transform: rotate(0deg);
            -o-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        to {
            -webkit-transform: rotate(-360deg);
            -o-transform: rotate(-360deg);
            transform: rotate(-360deg);
        }
    }
</style>