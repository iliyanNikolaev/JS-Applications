function attachEvents() {
    const URL = 'http://localhost:3030/jsonstore/messenger';
    const authorInputEl = document.querySelector('input[name="author"]');
    const msgInputEl = document.querySelector('input[name="content"]');
    const sendBtnEl = document.getElementById('submit');
    const refreshBtnEl = document.getElementById('refresh');
    const textArea = document.getElementById('messages');

    sendBtnEl.addEventListener('click', () => {
        let author = authorInputEl.value;
        let content = msgInputEl.value;
        if(author === ''){
            return alert('Please enter a name!');
        }

        if(content === ''){
            return alert('Please enter a message!');
        }
        let body = {
            author,
            content
        }

        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(data => {
                const hiddenDiv = document.getElementById('success');
                hiddenDiv.style.display = 'inline-block';
                
                setTimeout(() => {
                    hiddenDiv.style.display = 'none';
                }, 1000)
            });
    });

    refreshBtnEl.addEventListener('click', () => {
        let text = '';
        fetch(URL)
            .then(res => res.json())
            .then(data => {
                Object.values(data).forEach((x, i)=> {
                    if(i === Object.values(data) - 1){
                        text += `${x.author}: ${x.content}`
                    } else {
                        text += `${x.author}: ${x.content}\n`
                    }
                })

                textArea.textContent = text;
            })
    });
}

attachEvents();