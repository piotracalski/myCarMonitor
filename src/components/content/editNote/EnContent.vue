<template>
  <div id="enContent">
      <span id="enContent-title">
          {{
              note.title
          }}
        </span>
        <span class="enContent-txt">
            <span class="bold">current value: </span>{{note.value}}<br>
            <span class="bold">new value: </span><input name="newValue" type="text" id="newValue">
        </span>
  </div>
</template>

<script>
export default {
    name: 'EnContent',
    props: ['note'],
    data() {
        return {
        }
    },
    methods: {
        getFormData: function() {
            return document.getElementById('newValue').value;
        },
        resetForm: function() {
            document.getElementById('newValue').value = '';
        }
    }
}
</script>

<style>
    #enContent {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr;
        grid-gap:20px;
    }
    #enContent-title {
        font-family: 'Prompt', sans-serif;
        font-size: 20px;
        color: #f7f7f7;
        line-height: 40px;
        text-indent: 0px;
        border-bottom: 1px solid #f7f7f7;
    }
    .enContent-txt {
        font-family: 'Prompt', sans-serif;
        font-size: 18px;
        color: #f7f7f7;
        line-height: 30px;
        text-indent: 0px;
    }
    .bold {
        font-weight: 500;
    }
    input#newValue {
        width: 100px;
        padding: 7px 10px;
        margin: 0px 0;
        box-sizing: border-box;
        background-color:#5d5974;
        font-family: 'Prompt', sans-serif;
        font-size: 16px;
        color: #f7f7f7;
        line-height: 18px;
        text-indent: 0px;
        /* border-bottom:1px solid #f7f7f7; */
        box-shadow: none;
    }
</style>