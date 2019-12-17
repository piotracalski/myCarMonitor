import {
    dbVariables,
    storageVariables,
    selectors
} from './variables.js'

// GENERAL FUNCTIONS
    // setCarCode
    // getCarCodes
    // getUserDocRef
    // removeFromArray

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

export const getCarCodes = carsDb => {
    let carCodes = [];
    carsDb.forEach(car => {
        carCodes.push(car.carCode);
    });
    return carCodes;
};

const getUserDocRef = (user,doc) => {
    return db.collection(user).doc(doc);
};

const removeFromArray = (arr, val) => {
    return arr.filter(el => {
        return el !== val;
    });
};

// PHOTO FUNCTIONS
    // uploadCarPhoto
    // getCarPhoto
    // setPhoto
    // getStockCarImage
    // deleteCarPhoto
    // getAllPhotos - unused
    // updateAllPhotos - unused
    // deleteUnusedPhotos - unused

export const uploadCarPhoto = async (user, carCode, photo) => {
    return new Promise(resolve => {
        const storageRef = storage.ref().child(`${storageVariables.mainFolder}/${user}/${carCode}`);
        const file = photo; 
        storageRef.put(file).then(() => {
          console.log(`File ${carCode} uploaded!`);
          resolve();
        });
    })
};

export const getCarPhoto = (user, car) => {
    return new Promise(resolve => {
        const storageRef = storage.ref(`${storageVariables.mainFolder}/${user}/${car.carCode}`);
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

const getStockCarImage = () => {
    return new Promise(resolve => {
        const storageRef = storage.ref(`${storageVariables.mainFolder}/${storageVariables.stockImages}/${storageVariables.stockPhoto}`);
        storageRef.getDownloadURL().then(url => {
            resolve(url)
        });
    });
};

export const setStockCarImage = element => {
    getStockCarImage().then(url => {
        document.querySelector(element).style.backgroundImage = `url(${url})`;
    });
}

export const deleteCarPhoto = (user, carCode) => {
    return new Promise(resolve => {
        let storageRef = storage.ref().child(`${storageVariables.mainFolder}/${user}/${carCode}`);
        storageRef.delete().then(() => {
            console.log(`File ${carCode} deleted`);
            resolve();
        }).catch(function(error) {
            console.log(`Error occured when tried to delete ${carCode} file :(`)
            console.log(error);
        });
    });
};

export const getAllPhotos = user => {
    return new Promise(resolve => {
        let allPhotos;
        const docRef = getUserDocRef(user, `${dbVariables.photos}`);
        docRef.get().then(function(doc) {
        
            if (doc.exists) {
                allPhotos = doc.data();
                resolve(allPhotos.photos);
            } else {
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    });
};

export const updateAllPhotos = (photos, mode, carCode) => {   
    if (mode === 'add') {
        photos.push(carCode);
    } else if (mode === 'remove') {
        photos = removeFromArray(photos, carCode)
    }
    return photos;
};

export const deleteUnusedPhotos = async (carCodes, user) => {
    let allPhotos = await getAllPhotos(user);
    let newArr = allPhotos;
    // console.log(`AllPhotos: ${allPhotos}`);
    // console.log(`CarCodes: ${carCodes}`);
    try {
        allPhotos.forEach(photo => {
            if(!carCodes.includes(photo)) {
                deleteCarPhoto(user, photo).then(() => {
                    removeFromArray(newArr, photo); //doesn't work
                    saveAllPhotos(user, newArr);
                });
            }
        });
    } finally {
        // console.log(`user: ${user}`)
        // console.log(`allPhotos: ${allPhotos}`)
        // saveAllPhotos(user, allPhotos);
    }
};

// LOADING / SAVING FUNCTIONS
    // saveData
    // saveAllPhotos

export const saveData = (user, carsDb) => {
    db.collection(user).doc(dbVariables.cars).set({
        cars: JSON.parse(JSON.stringify(carsDb))
    });
    toggleSaveSuggest('off');
};

export const saveAllPhotos = (user, photosDb) => {
    try {
        db.collection(user).doc(dbVariables.photos).set({
            photos: JSON.parse(JSON.stringify(photosDb))
        });
    } catch {
        console.log(`Error occured when saving ${photosDb} for user: ${user}`)
    }
};

export const toggleSaveSuggest = mode => {
    const saveBtn = document.getElementById(selectors.saveBtn);
    if (mode === 'on') {
        if (!Array.from(saveBtn.classList).includes(selectors.saveSuggest)) {
            saveBtn.classList.add(selectors.saveSuggest);
        }
    } else if (mode === 'off') {
        saveBtn.classList.remove(selectors.saveSuggest);
    }
}