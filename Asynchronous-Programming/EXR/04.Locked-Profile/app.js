function lockedProfile() {
    const main = document.getElementById('main');
    const url = 'http://localhost:3030/jsonstore/advanced/profiles';

    fetch(url)
        .then(res => res.json())
        .then(data => {
            let index = 1;
            for (const user in data) {
                let div = document.createElement('div');
                div.className = 'profile';
                let img = document.createElement('img');
                img.src = './iconProfile2.png';
                img.className = 'userIcon';
                let lockLabel = document.createElement('label');
                lockLabel.textContent = 'Lock';
                let lockRadio = document.createElement('input');
                lockRadio.type = 'radio';
                lockRadio.name = `user${index}Locked`;
                lockRadio.value = 'lock';
                lockRadio.checked = true;
                let unlockLabel = document.createElement('label');
                unlockLabel.textContent = 'Unlock';
                let unlockRadio = document.createElement('input');
                unlockRadio.type = 'radio';
                unlockRadio.name = `user${index}Locked`;
                unlockRadio.value = 'unlock';
                let br = document.createElement('br');
                let hr = document.createElement('hr');
                let usernameLabel = document.createElement('label');
                usernameLabel.textContent = 'Username';
                let usernameInput = document.createElement('input');
                usernameInput.type = 'text';
                usernameInput.name = `user${index}Username`;
                usernameInput.value = `${data[user].username}`;
                usernameInput.disabled = true;
                usernameInput.readOnly = true;
                let hiddenDiv = document.createElement('div');
                hiddenDiv.style.display = 'none';
                hiddenDiv.id = `user${index}HiddenFields`;
                let hr2 = document.createElement('hr');
                let emailLabel = document.createElement('label');
                emailLabel.textContent = 'Email:';
                let emailInput = document.createElement('input');
                emailInput.type = 'email';
                emailInput.name = `user${index}Email`;
                emailInput.value = `${data[user].email}`;
                emailInput.disabled = true;
                emailInput.readOnly = true;
                let ageLabel = document.createElement('label');
                ageLabel.textContent = 'Age:';
                let ageInput = document.createElement('input');
                ageInput.type = 'email';
                ageInput.name = `user${index}Age`;
                ageInput.value = `${data[user].age}`;
                ageInput.disabled = true;
                ageInput.readOnly = true;
                let btn = document.createElement('button');
                btn.textContent = 'Show more';
                index++;

                div.appendChild(img);
                div.appendChild(lockLabel);
                div.appendChild(lockRadio);
                div.appendChild(unlockLabel);
                div.appendChild(unlockRadio);
                div.appendChild(br);
                div.appendChild(hr);
                div.appendChild(usernameLabel);
                div.appendChild(usernameInput);
                div.appendChild(hiddenDiv);

                hiddenDiv.appendChild(hr2);
                hiddenDiv.appendChild(emailLabel);
                hiddenDiv.appendChild(emailInput);
                hiddenDiv.appendChild(ageLabel);
                hiddenDiv.appendChild(ageInput);

                div.appendChild(btn);

                main.appendChild(div);

                btn.addEventListener('click', () => {
                    if(btn.textContent === 'Show more' && unlockRadio.checked === true){
                        hiddenDiv.style.display = 'block';
                        btn.textContent = 'Hide it';
                    } else if(btn.textContent === 'Hide it' && unlockRadio.checked === true) {
                        hiddenDiv.style.display = 'none';
                        btn.textContent = 'Show more';
                    }
                });
            }
        });

}