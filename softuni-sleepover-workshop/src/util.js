export function setUserData(data){
    sessionStorage.setItem('userData', JSON.stringify(data))
}

export function getUserData(){
    const userData = sessionStorage.getItem('userData');

    return JSON.parse(userData);
}

export function clearUserData(){
    sessionStorage.removeItem('userData');
}
