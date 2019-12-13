<template>
  <div id="contentOverlay"></div>
</template>

<script>
export default {
    name: 'ContentOverlay'
}
</script>

<style>
    #contentOverlay {
        width: 100%;
        height: 100%;
        background-color: black;
        opacity: 0.6;
        position: absolute;
        top:0px;
        z-index: 10;
    }
</style>