<template>
    <div id="cpButtons">
        <div :key="button" v-for="button in cpButtons">
            <Button  :button="button" v-on:btnClick="$emit('btnClick',button)"/>
        </div>
    </div>
</template>

<script>
import Button from '../../header/Button.vue'

export default {
    name: 'CpButtons',
    components: {
        Button
    },
    data() {
        return {
            cpButtons: [
                'cp-confirm',
                'cp-cancel'
            ]
        }
    }
}
</script>

<style>
    #cpButtons {
        /* background-color:#fff; */
        height: 70px;
        display: flex;
        flex-direction:row-reverse;
        align-items: center;
        margin-top:20px;
    }
</style>