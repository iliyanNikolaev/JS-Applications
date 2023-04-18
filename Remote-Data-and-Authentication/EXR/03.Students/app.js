const URL = 'http://localhost:3030/jsonstore/collections/students';

async function solve() {
    const response = await fetch(URL);
    const data = await response.json();
    const submitBtn = document.getElementById('submit');

    Object.values(data).forEach(x => {
        renderRow(x);
    })

    submitBtn.addEventListener('click', createStudent);
}

solve();

function renderRow(x) {
    const container = document.querySelector('#results tbody');
    const tr = createElement('tr', undefined, container);
    const firstNameTd = createElement('td', x.firstName, tr);
    const lastNameTd = createElement('td', x.lastName, tr);
    const fNumTd = createElement('td', x.facultyNumber, tr);
    const gradeTd = createElement('td', x.grade, tr);
}

async function createStudent(e) {
    e.preventDefault();
    const form = document.querySelector('#form');
    const data = new FormData(form);
    const firstName = data.get('firstName');
    const lastName = data.get('lastName');
    const fNum = data.get('facultyNumber');
    const grade = data.get('grade');

    if (firstName !== '' && lastName !== '' && fNum !== '' && grade !== '') {
        const body = {
            firstName,
            lastName,
            facultyNumber: fNum,
            grade
        }

        await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })

        renderRow(body);
    }
}

function createElement(type, content, appender) {
    let el = document.createElement(type);
    if (content !== undefined) {
        el.textContent = content;
    }
    appender.appendChild(el);

    return el;
}