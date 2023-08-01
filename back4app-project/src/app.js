import * as api from './data/api.js';
import { register, login, logout } from './data/user.js';

window.api = api;
window.register = register;
window.login = login;
window.logout = logout;