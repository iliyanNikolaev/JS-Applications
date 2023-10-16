const input = document.querySelector('#username');
const btn = document.querySelector('#loadRepos');
const list = document.querySelector('#list');
const error = document.querySelector('#error');

btn.addEventListener('click', loadRepos);

function loadRepos() {
    fetch(`https://api.github.com/users/${input.value}/repos`)
        .then(res => res.json())
        .then(data => {
            list.innerHTML = '';
            if(data.length == 0) {
                showError('This user no have any repos');
            }
            data.map(x => appendLi(x));
        })
        .catch(err => {
            showError('Wrong username');
        });
}

function appendLi(repo) {
    const li = document.createElement('li');
    li.innerHTML = `<a href='${repo.html_url}' target='_blank'>${repo.name}</a>`;
    list.appendChild(li);
}

function showError(text) {
    list.innerHTML = '';
    error.textContent = text;
    setTimeout(() => {
        error.textContent = '';
    }, 5000);
}