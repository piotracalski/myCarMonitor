<template>
    <div class="button" :id="'button-'+button" @click="$emit('btnClick',button)">
    </div>
</template>

<script>
// import Button from './header/Button.vue'

export default {
    name: 'Button',
    components: {
    },
    props: ['button'],
    mounted() {
        document.querySelector(`#button-${this.button}`).style.backgroundImage = `url('./${this.button}.png')`
    }
}
</script>

<style>
    .button {
        /* background-color: #312D3C; */
        background-size:60px;
        background-position: center;
        background-repeat:no-repeat;
        width: 60px;
        height: 60px;
        margin-left: 20px;
        transition: transform 0.25s;
        display: block;
    }
    .button:hover {
        transform: scale(1.2) rotate(15deg);
        cursor: pointer;
        animation: none !important;
    }
    .inactive {
        opacity: 0.5;
        animation: none !important;
    }
    .inactive:hover {
        transform: none;
        cursor: default;
    }
    .saveSuggest {
        animation: 2s infinite save-suggest;
        -webkit-animation: 2s infinite save-suggest;
        -moz-animation: 2s infinite save-suggest;
    }
    @keyframes save-suggest {
        0%   {margin-top: 0px;}
        10%  {margin-top: 25px;}
        15%  {margin-top: 30px;}
        25%  {margin-top: 0px;}
        35%  {margin-top: 25px;}
        40%  {margin-top: 30px;}
        50%  {margin-top: 0px;}
        100% {margin-top: 0px;}
    }
    @-webkit-keyframes save-suggest {
        0%   {margin-top: 0px;}
        10%  {margin-top: 25px;}
        15%  {margin-top: 30px;}
        25%  {margin-top: 0px;}
        35%  {margin-top: 25px;}
        40%  {margin-top: 30px;}
        50%  {margin-top: 0px;}
        100% {margin-top: 0px;}
    }
    @-moz-keyframes save-suggest {
        0%   {margin-top: 0px;}
        10%  {margin-top: 25px;}
        15%  {margin-top: 30px;}
        25%  {margin-top: 0px;}
        35%  {margin-top: 25px;}
        40%  {margin-top: 30px;}
        50%  {margin-top: 0px;}
        100% {margin-top: 0px;}
    }
</style>