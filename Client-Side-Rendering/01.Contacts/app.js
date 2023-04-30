import {html, render} from 'https://unpkg.com/lit-html?module';
import { contacts } from './contacts.js';

const root = document.getElementById('contacts');

const contactTemplate = (user) => html`
<div id="contacts">
<div class="contact card">
    <div>
        <i class="far fa-user-circle gravatar"></i>
    </div>
    <div class="info">
        <h2>Name: ${user.name}</h2>
        <button class="detailsBtn" @click=${ () => onDetails(user.id) } >Details</button>
        <div class="details" id=${user.id}>
            <p>Phone number: ${user.phoneNumber}</p>
            <p>Email: ${user.email}</p>
        </div>
    </div>
</div>
`;

render(contacts.map(contactTemplate), root)

function onDetails(id){
    const detailsDiv = document.getElementById(`${id}`);

    if(detailsDiv.style.display == 'block'){
        detailsDiv.style.display = 'none';
    } else {
        detailsDiv.style.display = 'block';
    }
}