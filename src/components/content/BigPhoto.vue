<template>
    <div id="bigPhoto" @mouseover="showEditBtn" @mouseleave="hideEditBtn">
        <transition name="fade" mode="out-in">
            <Button v-if="editBtn === true" :button="'changePhoto'" v-on:btnClick="emitButtonClick" />
        </transition>
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
            editBtn: false
        }
    },
    mounted() {
    },
    methods: {
        emitButtonClick: function(btn) {
            this.$emit('btnClick',btn);
        },
        showEditBtn: function () {
            this.editBtn = true;
        },
        hideEditBtn: function () {
            this.editBtn = false;
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
    #button-changePhoto {
        position: absolute;
        right: 10px;
        bottom: 10px;
        cursor: default;
        z-index: 10;
    }
    #button-changePhoto:hover {
        cursor: pointer;
    }
    #bigPhotoOverlay {
        width: 100%;
        height: 100%;
        background-color: #f7f7f7;
        opacity: 0.5;
        color: #f7f7f7;
        font-size: 24px;
        text-align: center;
    }
    #changePhoto {
        font-family: 'Prompt', sans-serif;
        color: #f7f7f7;
        font-size: 24px;
        text-align: center;
        z-index: 10;
        position: absolute;
    }
</style>