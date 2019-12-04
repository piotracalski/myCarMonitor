<template>
    <div id="boardOverlay">
    </div>
</template>

<script>
// import Navigation from './header/Navigation.vue'

export default {
    name: 'BoardOverlay',
    components: {
        // Navigation
    },
    methods: {
        turnOn: function() {
            document.querySelector('#boardOverlay').style.visibility = 'visible';
            document.querySelector('body').style.overflowY = 'hidden';
            this.toggleBtnClass();
        },
        turnOff: function() {
            document.querySelector('#boardOverlay').style.visibility = 'hidden';
            document.querySelector('body').style.overflowY = 'scroll';
            this.toggleBtnClass();
        },
        toggleBtnClass: function() {
            Array.from(document.querySelectorAll('#navigation>div>div.button')).forEach(btn => {
                btn.classList.toggle('inactive');
            });
        }
    }
}
</script>

<style scoped>
    #boardOverlay {
        background-color: black;
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0px;
        z-index: 8;
        opacity: 0.6;
        visibility: hidden;
    }
</style>