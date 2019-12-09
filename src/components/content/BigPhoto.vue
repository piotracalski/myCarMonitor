<template>
    <div id="bigPhoto" @mouseover="showEditBtn" @mouseleave="hideEditBtn">
        <div :key="button" v-for="button in buttons">
            <Button :button="button" v-on:btnClick="$emit('editPhoto')" v-on:editPhoto="editPhoto"/>
        </div>
    </div>
</template>

<script>
import Button from '../header/Button'

export default {
    name: 'BigPhoto',
    components: {
        Button
    },
    data() {
        return {
            buttons: [
                'editPhoto'
            ]
        }
    },
    mounted() {
    },
    methods: {
        showEditBtn: function () {
            document.querySelector('#button-editPhoto').classList.add('visible');
        },
        hideEditBtn: function () {
            document.querySelector('#button-editPhoto').classList.remove('visible');
        },
        editPhoto: function (event) {
            const bigPhoto = document.querySelector('#bigPhoto');
            switch (event) {
                case 'mouseover':
                    bigPhoto.style.opacity = "0.8";
                    break
                case 'mouseleave':
                    bigPhoto.style.opacity = "1";
                    break
                default:
                    console.log('no action defined for this event');
            }
        }
    }
}
</script>

<style>
    #bigPhoto {
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        box-shadow: 0px 0px 20px 0px #000;
        color: #f7f7f7;
        position: relative;
        transition: opacity 1s;
    }
    #button-editPhoto {
        position: absolute;
        right: 10px;
        bottom: 10px;
        opacity: 0;
        cursor: default;
        z-index: 10;
    }
    #button-editPhoto:hover {
        cursor: pointer;
    }
    .visible {
        opacity: 1 !important;
    }
</style>