<template>
    <div class="carDataHeader">
        <div>   
            <h3><span class="carMake">{{this.carMake}}&nbsp;</span>{{this.carModel}}</h3>
        </div>
        <div class="contentHeaderNav">
            <div :key="button" v-for="button in headerPanelBtn">
                <Button  :button="button" v-on:btnClick="$emit('btnClick',button)"/>
            </div>
        </div>
    </div>
</template>

<script>
import Button from '../header/Button.vue'

export default {
    name: 'HeaderPanel',
    props: ['carMake','carModel'],
    components: {
        Button
    },
    data() {
        return {
            headerPanelBtn: [
                'deleteCar',
                'hideContent'
            ]
        }
    }
}
</script>

<style>
    .carDataHeader {
        border-bottom: 1px solid #fff;
        display:grid;
        grid-template-columns: auto 180px;
        grid-template-rows: 1fr;
        grid-gap: 0;
    }
    .carDataHeader > div > h3 {
        font-family: 'Prompt', sans-serif;
        font-size: 48px;
        color: #fff;
        line-height: 58px;
        text-indent: 20px;
        font-weight: 300;
    }
    .contentHeaderNav {
        display: flex;
    }
    .carMake {
        font-weight: bold;
    }
</style>