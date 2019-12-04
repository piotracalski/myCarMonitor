<template>
    <div class="carDetails">
        <div class="bigPhoto"></div>
        <div class="carData">
            <HeaderPanel :carMake="this.cars[this.activeCar].info[0].panelData[0].value" :carModel="this.cars[this.activeCar].info[0].panelData[1].value" v-on:btnClick="emitButtonClick"/>
            <div class="carDataContent">
                <div :key="panel.panelTitle" v-for="panel in this.cars[this.activeCar].info">
                    <InfoPanel ref="infoPanel" :panel="panel" v-on:editNote="emitEditNote"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import InfoPanel from './InfoPanel.vue'
import HeaderPanel from './HeaderPanel.vue'
import { getCarPhoto, setPhoto } from '../../helpers.js'

export default {
    name: 'CarDetails',
    components: {
        InfoPanel,
        HeaderPanel
    },
    props: ['cars','activeCar','user'],
    created() {},
    mounted() {
        setPhoto(this.user, this.cars[this.activeCar], '.bigPhoto');
    },
    methods: {
        emitButtonClick: function(btn) {
            this.$emit('btnClick',btn);
        },
        emitEditNote: function(note) {
            this.$emit('editNote',note);
        }
    }
}
</script>

<style scoped>
    .carDetails {
        width: calc(100% - 40px);
        height: calc(96vh - 110px);
        /* background-color: #f7f7f7; */
        margin: 90px 20px 20px 20px;
        display: grid;
        grid-template-columns: 3fr 5fr;
        grid-template-rows: 1fr; 
        grid-gap: 1vw;
    }
    .bigPhoto {
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        box-shadow: 0px 0px 20px 0px #000;
        color: #f7f7f7;
    }
    .carData {
        width: 100%;
        height: 100%;
        /* background-color: green; */
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 4fr; 
        grid-gap: 1vw;
    }
    .carDataContent {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr auto;
        grid-template-rows: 1fr;
        grid-gap: 1vw;
    }
</style>