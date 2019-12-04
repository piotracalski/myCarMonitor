<template>
  <div id="ancContent">
      <div id="ancContent-img" style="background-image: url('car-stock.png')"></div>
      <div id="ancContent-title">Add new car</div>
      <div class="ancContent-lbl">Enter car make:</div>
      <div><input name="carMake" type="text" id="ancContent-input-carMake"></div>
      <div class="ancContent-lbl">Enter car model:</div>
      <div><input name="carModel" type="text" id="ancContent-input-carModel"></div>
      <input id="ancContent-fileValue" style="display:none" type="file" ref="fileInput" @change="fileSelected">
      <button class="ancContent-button" id="ancContent-button-chooseImage" @click="triggerClick">
        <span class="ancContent-lbl">Choose image from file</span>
      </button>
      <button class="ancContent-button disabled" id="ancContent-button-resetImage" @click="resetImage"><span class="ancContent-lbl">Reset Image</span></button>
  </div>
</template>

<script>
export default {
    name: 'AncContent',
    data() {
        return {
            selectedFile: null
        }
    },
    methods: {
        getFormData: function() {
            return [
                document.getElementById('ancContent-input-carMake').value,
                document.getElementById('ancContent-input-carModel').value,
                this.selectedFile
            ]
        },
        triggerClick: function() {
            
            let btnClassList = Array.from(document.getElementById('ancContent-button-chooseImage').classList);

            if (!btnClassList.includes('disabled')) {
                this.$refs.fileInput.click();
            }
        },
        resetForm: function() {
            
            // clear carMake input
            document.getElementById('ancContent-input-carMake').value = '';

            // clear carModel input
            document.getElementById('ancContent-input-carModel').value = '';

            // reset image
            this.resetImage();
        },
        resetImage: function() {
            
            let btnClassList = Array.from(document.getElementById('ancContent-button-resetImage').classList);

            if (!btnClassList.includes('disabled')) {

                // set selected file to null
                this.selectedFile = null;
    
                // set car img to stock
                document.getElementById('ancContent-img').style.backgroundImage =  `url('car-stock.png')`;
    
                // switch buttons
                this.switchButtons();
    
                // reset input value ancContent-fileValue
                document.getElementById("ancContent-fileValue").value = '';
            }
        },
        switchButtons: function() {

                document.getElementById('ancContent-button-chooseImage').classList.toggle('disabled');
                document.getElementById('ancContent-button-resetImage').classList.toggle('disabled');        
        },
        fileSelected: function (event) {

            // console.log(event);
            // switch button to reset
            this.switchButtons();
    
            // store file in code
            this.selectedFile = event.target.files[0];
    
            // change ancContent-img to chosen file
            let file = document.getElementById("ancContent-fileValue").files[0];
            let reader = new FileReader();
            reader.onloadend = function(){
                document.getElementById('ancContent-img').style.backgroundImage = `url('${reader.result}')`;      
            }
            if(file){
                reader.readAsDataURL(this.selectedFile);
                }else{
                }
            
        }
    }
}
</script>

<style>
    #ancContent {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 40px 16px 40px 16px 40px 40px 40px;
        grid-gap:20px;
    }
    #ancContent-img {
        grid-row-start: 1;
        grid-row-end: span 7;
        background-size: cover;
        background-repeat: no-repeat;
        background-color: #5d5974;
        background-position: center;
        box-shadow:0px 0px 10px 0px #000;
    }
    #ancContent-title {
        font-family: 'Prompt', sans-serif;
        font-size: 20px;
        color: #f7f7f7;
        line-height: 40px;
        text-indent: 0px;
        border-bottom: 1px solid #f7f7f7;
        }
    .ancContent-lbl {
        font-family: 'Prompt', sans-serif;
        font-size: 16px;
        color: #f7f7f7;
        line-height: 16px;
        text-indent: 0px;
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
    .ancContent-button{
        height:40px;
        background-color:#5d5974;
        border:none;
        box-shadow: 0 0 10px 0 #000;
    }
    .ancContent-button:hover{
        cursor: pointer;
        border:none;
        box-shadow: 0 0 10px 0 #41B883;
    }
    .disabled {
        color: #a3a2aa;
    }
    .disabled:hover {
        box-shadow: 0 0 10px 0 #000;
        cursor: default;
    }
    .error {
        background-color:#DF2B53;
    }
</style>