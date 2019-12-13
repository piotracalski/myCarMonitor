<template>
  <div id="AddNewCar-box">
      <AncContent ref="ancContent"/>
      <AncButtons v-on:btnClick="emitButtonClick"/>
  </div>
</template>

<script>
import AncButtons from './AncButtons.vue'
import AncContent from './AncContent.vue'

export default {
    name: 'AddNewCar',
    components: {
        AncButtons,
        AncContent
    },
    methods: {
        emitButtonClick: function(btn) {
            this.$emit('btnClick',btn);
        }
    }
}
</script>

<style scoped>
    #AddNewCar-box {
        width: 800px;
        height: 476px;
        padding: 20px;
        box-sizing: border-box;
        background-color: #312D3C;
        position:absolute;
        z-index: 9;
        margin: auto;
        left: 50vw;
        top: 50vh;
        transform:translate(-400px, -238px);
        overflow:hidden;
        box-shadow: 0px 0px 50px 0px #000;
    }
</style>