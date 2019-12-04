<template>
  <div class="carInfo">
      <div class="carInfoHeader">
          <span class="carMake">{{car.info[0].panelData[0].value}}&nbsp;</span>
          <span>{{car.info[0].panelData[1].value}}</span>
      </div>
      <!-- <div class="carInfoImg" :style="`background-image: url(${car.photo})`"></div> -->
      <div class="carInfoImg" :id="'carInfoImg-'+car.id"></div>
  </div>
</template>

<script>
// import CarInfoHeader from './CarInfoHeader.vue'
import { setPhoto } from '../../helpers.js'

export default {
    name: 'CarInfo',
    components: {
        // CarInfoHeader
    },
    props: ['car', 'user'],
    mounted() {
        setPhoto(this.user, this.car, `#carInfoImg-${this.car.id}`);
    }
}
</script>

<style scoped>
    .carInfo {
        width: calc(100% - 40px);
        height: calc(100% - 70px);
        margin: 20px;
        position: relative;
        font-family: 'Prompt', sans-serif;
        font-size: 24px;
        color: #fff;
        line-height: 50px;
        text-indent: 20px;
    }
    .carInfoHeader {
        width: 100%;
        height: 50px;
    }
    .carInfoImg {
        width: 100%;
        height: 280px;
        background-size: cover;
        background-position: center;
    }
    .carMake {
        font-weight: bold;
    }
</style>