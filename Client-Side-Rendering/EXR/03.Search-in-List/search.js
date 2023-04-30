import {html, render} from 'https://unpkg.com/lit-html?module';
import { towns } from './towns.js';

const townTemplate = (town, match) => html`
   <li class=${match && town.toLowerCase().includes(match.toLowerCase()) ? 'active' : ''}>${town}</li>
`;

const root = document.querySelector('#towns');
const inputArea = document.querySelector('#searchText');
const resultEl = document.querySelector('#result');

document.querySelector('button').addEventListener('click', onSearch);

const ul = document.createElement('ul')

render(towns.map(town => townTemplate(town)), ul)

root.replaceChildren(ul)

function onSearch() {
   const match = inputArea.value;


   render(towns.map(town => townTemplate(town, match)), ul);
   inputArea.value = '';

   resultEl.textContent = `${getMatchesCount(match)} matches found`;
}

function getMatchesCount(match){
   let counter = 0;

   towns.forEach(town => {
      if(town.toLowerCase().includes(match.toLowerCase())) {
         counter++;
      }
   });

   return counter;
}



