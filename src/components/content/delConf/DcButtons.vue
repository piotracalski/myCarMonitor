<template>
    <div id="dcButtons">
        <div :key="button" v-for="button in dcButtons">
            <Button  :button="button" v-on:btnClick="$emit('btnClick',button)"/>
        </div>
    </div>
</template>

<script>
import Button from '../../header/Button.vue'

export default {
    name: 'DcButtons',
    components: {
        Button
    },
    data() {
        return {
            dcButtons: [
                'delCar-confirm',
                'delCar-cancel'
            ]
        }
    }
}
</script>

<style>
    #dcButtons {
        height: 70px;
        display: flex;
        flex-direction:row-reverse;
        align-items: center;
        margin-top:20px;
    }
</style>