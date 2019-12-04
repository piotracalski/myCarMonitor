<template>
    <div id="board">
        <div :key="car.id" v-for="car in this.cars">
            <Card ref="card"  :car="car" :user="user"  v-on:showCar="$emit('showCar', car.id)"/>
        </div>
    </div>
</template>

<script>
import Card from './board/Card.vue'

export default {
    name: 'Board',
    components: {
        Card
    },
    props: ['cars', 'user'],
    mounted() {
    },
    methods: {
    }
}
</script>

<style scoped>
    #board {
        background-color: #100E17;
        display:grid;
        grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
        grid-gap: 20px;
        margin: 100px 2vw 0 2vw;
    }
</style>