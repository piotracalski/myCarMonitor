<template>
    <div class="carDataContent-infoPanel">
        <div>{{panel.panelTitle}}</div>
        <div :key="note.title" v-for="note in panel.panelData">
            <Note ref="note" :note="note" v-on:editNote="$emit('editNote',note)"/>
        </div>
    </div>
</template>

<script>
import Note from './Note.vue'

export default {
    name: 'InfoPanel',
    components: {
        Note
    },
    props: ['panel'],
    methods: {
    }
}
</script>

<style scoped>
    .carDataContent-infoPanel {
        width: 100%;
        height: 100%;
    }
    .carDataContent-infoPanel > div:first-child {
        font-family: 'Prompt', sans-serif;
        font-size: 20px;
        color: #fff;
        line-height: 40px;
        text-indent: 5px;
    }
    .carDataContent-infoPanel > div:nth-of-type(even) {
        background-color: rgb(93, 89, 116);
    }
</style>