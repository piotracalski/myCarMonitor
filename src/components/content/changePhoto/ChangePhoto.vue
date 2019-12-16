<template>
  <div id="ChangePhoto-box">
      <CpContent ref="cpContent" :user="user" :car="car"/>
      <CpButtons v-on:btnClick="emitButtonClick"/>
  </div>
</template>

<script>
import CpButtons from './CpButtons.vue'
import CpContent from './CpContent.vue'

export default {
    name: 'ChangePhoto',
    components: {
        CpButtons,
        CpContent
    },
    props: ['user', 'car'],
    methods: {
        emitButtonClick: function(btn) {
            this.$emit('btnClick',btn);
        }
    }
}
</script>

<style scoped>
    #ChangePhoto-box {
        width: 400px;
        height: 720px;
        padding: 20px;
        box-sizing: border-box;
        background-color: #312D3C;
        position:absolute;
        z-index: 10;
        margin: auto;
        left: 50vw;
        top: 50vh;
        transform:translate(-200px, -360px);
        overflow:hidden;
        box-shadow: 0px 0px 50px 0px #000;
    }
</style>