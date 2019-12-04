<template>
  <div>
        <img src="loader.png" id="header-loader" class="loader01 loading" height="70px">
  </div>
</template>

<script>
export default {
    name: 'HeaderLoader'
}
</script>

<style scoped>
    .loader01 {
        margin-left: 20px;
        display: none;
    }
    .loading {
        animation: rotating 0.5s linear infinite;
        display: block;
    }
    @keyframes rotating {
        from {
            -ms-transform: rotate(0deg);
            -moz-transform: rotate(0deg);
            -webkit-transform: rotate(0deg);
            -o-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        to {
            -ms-transform: rotate(-360deg);
            -moz-transform: rotate(-360deg);
            -webkit-transform: rotate(-360deg);
            -o-transform: rotate(-360deg);
            transform: rotate(-360deg);
        }
    }
    @-webkit-keyframes rotating {
        from {
            -webkit-transform: rotate(0deg);
            -o-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        to {
            -webkit-transform: rotate(-360deg);
            -o-transform: rotate(-360deg);
            transform: rotate(-360deg);
        }
    }
</style>