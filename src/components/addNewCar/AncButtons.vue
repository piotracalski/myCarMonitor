<template>
    <div id="ancButtons">
        <div :key="button" v-for="button in ancButtons">
            <Button  :button="button" v-on:btnClick="$emit('btnClick',button)"/>
        </div>
    </div>
</template>

<script>
import Button from '../header/Button.vue'

export default {
    name: 'AncButtons',
    components: {
        Button
    },
    data() {
        return {
            ancButtons: [
                'anc-confirm',
                'anc-cancel'
            ]
        }
    }
}
</script>

<style>
    #ancButtons {
        /* background-color:#fff; */
        height: 70px;
        display: flex;
        flex-direction:row-reverse;
        align-items: center;
        margin-top:20px;
    }
</style>