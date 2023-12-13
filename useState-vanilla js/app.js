import { useState } from "./useState.js";

//dom elements
const decrementBTN = document.querySelector('#decrement_btn');
const resetBTN = document.querySelector('#reset_btn');
const incrementBTN = document.querySelector('#increment_btn');

const valueContainer = document.querySelector('#count_value');

// useState implemented with js
const [ getCount, setCount, subscribe ] = useState(0);

valueContainer.textContent = getCount();

subscribe(countChange);
function countChange() {
    valueContainer.textContent = getCount();
}

// attach event listeners
decrementBTN.addEventListener('click', decrementCount);
resetBTN.addEventListener('click', resetCount);
incrementBTN.addEventListener('click', incrementCount);

// utils
function incrementCount() {
    let prev = getCount();
    prev++;    
    setCount(prev);
}

function decrementCount() {
    let prev = getCount();
    prev--;    
    setCount(prev);
}

function resetCount() {
    setCount(0);
}


