<template>
  <div class="note" :id="'note-'+note.name" @click="$emit('editNote')">
      <div class="noteTitle">{{note.title}}</div>
      <div class="noteValue">{{note.value}}</div>
  </div>
</template>

<script>
export default {
    name: 'Note',
    props: ['note'],
    mounted() {
        this.updateStatus(this.note.status);
    },
    methods: {
        updateStatus: function(status) {
            switch(status) {
                case 'ok':
                    document.querySelector(`#note-${this.note.name}`).style.color = '#f7f7f7';
                    break;
                case 'warning':
                    document.querySelector(`#note-${this.note.name}`).style.color = '#F56C1A';
                    break;
                case 'alert':
                    document.querySelector(`#note-${this.note.name}`).style.color = '#DF2B53';
                    break;
                case 'unknown':
                    document.querySelector(`#note-${this.note.name}`).style.color = 'yellow';
                    break
                default:
                    document.querySelector(`#note-${this.note.name}`).style.color = '#f7f7f7';
            }
        }
    }
}
</script>

<style>
    .note {
        font-family: 'Prompt', sans-serif;
        font-size: 18px;
        color: #fff;
        line-height: 30px;
        text-indent: 5px;
        display:grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr;
        grid-gap: 0px;
    }
    .note:hover {
        background-color: rgb(142, 139, 161);
        cursor: pointer;
    }
    .noteTitle {
        font-weight: 600;
        text-align: right;
    }
    .noteValue {
        text-align: left;
        font-weight: 200;
    }
    .sdf{color:#F56C1A}
</style>