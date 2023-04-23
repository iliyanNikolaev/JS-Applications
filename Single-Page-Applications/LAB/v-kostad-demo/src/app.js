const main = document.querySelector('#main');
document.querySelector('#navigation').addEventListener('click', onNavigate);
showSection('#home-page-section');

function onNavigate(e){
    if(e.target.tagName === 'BUTTON'){

        switch(e.target.id){
            case 'home':
                showSection('#home-page-section');
                break;
            case 'catalog':
                showSection('#catalog-section');
                break;
            case 'about':
                showSection('#about-section');
                break;
        }
    }
}

function showSection(sectionId){
    document.querySelectorAll('section').forEach(s => s.style.display = 'none');

    document.querySelector(sectionId).style.display = '';
}