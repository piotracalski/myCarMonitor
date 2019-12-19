<template>
    <div id="content">
        <CarDetails 
            ref="carDetails" 
            :cars="cars" 
            :activeCar="activeCar" 
            v-on:btnClick="emitButtonClick" 
            v-on:editNote="showEditNote" 
            :user="user"
        />
        <transition name="fade" mode="out-in">
            <ContentOverlay ref="contentOverlay" v-if="overlay === true" />
        </transition>
        <transition name="fade" mode="out-in">
            <EditNote ref="editNote" :note="note" v-if="popup === 'editNote'" v-on:btnClick="emitButtonClick" :activeCar="activeCar" />
            <DeleteConfirmation ref="delConf" v-if="popup === 'deleteConfirmation'" v-on:btnClick="emitButtonClick" :car="cars[activeCar]"/>
            <ChangePhoto 
                ref="changePhoto" 
                v-if="popup === 'changePhoto'" 
                v-on:btnClick="emitButtonClick" 
                :user="user" 
                :activeCar="activeCar" 
                :car="cars[activeCar]"
            />
        </transition>
    </div>
</template>

<script>
import CarDetails from './content/CarDetails.vue'
import ContentOverlay from './content/ContentOverlay.vue'
import EditNote from './content/editNote/EditNote.vue'
import DeleteConfirmation from './content/delConf/DelConf.vue'
import ChangePhoto from './content/changePhoto/ChangePhoto.vue'
import {
    setStockCarImage,
    deleteCarPhoto,
    uploadCarPhoto,
    setPhoto,
    saveData
} from '../helpers'

export default {
    name: 'Content',
    components: {
        CarDetails,
        ContentOverlay,
        EditNote,
        DeleteConfirmation,
        ChangePhoto
    },
    props: ['cars','activeCar','pageObject','user'],
    data() {
        return {
            overlay: false,
            popup: undefined,
            note: undefined
        }
    },
    mounted() {
        this.setBigPhotoDisplay();
    },
    methods: {
        toggleOverlay: function() {
            this.overlay = !this.overlay;
        },
        toggleEditNote: function() {
            this.editNote = !this.editNote;
        },
        emitButtonClick: function(btn) {
            switch (btn) {
                case 'deleteCar':
                    this.toggleOverlay();
                    this.popup = 'deleteConfirmation';
                    break
                case 'dc-delCar-cancel':
                    this.toggleOverlay();
                    this.popup = undefined;
                    break
                case 'dc-delCar-confirm':
                    this.toggleOverlay();
                    this.popup = undefined;
                    this.$emit('deleteCar', this.activeCar);
                    break
                case 'en-cancel':
                    this.hideEditNote();
                    break
                case 'en-confirm':
                    let newNote = this.$refs.editNote.getNewValue();
                    this.hideEditNote();
                    this.$emit('updateNote',newNote);
                    break
                case 'changePhoto':
                    this.toggleOverlay();
                    this.popup = 'changePhoto';
                    break
                case 'cp-cancel':
                    this.toggleOverlay();
                    this.popup = undefined;
                    break
                case 'cp-confirm':
                    const newPhoto = this.$refs.changePhoto.$refs.cpContent.getNewPhoto();
                    this.switchPhoto(newPhoto);
                    this.toggleOverlay();
                    this.popup = undefined;
                    break
                default:
                    this.$emit('btnClick',`content-${btn}`);
            }
        },
        showEditNote: function(note) {
            this.toggleOverlay();
            this.popup = 'editNote';
            this.note = note;
        },
        hideEditNote: function() {
            this.toggleOverlay();
            this.popup = undefined;
            this.note = undefined;
        },
        setBigPhotoDisplay: function() {
            if (this.cars[this.activeCar].photo) {
                document.getElementById('bigPhoto').style.backgroundSize = "cover";
            } else {
                document.getElementById('bigPhoto').style.backgroundSize = "contain";
            }
        },
        switchPhoto: function (photo) {
            if (!photo && this.cars[this.activeCar].photo) {

                // there is a photo and it has to be deleted and replaced by stock photo
                this.cars[this.activeCar].photo = false;

                document.getElementById('bigPhoto').style.backgroundImage = 'none';
                this.setBigPhotoDisplay();
                setStockCarImage('#bigPhoto');

                deleteCarPhoto(this.user, this.cars[this.activeCar].carCode);
            } else if (photo.name) {
                
                // a new photo was chosen
                this.cars[this.activeCar].photo = true;

                uploadCarPhoto(this.user, this.cars[this.activeCar].carCode, photo).then(() => {

                    document.getElementById('bigPhoto').style.backgroundImage = 'none';
                    this.setBigPhotoDisplay();
                    setPhoto(this.user, this.cars[this.activeCar], '#bigPhoto');
                });
            }
            saveData(this.user, this.cars);
        }
    }
}
</script>

<style scoped>
    #content {
        background-color: #312D3C;
        width: calc(100% - 2vw);
        height: 100%;
        box-shadow: 0px 1px 10px 1px #000;
        position: fixed;
        top: 0px;
        left: 1vw;
        z-index: 9;
        transition: height 0.1s;
        overflow: hidden;
    }
    .active {
        height: 98vh;
    }
</style>