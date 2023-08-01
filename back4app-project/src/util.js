export function setUserData(userData) {
    sessionStorage.setItem('auth', JSON.stringify(userData));
}

export function getUserData() {
    return JSON.parse(sessionStorage.getItem('auth'));
}

export function deleteUserData() {
    sessionStorage.removeItem('auth');
}