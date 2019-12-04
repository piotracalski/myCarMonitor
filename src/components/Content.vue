<template>
    <div id="content">
        <div :key="carId" v-for="carId in activeCar">
            <CarDetails ref="carDetails" :cars="cars" :activeCar="activeCar" v-on:btnClick="emitButtonClick" v-on:editNote="editNote" :user="user"/>
        </div>
        <ContentOverlay ref="contentOverlay"/>
        <EditNote ref="editNote" v-on:btnClick="emitButtonClick" :activeCar="activeCar" />
    </div>
</template>

<script>
import CarDetails from './content/CarDetails.vue'
import ContentOverlay from './content/ContentOverlay.vue'
import EditNote from './content/editNote/EditNote.vue'

export default {
    name: 'Content',
    components: {
        CarDetails,
        ContentOverlay,
        EditNote
    },
    props: ['cars','activeCar','pageObject','user'],
    mounted() {
    },
    methods: {
        show: function(id) {
            document.querySelector('#content').style.height = '96vh';
            document.querySelector('#content').classList.add('active');
        },
        hide: function() {
            document.querySelector('#content').style.height = '0vh';
            document.querySelector('#content').classList.remove('active');
        },
        emitButtonClick: function(btn) {
            this.$emit('btnClick',`content-${btn}`);
        },
        editNote: function(note) {
            // console.log(note);

            // turn on content overlay
            this.$refs.contentOverlay.turnOn();

            // show edit note dialog box
            this.$refs.editNote.show(note);
        }
    }
}
</script>

<style scoped>
    #content {
        background-color: #312D3C;
        width: 97vw;
        height: 0px;
        box-shadow: 0px 1px 10px 1px #000;
        position: fixed;
        top: 0px;
        left: 1vw;
        z-index: 9;
        transition: height 0.1s;
        overflow: hidden;
    }
    .active {
        height: 98vh;
    }
</style>