const host = 'http://localhost:3030'

async function request(method, url, data) {
    const options = {
        method,
        headers: {}
    }

    if(data != undefined){
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(host + url, options);
        
        if(response.ok != true){ // Aко response.ok НЕ е true, то сървъра е върнал нещо различно от "успех"
            const error = await response.json();
            throw new Error(error.message);
        }

        if(response.status == 204){ // Статуса е 204 когато response-a на сървъра е "no-content", а не е някакво съдържание в JSON формат.
            return response;        // Такъв би бил случаят при logout, тогава сървъра ни връща response със статус 204, и ако се     
        } else {                    // опитаме да го JSON парснем, това ще ни хвърли грешка.
                                    // Затова в този случай връщаме само response.
                                    
            return response.json();
        }
    } catch (err) {
        alert(err.message);
        throw err; // throw-ваме грешката нататък, защото ако друга функция извика текущата
                   // то тя също ще спре своето изпълнение и ще може да catch-не грешката
    }


}

export const get = request.bind(null, 'get');
export const post = request.bind(null, 'post');
export const put = request.bind(null, 'put');
export const del = request.bind(null, 'delete');
