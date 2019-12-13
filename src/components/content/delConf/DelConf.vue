<template>
  <div id="DeleteConfirmation-box">
      <DcContent ref="DcContent" />
      <DcButtons v-on:btnClick="emitButtonClick"/>
  </div>
</template>

<script>
import DcButtons from './DcButtons.vue'
import DcContent from './DcContent.vue'

export default {
    name: 'DeleteConfirmation',
    props: ['car'],
    components: {
        DcButtons,
        DcContent
    },
    data() {
        return {}
    },
    created() {
    },
    methods: {
        emitButtonClick: function(btn) {
            this.$emit('btnClick',`dc-${btn}`);
        }
    }
}
</script>

<style scoped>
    #DeleteConfirmation-box {
        width: 410px;
        height: 186px;
        padding: 20px;
        box-sizing: border-box;
        background-color: #312D3C;
        position:absolute;
        z-index: 12;
        margin: auto;
        left: 50vw;
        top: 50vh;
        transform:translate(-205px, -93px);
        overflow:hidden;
        box-shadow: 0px 0px 50px 0px #000;
    }
</style>