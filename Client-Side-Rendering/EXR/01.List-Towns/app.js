import {html, render} from 'https://unpkg.com/lit-html?module';

const root = document.querySelector('#root');
const form = document.querySelector('form');

form.addEventListener('submit', onSubmit);

function onSubmit(e){
    e.preventDefault();
    const formData = new FormData(form);
    const content = formData.get('towns');
    form.reset();
    const towns = content.split(', ');

    render(ulTemplate(towns), root);
}

const ulTemplate = (towns) => html`
<ul>
${towns.map(town => html`<li>${town}</li>`)}
</ul>
`

