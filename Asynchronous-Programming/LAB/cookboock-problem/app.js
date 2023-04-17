function main() {
    const mainEl = document.querySelector('main');
    mainEl.innerHTML = '';

    const recipesURL = 'http://localhost:3030/jsonstore/cookbook/recipes';

    fetch(recipesURL)
        .then(res => res.json())
        .then(data => {
            for (const el in data) {
                const recipe = data[el];

                let article = createElement('article', 'preview');
                let titleDiv = createElement('div', 'title');
                let h2 = createElement('h2', undefined, recipe.name);
                let picDiv = createElement('div', 'small');
                let img = document.createElement('img');
                img.src = recipe.img;

                article.appendChild(titleDiv);
                titleDiv.appendChild(h2);
                article.appendChild(picDiv);
                picDiv.appendChild(img);
                mainEl.appendChild(article);

                article.addEventListener('click', (e) => {
                    let detailsURL = `http://localhost:3030/jsonstore/cookbook/details/${recipe._id}`
                    
                    fetch(detailsURL)
                        .then(res => res.json())
                        .then(data => {
                            article.innerHTML = '';
                            
                            let div1 = createElement('div', 'band');
                            let div2 = createElement('div', 'thumb');
                            let div3 = createElement('div', 'ingredients');
                            let h3Ingr= createElement('h3', undefined, 'Ingredients:');
                            let ul = document.createElement('ul');
                            data.ingredients.forEach(x => {
                                let li = createElement('li', undefined, `${x}`);
                                ul.appendChild(li);
                            });
                            let div4 = createElement('div', 'description');
                            let h3Descr = createElement('h3', undefined, 'Preparation:');
                            div4.appendChild(h3Descr);
                            data.steps.forEach(x => {
                                let p = createElement('p', undefined, `${x}`);

                                div4.appendChild(p);
                            });
                            console.log(div4);
                            article.appendChild(h2);
                            article.appendChild(div1);
                            div1.appendChild(div2);
                            div1.appendChild(div3);
                            div2.appendChild(img);
                            div3.appendChild(h3Ingr);
                            div3.appendChild(ul);
                            article.appendChild(div4);
                        })
                });
            }
        });
}

main();

function createElement(type, nameClass, content){
    let el = document.createElement(type);

    if(nameClass !== undefined){
        el.className = nameClass;
    }

    if(content !== undefined){
        el.textContent = content;
    }

    return el;
}
