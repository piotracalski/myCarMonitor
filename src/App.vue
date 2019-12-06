<template>
  <div id="app">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <Header v-on:btnClick="headerButtons"/>
    <Board ref="board" :cars="cars"  v-on:showCar="showCar" :user="user"/>
    <Content ref="contentBox" :cars="cars" :activeCar="activeCar" :pageObject="pageObject" v-on:btnClick="contentButtons" :user="user"/>
    <BoardOverlay ref="boardOverlay"/>
    <AddNewCar ref="addNewCar"  v-on:btnClick="contentButtons"/>
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Board from './components/Board.vue'
import Content from './components/Content.vue'
import Footer from './components/Footer.vue'
import BoardOverlay from './components/BoardOverlay.vue'
import AddNewCar from './components/addNewCar/AddNewCar.vue'
import {Car} from './carObject.js'
import fs from 'fs'
import {
  setCarCode, 
  uploadCarPhoto, 
  deleteCarPhoto,
  getCarCodes,
  deleteUnusedPhotos,
  updateAllPhotos,
  getAllPhotos,
  saveData,
  saveAllPhotos
  } from './helpers.js'

export default {
  name: 'app',
  components: {
    Header,
    Board,
    Content,
    Footer,
    BoardOverlay,
    AddNewCar
  },
  data() {
    return {
      user: 'piotracalski',
      activeCar: [],
      cars: [],
      photosToSave: [],
      features: {
        make: {name: 'make', toBeVerified: false, infoPanel: 0, position: 0},
        model: {name: 'model', toBeVerified: false, infoPanel: 0, position: 1},
        productionYear: {name: 'productionYear', toBeVerified: false, infoPanel: 0, position: 2},
        fuel: {name: 'fuel', toBeVerified: false, infoPanel: 0, position: 3},
        mileAge: {name: 'mileAge', toBeVerified: true, infoPanel: 0, position: 4, warning: 3, alert: 30, unit: 'days'},
        engineDisplacement: {name: 'engineDisplacement', toBeVerified: false, infoPanel: 0, position: 5},
        owner: {name: 'owner', toBeVerified: false, infoPanel: 0, position: 6},
        coOwner: {name: 'coOwner', toBeVerified: false, infoPanel: 0, position: 7},
        plates: {name: 'plates', toBeVerified: false, infoPanel: 0, position: 8},
        policyCompany: {name: 'policyCompany', toBeVerified: false, infoPanel: 0, position: 9},
        policyExpires: {name: 'policyExpires', toBeVerified: true, infoPanel: 0, position: 10, warning: 14, unit: 'days'},
        nextTechnicalCheck: {name: 'nextTechnicalCheck', toBeVerified: true, infoPanel: 1, position: 0, warning: 14, unit: 'days'},
        motorOil: {name: 'motorOil', toBeVerified: true, infoPanel: 1, position: 1, warning: 7, alert: 365, unit: 'days'},
        motorOilMileage: {name: 'motorOilMileage', toBeVerified: true, infoPanel: 1, position: 2, warning: 1000, alert: 12000, unit: 'km'},
        oilFilter: {name: 'oilFilter', toBeVerified: true, infoPanel: 1, position: 3, warning: 7, alert: 365, unit: 'days'},
        airFilter: {name: 'airFilter', toBeVerified: true, infoPanel: 1, position: 4, warning: 7, alert: 365, unit: 'days'},
        cabinFilter: {name: 'cabinFilter', toBeVerified: true, infoPanel: 1, position: 5, warning: 7, alert: 365, unit: 'days'},
        timingBelt:  {name: 'timingBelt', toBeVerified: true, infoPanel: 1, position: 6, warning: 1000, alert: 15000, unit: 'km'},
        tensioner:  {name: 'tensioner', toBeVerified: true, infoPanel: 1, position: 7, warning: 1000, alert: 15000, unit: 'km'},
        waterPump:  {name: 'waterPump', toBeVerified: true, infoPanel: 1, position: 8, warning: 1000, alert: 15000, unit: 'km'},
        rollers:  {name: 'rollers', toBeVerified: true, infoPanel: 1, position: 9, warning: 1000, alert: 15000, unit: 'km'},
        brakePads:  {name: 'brakePads', toBeVerified: true, infoPanel: 1, position: 10, warning: 1000, alert: 15000, unit: 'km'},
        brakeDiscs:  {name: 'brakeDiscs', toBeVerified: true, infoPanel: 1, position: 11, warning: 1000, alert: 15000, unit: 'km'},
        brakeFluid:  {name: 'brakeFluid', toBeVerified: true, infoPanel: 1, position: 12, warning: 1000, alert: 30000, unit: 'km'}
      },
      pageObject: {
          contentBox: '#content'
      }
    }
  },
  created() {
    // load data from database
    this.loadData();

  },
  mounted() {
    const featuresList = Object.keys(this.features);
    // console.log(`Features: ${featuresList}`)

    if(this.cars.length > 0) {

      this.cars.forEach(car => {
        // console.log(`car ID: ${car.id}`)

        featuresList.forEach(feature => {
          // console.log(`feature: ${feature}, TBV: ${this.features[feature].toBeVerified}`)

          if (this.features[feature].toBeVerified) {

            this.checkStatus(this.features[feature],car.id);
          }
        });
      });
    }
  },
  methods: {
    headerButtons: function(btn) {

      // check if button is active
      let button = document.getElementById(`button-${btn}`);

      if(!Array.from(button.classList).includes('inactive')) {

        switch (btn) {
          
          case 'addNewCard':
            
            if(this.photosToSave.length < 2) {

              this.showNewCarDialog();
            } else {
              alert('Please, save previous changes before adding new car.');
            }
            break
          
          case 'saveData':
            saveData(this.user, this.cars);
  
            // TODO - need to add loader
            // TODO - nedd to add succes / fail info
            break
          
          case 'userProfile':  
            console.log('TODO');
            const carCodes = getCarCodes(this.cars);
            deleteUnusedPhotos(carCodes, this.user);
            break
          
          case 'logout': 
            console.log('TODO');
            this.getCarsData();
            break
            
          default:
            console.log('No action defined for this button');
        }
      }
    },
    contentButtons: function(btn) {

      switch (btn) {

        case 'content-en-cancel':

          // clear form
          this.$refs.contentBox.$refs.editNote.$refs.EnContent.resetForm();

          // hide dialog box
          this.$refs.contentBox.$refs.editNote.hide();

          // hide content overlay
           this.$refs.contentBox.$refs.contentOverlay.turnOff();

          break

        case 'content-en-confirm':

          // get new note obj
          let newNote = this.$refs.contentBox.$refs.editNote.getNewValue();
          console.log(newNote)
          
          console.log(this.features[newNote.name])
          // get feature and change its value
          this.cars[this.activeCar].info[this.features[newNote.name].infoPanel].panelData[this.features[newNote.name].position].value = newNote.value;

          // set last modified value if feature is mileage
          if(newNote.name === 'mileAge') {
            this.cars[this.activeCar].info[this.features[newNote.name].infoPanel].panelData[this.features[newNote.name].position].lastUpdate = this.getCurrentDate();
          }

          // clear form
          this.$refs.contentBox.$refs.editNote.$refs.EnContent.resetForm();

          // hide edit note dialog box
          this.$refs.contentBox.$refs.editNote.hide();

          // hide content overlay
          this.$refs.contentBox.$refs.contentOverlay.turnOff();

          if(this.features[newNote.name].toBeVerified) {

            // check feature status
            this.checkStatus(this.features[newNote.name],this.activeCar);
  
            // note - update feature status
            let newStatus = this.cars[this.activeCar].info[this.features[newNote.name].infoPanel].panelData[this.features[newNote.name].position].status;
            this.$refs.contentBox.$refs.carDetails[0].$refs.infoPanel[this.features[newNote.name].infoPanel].$refs.note[this.features[newNote.name].position].updateStatus(newStatus);

            // update features with 'km' unit
            let featuresList = Object.keys(this.features);
            // console.log(`Features: ${featuresList}`)

            featuresList.forEach(feature => {
              // console.log(`feature: ${feature}, TBV: ${this.features[feature].toBeVerified}`)

              if (this.features[feature].unit === 'km') {

                this.checkStatus(this.features[feature],this.activeCar);// note - update feature status
                let newStatus = this.cars[this.activeCar].info[this.features[feature].infoPanel].panelData[this.features[feature].position].status;
                this.$refs.contentBox.$refs.carDetails[0].$refs.infoPanel[this.features[feature].infoPanel].$refs.note[this.features[feature].position].updateStatus(newStatus);
  
              }
            });

            // check car status
            this.setCarStatus(this.activeCar);
          }

          break
    
        case 'anc-confirm':
    
          this.addNewCar();
    
          // reset form
          this.$refs.addNewCar.$refs.ancContent.resetForm();
    
          // hide addNewCar dialog box
          this.$refs.addNewCar.hide();
    
          // hide board overlay
          this.hideContent();
          break
            
        case 'content-deleteCar':
    
          // activate delete confirmation box
          // TODO
          let deletedCar = this.activeCar;
          let delCarCode = this.cars[deletedCar].carCode;
    
          // hide content
          this.hideContent();
    
          // delete active car
          this.cars.splice(deletedCar,1);
    
          // adjust IDs
          this.cars.forEach(car => {
    
            if (car.id > deletedCar) {
              this.adjustCarId(car.id);
            }          
          });
    
          // update each car status
          this.cars.forEach(car => {
            this.setCarStatus(car.id);
          });

          // delete photo
          deleteCarPhoto(this.user, delCarCode);
            // .then(() => {
            // getAllPhotos(this.user).then(photos => {
            //   const updatedPhotos = updateAllPhotos(photos, 'remove', delCarCode);
            //   saveAllPhotos(this.user, updatedPhotos);
            // });
            // });

          // save changes
          // user should be pre-informed about this action in delete confirmation box - TODO
          saveData(this.user, this.cars);
          break
            
        case 'content-hideContent':
    
          // hide content + board overlay
          this.hideContent();
          break
            
        case 'anc-cancel':
    
          // reset form
          this.$refs.addNewCar.$refs.ancContent.resetForm();
    
          // hide addNewCar dialog box
          this.$refs.addNewCar.hide();
    
          // hide board overlay
          this.hideContent();
          break
              
        default:
          console.log('No action defined for this button');
      }
    },
    loadData: async function() {
      
      let docRef = db.collection("piotracalski").doc("cars");

      let carsDb = [];

      let loadedData = new Promise(resolve => {

        docRef.get().then(function(doc) {

            if (doc.exists) {
              carsDb = doc.data().cars;
              resolve(carsDb)
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
      });

      let database = await loadedData;
      this.cars = await database;
      this.toggleLoader();

      return database
    },
    showNewCarDialog: function() {
      
      // show board overlay
      this.$refs.boardOverlay.turnOn();

      // show dialog box
      this.$refs.addNewCar.show();
    },
    addNewCar: function() {
      // console.log('add new car');
      // console.log(Car)

      // get new car ID
      let newCarId = this.cars.length;
      // console.log(`current number of cars is: ${lastCarId}`);

      // get car token
      let carCode = setCarCode();
      // console.log(carCode)

      // get form data
      let formData = this.$refs.addNewCar.$refs.ancContent.getFormData();
      // console.log(formData)

      // get new car make
      let carMake = formData[0];

      // get new car model
      let carModel = formData[1];

      // get new car photo
      let carPhoto;
      if (formData[2]) {
        carPhoto = true;
      } else {
        carPhoto = false;
      }

      // validate that carMake and carModel are not empty
      // if not add new car object
      // if (formData[0] !== '' && formData[1] !== '') {

        if(carPhoto) {

          // upload photo to database
          uploadCarPhoto(this.user, carCode, formData[2]).then(() => {

            // create new car object
            let newCar = new Car(newCarId, carCode);
      
            // push newCar to cars data object
            this.cars.push(newCar);
      
            // set carMake
            this.cars[newCarId].info[0].panelData[0].value = formData[0];
      
            // set carModel
            this.cars[newCarId].info[0].panelData[1].value = formData[1];
      
            // set photo
            this.cars[newCarId].photo = carPhoto;
      
            // set new cars status to unknown
            setTimeout(() => {
      
              this.$refs.board.$refs.card[newCarId].$refs.cardStatus.updateStatus('unknown');
            },100);
          }).then(() => {
            saveData(this.user, this.cars);
            // getAllPhotos(this.user).then(photos => {
            //   const updatedPhotos = updateAllPhotos(photos, 'add', carCode);
            //   saveAllPhotos(this.user, updatedPhotos);
            // });
          });
        }
    },
    adjustCarId: function(carId) {
      let currentCarId = this.cars[carId - 1].id;
      this.cars[carId - 1].id -= 1;
    },
    getCurrentDate: function() {
      let date = new Date();
      const months = ['1','2','3','4','5','6','7','8','9','10','11','12'];
      return `${date.getFullYear()}-${months[date.getMonth()]}-${date.getDate()}`
    },
    getTimeStamp: function(date) {
      date = new Date(date);
      return date.getTime();
    },
    calcDaysRemaining: function(date) {
      let currentTimeStamp = this.getTimeStamp(this.getCurrentDate());
      let timeStamp = this.getTimeStamp(date);
      let difference = Math.round((currentTimeStamp - timeStamp) / 86400000);
      return difference;
    },
    calcMileAgeDifference: function(carId,value) {
      return this.cars[carId].info[this.features['mileAge'].infoPanel].panelData[this.features['mileAge'].position].value - value;
    },
    toggleLoader: function() {

      document.getElementById('header-loader').classList.toggle('loading');
    },
    setCarStatus: function(carId) {

      // arr - array from features
      // fs - feature status array
      let arr = Object.keys(this.features);
      let fs = [];
      arr.forEach(feature => {

        if (this.features[feature].toBeVerified) {

          fs.push(this.cars[carId].info[this.features[feature].infoPanel].panelData[this.features[feature].position].status)
        }
      })

      let carStatus;
      if (fs.includes('unknown')) {

        carStatus = 'unknown';

      } else if (fs.includes('alert')) {

        carStatus = 'alert';

      } else if(fs.includes('warning')) {

        carStatus = 'warning';

      } else {

        carStatus = 'ok';

      }
      // console.log(carStatus)
      this.cars[carId].status = carStatus;
      // console.log(this.cars[carId].status)
      this.$refs.board.$refs.card[carId].$refs.cardStatus.updateStatus(carStatus);
    },
    setFeatureStatus: function(carId,status,feature) {
      // console.log(`feature: ${feature}, status: ${status}`)
      this.cars[carId].info[this.features[feature].infoPanel].panelData[this.features[feature].position].status = status;

      // update card status bar in cardStatus component
      // this.$refs.board.$refs.card[0].$refs.cardStatus.updateStatus(status);
    },
    checkStatus: function(feature,carId) {
      // console.log(`feature: ${feature.name}, unit: ${feature.unit}, alert: ${feature.alert}, warning: ${feature.warning}`);
      // console.log(`car ID: ${carId}`)

      // get value
      // mileAge feature is an exeption => lastUpdate property is verified, not value
      let value;
      if(feature.name === 'mileAge') {
        value = this.cars[carId].info[feature.infoPanel].panelData[feature.position].lastUpdate;
      } else {
        value = this.cars[carId].info[feature.infoPanel].panelData[feature.position].value;
      }

      let difference;
      let status;

      // check unit days / km
      switch (feature.unit) {

        case 'days':

          // difference = currentValue - value
          difference = this.calcDaysRemaining(value);
          // console.log(difference)

          // for days: check if alert === true
          if (feature.alert) {

            // console.log(`difference: ${difference}, feature.alert: ${feature.alert}`)

            // check difference
            if (difference >= feature.alert) {

              // console.log(`difference >= feature.alert: ${difference >= feature.alert}`)
              
              // status "alert"
              status = 'alert';
              // console.log(status)

            } else if (difference >= feature.alert - feature.warning) {

              // status: "warning"
              status = 'warning';

            } else {

              // status: "ok"
              status = 'ok';
            }           
           
          // alert === false:
          } else if (!feature.alert) {   
            
            // console.log(difference)
            // console.log(-1 * feature.warning)

            // check difference
            if(difference > 0) {

              // difference > 0: status 'alert'
              status = 'alert';

            } else if (difference >= -1 * feature.warning) {
              
              // difference >= -warning: status 'warning'
              status = 'warning';

            } else {

              // else status 'ok'
              status = 'ok';

            }
            
          } else {
            console.log('DB ERROR')
          }
          break

        case 'km':
          // for km: 
          // calc difference
          difference = this.calcMileAgeDifference(carId,value);

          // check difference
          if(difference >= feature.alert) {
            
            // difference >= alert => status="alert"
            status = 'alert';

          } else if (difference >= feature.alert - feature.warning) {

            // difference >= alert - warning => status = "warning"
            status = 'warning';

          } else {

            // else => status = "ok"
            status = 'ok';

          }
          break

        default:
          console.log('DB ERROR')
      }
      // console.log(`status: ${status}`)
      this.setFeatureStatus(carId,status,feature.name);
    },
    changeActiveCar: function(action,id) {
      // console.log(`Active car is: ${this.activeCar}`)

      if(action === 'set') {
        this.activeCar = `${id}`;
      } else if (action === 'delete') {
        this.activeCar = [];
      } else {
        console.log('An error occured when trying to show / hide content.')
      }
    },
    showCar: function(id) {

      // console.log(this.cars[id].id)

      if(document.querySelector('#content').classList.contains('active') === false) {

        this.$refs.contentBox.show(id);

        this.$refs.boardOverlay.turnOn();

        this.changeActiveCar('set',id);
      }
    },
    hideContent: function() {
      
      // hide content
      this.$refs.contentBox.hide();

      // reset active car
      this.changeActiveCar('delete',null);

      // hide board overlay
      this.$refs.boardOverlay.turnOff();
    },
    getCarsData: function() {
      console.log(this.cars)
    }
  }
}
</script>

<style>
  /* colour palette - dark bg #100E17 / light bg #312D3C / light grey #5d5974 / headings #f7f7f7 / paragraphs #C2C2C2 / orange #F56C1A / purple #DF2B53 / green #41B883 */
  body {
    background-color: #100E17;
  }
  #app {
    background-color: #100E17;
    position: absolute;
    margin: 0 auto;
    top: 0px;
    left: 0px;
    width: 98vw;
    min-height: 100vh;
    overflow-x: hidden;
  }
</style>