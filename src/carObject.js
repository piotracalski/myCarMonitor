const Car = class {

    constructor(newCarId, carCode) {
      this.id = newCarId;
      this.carCode = carCode;
      this.photo = undefined
      this.info = [
        {
          panelTitle: 'General info',
          panelData: [
            {name:'make',title:'make',value:'n/a'},
            {name:'model',title:'model',value:'n/a'},
            {name:'productionYear',title:'production year',value:'n/a'},
            {name:'fuel',title:'fuel',value:'n/a'},
            {name:'mileAge',title:'mileage',value:'n/a',lastUpdate:'n/a',status:'unknown'}, // exeption
            {name:'engineDisplacement',title:'engine displacement',value:'n/a'},
            {name:'owner',title:'owner',value:'n/a'},
            {name:'coOwner',title:'co-owner',value:'n/a'},
            {name:'plates',title:'plates',value:'n/a'},
            {name:'policyCompany',title:'policy company',value:'n/a'},
            {name:'policyExpires',title:'policy expires',value:'n/a',status:'unknown'}
          ]
        },
        {
          panelTitle: 'Technical info',
          panelData: [
            {name:'nextTechnicalCheck',title:'next technical check',value:'n/a',status:'unknown'},
            {name:'motorOil',title:'motor oil',value:'n/a',status:'unknown'},
            {name:'motorOilMileage',title:'motor oil (mileage)',value:'n/a',status:'unknown'},
            {name:'oilFilter',title:'oil filter',value:'n/a',status:'unknown'},
            {name:'airFilter',title:'air filter',value:'n/a',status:'unknown'},
            {name:'cabinFilter',title:'cabin filter',value:'n/a',status:'unknown'},
            {name:'timingBelt',title:'timing belt',value:'n/a',status:'unknown'},
            {name:'tensioner',title:'tensioner',value:'n/a',status:'unknown'},
            {name:'waterPump',title:'water pump',value:'n/a',status:'unknown'},
            {name:'rollers',title:'rollers',value:'n/a',status:'unknown'},
            {name:'brakePads',title:'brake pads',value:'n/a',status:'unknown'},
            {name:'brakeDiscs',title:'brake discs',value:'n/a',status:'unknown'},
            {name:'brakeFluid',title:'brake fluid',value:'n/a',status:'unknown'}
          ]
        },
      ];
      this.status = 'unknown';
    }
  }

export {Car};