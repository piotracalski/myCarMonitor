<template>
    <div id="enButtons">
        <div :key="button" v-for="button in enButtons">
            <Button  :button="button" v-on:btnClick="$emit('btnClick',button)"/>
        </div>
    </div>
</template>

<script>
import Button from '../../header/Button.vue'

export default {
    name: 'EnButtons',
    components: {
        Button
    },
    data() {
        return {
            enButtons: [
                'confirm',
                'cancel'
            ]
        }
    }
}
</script>

<style>
    #enButtons {
        /* background-color:#fff; */
        height: 70px;
        display: flex;
        flex-direction:row-reverse;
        align-items: center;
        margin-top:20px;
    }
</style>