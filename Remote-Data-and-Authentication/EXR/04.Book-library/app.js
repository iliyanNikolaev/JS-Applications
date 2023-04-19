const loadBtnEl = document.getElementById('loadBooks');
const container = document.getElementById('books-container');
const URL = `http://localhost:3030/jsonstore/collections/books`;
const createFormEl = document.getElementById('create-form');
const createInputTitleEl = document.getElementById('create-input-title');
const createInputAuthorEl = document.getElementById('create-input-author');
const editFormEl = document.getElementById('edit-form');
const editInputTitleEl = document.getElementById('edit-input-title');
const editInputAuthorEl = document.getElementById('edit-input-author');


loadBtnEl.addEventListener('click', loadHandler);

async function loadHandler() {
    const response = await fetch(URL);
    const data = await response.json();

    Object.entries(data).forEach(x => {
        renderRow(x);
    })

    const submitBtn = document.getElementById('create-submit-btn');
    submitBtn.addEventListener('click', createHandler);
}

async function createHandler(e) {
    e.preventDefault();
    const formData = new FormData(createFormEl);
    const author = formData.get('author');
    const title = formData.get('title');

    if (author !== '' && title !== '') {
        const body = {
            author,
            title
        }

        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        const newRecord = await response.json();

        const x = [newRecord._id, { author: newRecord.author, title: newRecord.title }];

        renderRow(x);

        createInputTitleEl.value = '';
        createInputAuthorEl.value = '';
    }
}

function editHandler(e) {
    createFormEl.style.display = 'none';
    editFormEl.style.display = 'block';
    const id = e.target.className;
    const rowEl = e.target.parentElement.parentElement;
    const originalTitle = rowEl.querySelector('.table-data-title').textContent;
    const originalAuthor = rowEl.querySelector('.table-data-author').textContent;
    const submitBtn = document.getElementById('edit-save-btn');
    editInputTitleEl.value = originalTitle;
    editInputAuthorEl.value = originalAuthor;

    submitBtn.addEventListener('click', async function update(event) {
        event.preventDefault();

        const formData = new FormData(editFormEl);
        const editedTitle = formData.get('edited-title');
        const editedAuthor = formData.get('edited-author');

        const body = {
            author: editedAuthor,
            title: editedTitle
        }

        if (editedAuthor !== '' && editedTitle !== '') {
            const response = await fetch(`${URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },

                body: JSON.stringify(body)
            });

            const data = await response.json();

            rowEl.querySelector('.table-data-title').textContent = editedTitle;
            rowEl.querySelector('.table-data-author').textContent = editedAuthor;
            editInputAuthorEl.value = '';
            editInputTitleEl.value = '';
            createFormEl.style.display = 'block';
            editFormEl.style.display = 'none';
            submitBtn.removeEventListener('click', update);
        }
    });
}

async function deleteHandler(e) {
    const rowEl = e.target.parentElement.parentElement;
    const id = e.target.className;
    await fetch(`${URL}/${id}`, { method: 'DELETE' });
    rowEl.remove();
}

function renderRow(x) {
    const id = x[0];
    const data = x[1];
    const tr = createElement('tr', undefined, container);
    const tdTitle = createElement('td', data.title, tr);
    tdTitle.className = 'table-data-title';
    const tdAuthor = createElement('td', data.author, tr);
    tdAuthor.className = 'table-data-author';
    const tdBtns = createElement('td', undefined, tr);
    const editBtn = createElement('button', 'Edit', tdBtns);
    editBtn.className = id;
    const deleteBtn = createElement('button', 'Delete', tdBtns);
    deleteBtn.className = id;

    editBtn.addEventListener('click', editHandler);
    deleteBtn.addEventListener('click', deleteHandler);
}

function createElement(type, content, appender) {
    const el = document.createElement(type);

    if (content !== undefined) {
        el.textContent = content;
    }

    appender.appendChild(el);

    return el;
}
