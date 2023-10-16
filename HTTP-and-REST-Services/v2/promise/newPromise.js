function executor(resolve, reject) {
    console.log('Promise starting');

    setTimeout(() => {
        // resolve('{"data": "this is dummy data"}');
        reject(new Error('C1000. No network access :('));
    }, 2000);

    console.log('Promise ended');
}

const promise = new Promise(executor);
promise
    .then(data => console.log(data))
    .catch(err => console.error(`Error occurred: ${err.message}`));
