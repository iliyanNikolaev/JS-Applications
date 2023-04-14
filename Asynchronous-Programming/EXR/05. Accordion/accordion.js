function solution() {
    let headDivsUrl = 'http://localhost:3030/jsonstore/advanced/articles/list';
    let detailsUrl = 'http://localhost:3030/jsonstore/advanced/articles/details/'
    let container = document.getElementById('main');

    fetch(headDivsUrl)
        .then(res => res.json())
        .then(data => {
            for (const el in data) {
                let dataObj = data[el];

                let accordionDiv = createElement('div', undefined, 'accordion');
                let headDiv = createElement('div', undefined, 'head');
                let titleSpan = createElement('span', dataObj.title);
                let btn = createElement('button', 'More', 'button');
                btn.setAttribute('id', dataObj._id);
                let hiddenDiv = createElement('div', undefined, 'extra');
                let p = document.createElement('p');

                accordionDiv.appendChild(headDiv);
                headDiv.appendChild(titleSpan);
                headDiv.appendChild(btn);
                accordionDiv.appendChild(hiddenDiv);
                hiddenDiv.appendChild(p);

                container.appendChild(accordionDiv);

                btn.addEventListener('click', (e) => {
                    let currId = e.target.id;

                    fetch(`${detailsUrl}${currId}`)
                        .then(res => res.json())
                        .then(data => {
                            const currContainer = e.target.parentElement.parentElement;

                            const contentContainer = currContainer.querySelector('p');

                            contentContainer.textContent = data.content;

                            let hidden = currContainer.querySelector('.extra');

                            if (e.target.textContent === 'More') {
                                hidden.style.display = 'inline-block';
                                e.target.textContent = 'Less'
                            } else {
                                hidden.style.display = 'none';
                                e.target.textContent = 'More'
                            }

                        })
                        .catch(err => { console.log(err) });
                });
            }
        })
        .catch(err => { console.log(err) });

    function createElement(type, content, nameClass) {
        let el = document.createElement(type);

        if (content !== undefined) {
            el.textContent = content;
        }

        if (nameClass !== undefined) {
            el.className = nameClass;
        }

        return el;
    }
}

solution();