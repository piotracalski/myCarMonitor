<template>
    <div class="carDetails">
        <BigPhoto v-on:btnClick="emitButtonClick" />
        <div class="carData">
            <HeaderPanel
                :carMake="this.cars[this.activeCar].info[0].panelData[0].value" :carModel="this.cars[this.activeCar].info[0].panelData[1].value" 
                v-on:btnClick="emitButtonClick"
            />
            <div class="carDataContent">
                <div :key="panel.panelTitle" v-for="panel in this.cars[this.activeCar].info">
                    <InfoPanel ref="infoPanel" :panel="panel" v-on:editNote="emitEditNote"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BigPhoto from './BigPhoto'
import InfoPanel from './InfoPanel.vue'
import HeaderPanel from './HeaderPanel.vue'
import { setPhoto } from '../../helpers.js'

export default {
    name: 'CarDetails',
    components: {
        InfoPanel,
        HeaderPanel,
        BigPhoto
    },
    props: ['cars','activeCar','user'],
    created() {},
    mounted() {
        setPhoto(this.user, this.cars[this.activeCar], '#bigPhoto');
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
        height: calc(100% - 110px);
        margin: 90px 20px 20px 20px;
        display: grid;
        grid-template-columns: 3fr 5fr;
        grid-template-rows: 1fr; 
        grid-gap: 1vw;
    }
    .carData {
        width: 100%;
        height: 100%;
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