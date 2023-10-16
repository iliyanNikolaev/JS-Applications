function createRandomPromise() {
    const promise = new Promise((resolve, reject) => {
        const random = Math.random();

        if(random <= 0.5) {
            resolve('Promise resolved, the number is: ' + random);
        } else {
            reject(new Error('Promise rejected, the number is: ' + random));
        }
    });

    return promise;
}

function start() {
    console.log('function started');
    createRandomPromise()
        .then(result => console.log(result))
        .catch(error => console.log(error.message));
    console.log('function ended');
}

start();