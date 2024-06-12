start();

function start() {
    console.log('before promise');

    const p = new Promise(executor);

    p.then(data => console.log('data', data)).catch(err => console.error('err', err));

    console.log('after promise');
}

function executor(resolve, reject) {
    setTimeout(() => {
        resolve('data from promise');
    }, 2000);
}