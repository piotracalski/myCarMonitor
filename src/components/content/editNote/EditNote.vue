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
    props: ['activeCar'],
    components: {
        EnButtons,
        EnContent
    },
    data() {
        return {
            note: undefined,
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
        this.note = this.defaultNote;
    },
    methods: {
        show: function(note) {
            document.getElementById('EditNode-box').style.display = 'block';
            this.note = note;
        },
        hide: function() {
            document.getElementById('EditNode-box').style.display = 'none';
            this.note = this.defaultNote;
        },
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
        display: none;
        margin: auto;
        left: 50vw;
        top: 50vh;
        transform:translate(-150px, -123px);
        overflow:hidden;
        box-shadow: 0px 0px 50px 0px #000;
    }
</style>