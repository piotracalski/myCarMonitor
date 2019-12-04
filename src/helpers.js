// ADD NEW CAR FUNCTIONS
    // setCarCode

export const setCarCode = () => {
    let carCode = '';
    let randomChar;
    let characters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    for(let i = 1; i <= 10; i++) {
        randomChar = characters[Math.floor(Math.random()*characters.length)];
        carCode += randomChar;
    }
    return carCode;
};

// PHOTO FUNCTIONS
    // uploadCarPhoto
    // getCarPhoto
    // setPhoto
    // deleteCarPhoto

export const uploadCarPhoto = (user, carCode, photo) => {
    return new Promise(resolve => {
        const storageRef = storage.ref().child(`CarPhoto/${user}/${carCode}`);
        const file = photo; 
        storageRef.put(file).then(() => {
          console.log('File uploaded!');
          resolve();
        });
    })
};

export const getCarPhoto = (user, car) => {
    return new Promise(resolve => {
        const storageRef = storage.ref(`CarPhoto/${user}/${car.carCode}`);
        storageRef.getDownloadURL().then(url => {
            resolve(url)
        });
    });
};

export const setPhoto = (user, car, element) => {
    getCarPhoto(user, car).then(url => {
        document.querySelector(element).style.backgroundImage = `url(${url})`;
    });
};

export const deleteCarPhoto = (user, carCode) => {
    let storageRef = storage.ref().child(`CarPhoto/${user}/${carCode}`);
    storageRef.delete().then(() => {
      // File deleted successfully
      console.log('file deleted');
    }).catch(function(error) {
        console.log('Error occured')
        console.log(error);
    });
    
};