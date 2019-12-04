<template>
    <div class="card" :id="'card-'+car.id" @click="$emit('showCar', car.id)">
        <CardStatus ref="cardStatus" :status="car.status" :id="car.id"/>
        <CarInfo :car="car" :user="user"/>
    </div>
</template>

<script>
import CardStatus from './CardStatus.vue'
import CarInfo from './CarInfo.vue'

export default {
    name: 'Card',
    components: {
        CardStatus,
        CarInfo
    },
    props: ['car', 'user']
}
</script>

<style scoped>
    .card {
        background-color: #312D3C;
        position: relative;
        height: 400px;
        display: block;
        box-shadow: 0px 0px 10px 1px #000;
        transition: transform 0.5s;
    }
    .card:hover {
        transform: scale(1.05);
        z-index: 2;
        cursor: pointer;
    }
</style>