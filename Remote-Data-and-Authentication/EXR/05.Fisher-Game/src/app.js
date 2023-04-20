let userData = undefined;

window.addEventListener('DOMContentLoaded', () => {
    const userDataJSON = sessionStorage.userData;

    if(userDataJSON !== undefined){
        userData = JSON.parse(userDataJSON);
        document.getElementById('guest').style.display = 'none';
        document.querySelector('#addForm .add').disabled = false;
        document.querySelector('span').textContent = `${userData.username}`;
    } else {
        document.getElementById('user').style.display = 'none';
        document.querySelector('span').textContent = 'Guest';
    }

    document.querySelector('button[class="load"]').addEventListener('click', loadHandler);
    const form = document.getElementById('addForm').addEventListener('submit', createHandler);
})

async function createHandler(e){
    e.preventDefault();

    let formData = new FormData(e.target);
    
    let body = {
        angler: formData.get('angler'),
        weight: formData.get('weight'),
        species: formData.get('species'),
        location: formData.get('location'),
        bait: formData.get('bait'),
        captureTime: formData.get('captureTime')
    }
    try{
        for (const key in body) {
            if(body[key] == ''){
                throw new Error('All fields must be filled!')
            }
        }

        const response = await fetch('http://localhost:3030/data/catches', {
            method: 'post',
            headers:{
                'Content-Type': 'application/json',
                'X-Authorization': `${userData.token}`
            },
            body: JSON.stringify(body)
        })

        if(response.ok !== true){
            throw new Error(response.message);
        }

        const data = await response.json();

        renderEl(data);
        loadHandler();
        e.target.reset();
    } catch(err) {
        alert(err.message);
    }
}

async function loadHandler(){
    const response = await fetch('http://localhost:3030/data/catches');
    const data = await response.json();

    const container = document.getElementById('catches');
    container.innerHTML = '';
    data.forEach(element => {
        container.appendChild(renderEl(element));
    });
}

function renderEl(x){
    const isOwner = userData !== undefined && x._ownerId === userData.id;
    const el = document.createElement('div');
    el.className = 'catch';
    el.innerHTML = `<label>Angler</label>
        <input type="text" class="angler" value="${x.angler}"  ${!isOwner ? 'disabled': ''}>
        <label>Weight</label>
        <input type="text" class="weight" value="${x.weight}"  ${!isOwner ? 'disabled': ''}>
        <label>Species</label>
        <input type="text" class="species" value="${x.species}"  ${!isOwner ? 'disabled': ''}>
        <label>Location</label>
        <input type="text" class="location" value="${x.location}"  ${!isOwner ? 'disabled': ''}>
        <label>Bait</label>
        <input type="text" class="bait" value="${x.bait}"  ${!isOwner ? 'disabled': ''}>
        <label>Capture Time</label>
        <input type="number" class="captureTime" value="${x.captureTime}"  ${!isOwner ? 'disabled': ''}>
        <button class="update" data-id="${x._id}"  ${!isOwner ? 'disabled': ''}>Update</button>
        <button class="delete" data-id="${x._id}"  ${!isOwner ? 'disabled': ''}>Delete</button>`

    return el;
}