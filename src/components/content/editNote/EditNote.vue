<template>
  <div id="EditNode-box">
      <EnContent ref="EnContent" :note="this.note"/>
      <EnButtons v-on:btnClick="emitButtonClick"/>
  </div>
</template>

<script>
import EnButtons from './EnButtons.vue'
import EnContent from './EnContent.vue'

export default {
    name: 'EditNode',
    props: ['activeCar','note'],
    components: {
        EnButtons,
        EnContent
    },
    data() {
        return {
            editedNote: undefined,
            defaultNote: {
                name: undefined,
                title: undefined,
                value: undefined,
                lastUpdate: undefined,
                status: undefined
            }
        }
    },
    created() {
        this.editedNote = this.note;
    },
    methods: {
        emitButtonClick: function(btn) {
            this.$emit('btnClick',`en-${btn}`);
        },
        getNewValue: function() {
            let newNote = this.note;
            newNote.value = this.$refs.EnContent.getFormData();
            return newNote
        }
    }
}
</script>

<style scoped>
    #EditNode-box {
        width: 300px;
        height: 246px;
        padding: 20px;
        box-sizing: border-box;
        background-color: #312D3C;
        position:absolute;
        z-index: 12;
        margin: auto;
        left: 50vw;
        top: 50vh;
        transform:translate(-150px, -123px);
        overflow:hidden;
        box-shadow: 0px 0px 50px 0px #000;
    }
</style>