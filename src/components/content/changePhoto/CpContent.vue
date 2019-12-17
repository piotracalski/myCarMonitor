<template>
  <div id="cpContent">
      <div id="cpContent-title">Change photo</div>
      <div id="cpContent-img"></div>
      <input id="cpContent-fileValue" style="display:none" type="file" ref="fileInput" @change="fileSelected">
      <!-- <button class="cpContent-button" id="cpContent-button-chooseImage" @click="triggerClick">
        <span class="cpContent-lbl">Choose image from file</span>
      </button>
      <button class="cpContent-button disabled" id="cpContent-button-resetImage" @click="resetImage"><span class="cpContent-lbl">Reset Image</span></button> -->
      
    <div :key="wideBtn.name" v-for="wideBtn in wideBtns">
        <WideBtn :wideBtn="wideBtn" :parent="'cpContent'" v-on:wideBtnClick="handleWideBtnClick"/>
    </div>
  </div>
</template>

<script>
import WideBtn from '../../buttons/WideBtn'
import {
    setPhoto,
    setStockCarImage
} from '../../../helpers.js'

export default {
    name: 'CpContent',
    components: {
        WideBtn
        },
    props: ['user', 'car'],
    data() {
        return {
            wideBtns: [
                {name: 'chooseFile', lbl: 'Choose image from file'},
                {name: 'deleteFile', lbl: 'Delete current photo'},
                {name: 'reset', lbl: 'Reset'},
            ],
            selectedFile: null
        }
    },
    mounted() {
        setPhoto(this.user, this.car, '#cpContent-img');
        if (this.car.photo) {
            this.selectedFile = this.car.carCode;
            this.toggleWideBtnDisabled('reset');
        } else {
            this.toggleWideBtnDisabled('deleteFile');
            this.toggleWideBtnDisabled('reset');
        }
        console.log(this.selectedFile)
    },
    methods: {
        handleWideBtnClick: function (wideBtn) {
            console.log(wideBtn);
            switch (wideBtn) {
                case 'chooseFile':
                    break
                case 'deleteFile':
                    this.selectedFile = undefined;
                    setStockCarImage('#cpContent-img');
                    this.toggleWideBtnDisabled('deleteFile');
                    this.toggleWideBtnDisabled('reset');
                    break
                case 'reset':
                    if (this.car.photo) {
                        this.selectedFile = this.car.carCode;
                        setPhoto(this.user, this.car, '#cpContent-img');
                        this.toggleWideBtnDisabled('deleteFile');
                        this.toggleWideBtnDisabled('reset');
                    }
                    break
                default:
                    console.log('No action defined for this button')
            }
        },
        toggleWideBtnDisabled: function (btn) {
            document.getElementById(`cpContent-wideBtn-${btn}`).classList.toggle('wideBtnDisabled');
        },
        getNewPhoto: function() {
            return this.selectedFile;
        },
        triggerClick: function() {
            
            let btnClassList = Array.from(document.getElementById('cpContent-button-chooseImage').classList);

            if (!btnClassList.includes('disabled')) {
                this.$refs.fileInput.click();
            }
        },
        resetForm: function() {
            
            // clear carMake input
            document.getElementById('cpContent-input-carMake').value = '';

            // clear carModel input
            document.getElementById('cpContent-input-carModel').value = '';

            // reset image
            this.resetImage();
        },
        resetImage: function() {
            
            let btnClassList = Array.from(document.getElementById('cpContent-button-resetImage').classList);

            if (!btnClassList.includes('disabled')) {

                // set selected file to null
                this.selectedFile = null;
    
                // set car img to stock
                document.getElementById('cpContent-img').style.backgroundImage =  `url('car-stock.png')`;
    
                // switch buttons
                this.switchButtons();
    
                // reset input value cpContent-fileValue
                document.getElementById("cpContent-fileValue").value = '';
            }
        },
        switchButtons: function() {

                document.getElementById('cpContent-button-chooseImage').classList.toggle('disabled');
                document.getElementById('cpContent-button-resetImage').classList.toggle('disabled');        
        },
        fileSelected: function (event) {

            // console.log(event);
            // switch button to reset
            this.switchButtons();
    
            // store file in code
            this.selectedFile = event.target.files[0];
    
            // change cpContent-img to chosen file
            let file = document.getElementById("cpContent-fileValue").files[0];
            let reader = new FileReader();
            reader.onloadend = function(){
                document.getElementById('cpContent-img').style.backgroundImage = `url('${reader.result}')`;      
            }
            if(file){
                reader.readAsDataURL(this.selectedFile);
                }            
        }
    }
}
</script>

<style>
    #cpContent {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto;
        grid-gap:20px;
    }
    #cpContent-img {
        grid-row-start: 2;
        /* grid-row-end: span 7; */
        height:352px;
        background-size: cover;
        background-repeat: no-repeat;
        background-color: #5d5974;
        background-position: center;
        box-shadow:0px 0px 10px 0px #000;
    }
    #cpContent-title {
        font-family: 'Prompt', sans-serif;
        font-size: 20px;
        color: #f7f7f7;
        line-height: 40px;
        text-indent: 0px;
        border-bottom: 1px solid #f7f7f7;
        }
    input[type=text] {
        width: 100%;
        padding: 7px 10px;
        margin: 0px 0;
        box-sizing: border-box;
        background-color:#5d5974;
        font-family: 'Prompt', sans-serif;
        font-size: 16px;
        color: #f7f7f7;
        line-height: 16px;
        text-indent: 0px;
        border:none;
        box-shadow: 0 0 10px 0 #000;
    }
    input[type=text]:focus {
        border:none;
        box-shadow: 0 0 10px 0 #41B883;
    }
    .error {
        background-color:#DF2B53;
    }
</style>