import { html, render } from 'https://unpkg.com/lit-html?module';

const tableRowTemplate = (user, match) => html`
${match && user.firstName.toLowerCase().includes(match)
      || user.lastName.toLowerCase().includes(match)
      || user.email.toLowerCase().includes(match)
      || user.course.toLowerCase().includes(match)
      ? html`<tr class="select">
            ${tableDataTemplate(user)}
         </tr>`
      : html`<tr>
            ${tableDataTemplate(user)}
         </tr>`
   }`

const tableDataTemplate = (user) => html`
<td>${user.firstName} ${user.lastName}</td>
<td>${user.email}</td>
<td>${user.course}</td>`;


const url = 'http://localhost:3030/jsonstore/advanced/table';

const tbody = document.querySelector('tbody');

const searchFieldEl = document.querySelector('#searchField');

document.querySelector('#searchBtn').addEventListener('click', onClick);

let users = [];

init(); // Start app

async function init() {
   const data = await request('get', url);
   users = Object.values(data);
   render(users.map(tableRowTemplate), tbody);
}

function onClick() {
   const match = searchFieldEl.value;
   if (match != '') {
      render(users.map(user => tableRowTemplate(user, match)), tbody);
      searchFieldEl.value = '';
   }
}

async function request(method, url, data) {
   const options = {
      method,
      headers: {},
   }
   if (data != undefined) {
      options.headers['Content-Type'] = 'application/json';
      options['body'] = JSON.stringify(data);
   }
   try {
      const response = await fetch(url, options);
      if (response.ok != true) {
         const error = response.json();
         throw new Error(error.message);
      }
      if (response.status == 204) {
         const error = response.json();
         throw new Error('204 - No content!');
      }

      return response.json();
   } catch (err) {
      alert(err.message);
   }
}