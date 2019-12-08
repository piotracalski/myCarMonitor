<template>
  <div id="dcContent">
      <span class="dcContent-txt">
        Are you sure you want to delete this car?
        <br>
        This action cannot be undone.
      </span>
  </div>
</template>

<script>
export default {
    name: 'DcContent'
}
</script>

<style>
    #dcContent {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr;
        grid-gap:20px;
    }
    .dcContent-txt {
        font-family: 'Prompt', sans-serif;
        font-size: 18px;
        color: #f7f7f7;
        line-height: 30px;
        text-indent: 0px;
    }
</style>