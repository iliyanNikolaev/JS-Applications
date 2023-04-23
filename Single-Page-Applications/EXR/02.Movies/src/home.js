const homePage = document.getElementById('home-page');
const container = document.querySelector('.card-deck.d-flex.justify-content-center');
const navigation = document.getElementById('navigation');
const welcomeMessage = document.querySelector('span')

export function viewHomePage() {

    homePage.style.display = 'block';

    const userNav = navigation.querySelectorAll('.nav-link.user');
    const guestNav = navigation.querySelectorAll('.nav-link.guest');
    const userData = sessionStorage.userData;

    if (userData === undefined) {
        guestNav.forEach(x => x.style.display = 'inline-block');
        userNav.forEach(x => x.style.display = 'none');
    } else {
        guestNav.forEach(x => x.style.display = 'none');
        userNav.forEach(x => x.style.display = 'inline-block');

        const parsedUserData = JSON.parse(userData);
        welcomeMessage.textContent = parsedUserData.email;
    }

    renderMovies();
}

async function renderMovies() {
    container.innerHTML = '';
    const fragment = document.createDocumentFragment();
    const data = await getMovies();
    data.forEach(m => {

        fragment.appendChild(createMovieCard(m));
    });

    container.appendChild(fragment);
}

async function getMovies() {
    const url = 'http://localhost:3030/data/movies';

    const response = await fetch(url);
    const data = await response.json();

    return data;
}

function createMovieCard(movie) {
    const div = document.createElement('div');
    div.className = 'card mb-4';

    div.innerHTML = `
<img class="card-img-top" src="${movie.img}"
alt="Card image cap" width="400">
<div class="card-body">
<h4 class="card-title">${movie.title}</h4>
</div>
<div class="card-footer">
<a href="#/details/6lOxMFSMkML09wux6sAF">
    <button data-id="${movie._id}" type="button" class="btn btn-info">Details</button>
</a>
</div>
    `
    return div;
}
