<template>
  <button class="wideBtn" :id="parent+'-wideBtn-'+wideBtn.name" @click="emitWideBtnClick">
      <span class="wideBtn-lbl">
          {{
              wideBtn.lbl
          }}
      </span>
    </button>
</template>

<script>
export default {
    name: 'WideBtn',
    props: ['wideBtn', 'parent'],
    mounted() {
        if (this.wideBtn.name === 'reset') {
            document.getElementById(`${this.parent}-wideBtn-${this.wideBtn.name}`).classList.add('wideBtnDisabled')
        }
    },
    methods:{
        emitWideBtnClick: function () {
            let wideBtnClassList = Array.from(document.getElementById(`${this.parent}-wideBtn-${this.wideBtn.name}`).classList);
            if (!wideBtnClassList.includes('wideBtnDisabled')) {
                this.$emit('wideBtnClick',this.wideBtn.name);
            }
        }
    }
}
</script>

<style>
    .wideBtn{
        width: 100%;
        height:40px;
        background-color:#5d5974;
        border:none;
        box-shadow: 0 0 10px 0 #000;
    }
    .wideBtn:hover{
        cursor: pointer;
        border:none;
        box-shadow: 0 0 10px 0 #41B883;
    }
    .wideBtnDisabled {
        color: #a3a2aa;
    }
    .wideBtnDisabled:hover {
        box-shadow: 0 0 10px 0 #000;
        cursor: default;
    }
    .wideBtn-lbl {
        font-family: 'Prompt', sans-serif;
        font-size: 16px;
        color: #f7f7f7;
        line-height: 16px;
        text-indent: 0px;
        }
</style>