let wedding = new Promise((resolve, reject) => {

    setTimeout(() => {
        if(Math.random() > 0.5){
            resolve('Yes!');
        } else {
            reject('No!');
        }
    }, 2000)
});

wedding.then((result) => {
    console.log(result);
});

wedding.catch((reason) => {
    console.log(reason);
});