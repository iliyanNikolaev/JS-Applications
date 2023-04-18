const URL = 'http://localhost:3030/jsonstore/phonebook';
const ul = document.getElementById('phonebook');
const loadBtn = document.getElementById('btnLoad');
const createBtn = document.getElementById('btnCreate');
const personInputEl = document.getElementById('person');
const phoneInputEl = document.getElementById('phone');

function attachEvents() {
    loadBtn.addEventListener('click', loadHandler);
    createBtn.addEventListener('click', createHandler)
}

async function loadHandler(){
    let response = await fetch(URL);
    let data = await response.json();
    ul.innerHTML = '';
    Object.values(data).forEach(x => {
        const li = createElement('li', `${x.person}: ${x.phone}`, ul);
        const deleteBtn = createElement('button', 'Delete', li);
        deleteBtn.id = x._id;

        deleteBtn.addEventListener('click', deleteHandler);
    });
}

async function createHandler(){
    const person = personInputEl.value;
    const phone = phoneInputEl.value;
    const body = {
        person,
        phone
    }

    if(person !== '' && phone !== ''){
        await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    
        loadBtn.click();
        personInputEl.value = '';
        phoneInputEl.value = '';
    }
}

async function deleteHandler(e){
    const id = e.currentTarget.id;
    const containerEl = e.currentTarget.parentElement;
    
    await fetch(`${URL}/${id}`, { method: 'DELETE' });
    
    containerEl.remove();
    loadBtn.click();
}

function createElement(type, content, appender){
    let el = document.createElement(type);
    el.textContent = content;
    appender.appendChild(el);

    return el;
}

attachEvents();