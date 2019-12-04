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

<style scoped>
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
    }
    .inactive {
        opacity: 0.5;
    }
    .inactive:hover {
        transform: none;
        cursor: default;
    }
</style>