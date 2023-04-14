function attachEvents() {
    const button = document.getElementById('submit');
    const inputLocationEl = document.getElementById('location');
    const baseUrl = 'http://localhost:3030/jsonstore/forecaster';
    const forecastContainer = document.getElementById('forecast');
    const currentEl = document.getElementById('current');
    const upcomingEl = document.getElementById('upcoming');
    const symbols = {
        "Sunny": "&#x2600",
        "Partly sunny": "&#x26C5",
        "Overcast": "&#x2601",
        "Rain": "&#x2614"
    }
    button.addEventListener('click', () => {
        let locations = {};
        let inputLocation = inputLocationEl.value;
        fetch(`${baseUrl}/locations`)
            .then(res => res.json())
            .then(data => {
                locations = data;
                let searchedIndex = locations.findIndex(el => el.name === inputLocation);
                forecastContainer.style.display = 'block';

                if(searchedIndex !== -1){
                    let code = locations[searchedIndex].code;

                    fetch(`${baseUrl}/today/${code}`)
                        .then(res => res.json())
                        .then(currentData => {
                            let div = createElement('div', 'forecasts');
                            let symbolSpan = createElement('span', 'condition symbol', `${symbols[currentData.forecast.condition]}`);
                            let containerSpan = createElement('span', 'condition');
                            let nameSpan = createElement('span', 'forecast-data', `${currentData.name}`);
                            let tempSpan = createElement('span', 'forecast-data', `${currentData.forecast.low}&#176/${currentData.forecast.high}&#176`);
                            let conditionSpan = createElement('span', 'forecast-data', `${currentData.forecast.condition}`);

                            containerSpan.appendChild(nameSpan);
                            containerSpan.appendChild(tempSpan);
                            containerSpan.appendChild(conditionSpan);

                            div.appendChild(symbolSpan);
                            div.appendChild(containerSpan);
                            
                            currentEl.appendChild(div);
                        });

                    fetch(`${baseUrl}/upcoming/${code}`)
                        .then(res => res.json())
                        .then(upcomingData => {
                            let div = createElement('div', 'forecast-info');
                            upcomingData.forecast.forEach(el => {
                                let containerSpan = createElement('span', 'upcoming');
                                let symbolSpan = createElement('span', 'symbol', `${symbols[el.condition]}`);
                                let tempSpan = createElement('span', 'forecast-data', `${el.low}&#176/${el.high}&#176`);
                                let conditionSpan = createElement('span', 'forecast-data', `${el.condition}`);

                                containerSpan.appendChild(symbolSpan);
                                containerSpan.appendChild(tempSpan);
                                containerSpan.appendChild(conditionSpan);
                                div.appendChild(containerSpan);
                            });

                            upcomingEl.appendChild(div);
                        });
                } else {
                    forecastContainer.textContent = 'Error';
                }
            })
            
    });

    function createElement(type, nameClass, content){
        let el = document.createElement(type);
        el.className = nameClass;

        if(content !== undefined){
            el.innerHTML = content;
        }

        return el;
    }
}

attachEvents();
