import store from '../store.js';
import router from '../router.js';

export const LOGGED_OUT_ERROR = new Error('You are no longer authorized to make reqeusts!');

const SERVER_URL = 'https://dev.unieconomy.no';

export function getUser() {
    return fetch(SERVER_URL + '/api/biz/users?action=current-session', {
        method: 'GET',
        headers: standardHeaders(),
    })
        .then(handleFetchError)
        .then(res => res.json())
        .catch(chechIfLoggedOut);
}

export function getCustomers() {
    return fetch(SERVER_URL + '/api/biz/customers?expand=Info,Info.DefaultPhone,Info.DefaultEmail,Info.InvoiceAddress', {
        method: 'GET',
        headers: standardHeaders(),
    })
        .then(handleFetchError)
        .then(res => res.json())
        .catch(chechIfLoggedOut);
}

export function getCompanies() {
    return fetch(SERVER_URL + '/api/init/companies', {
        headers: standardHeaders(),
    })
        .then(handleFetchError)
        .then(res => res.json())
        .catch(chechIfLoggedOut);
}

export function getCustomer(id) {
    return fetch(SERVER_URL + `/api/biz/customers/${id}?expand=Info,Info.DefaultPhone,Info.DefaultEmail,Info.InvoiceAddress`, {
        headers: standardHeaders(),
    })
        .then(handleFetchError)
        .then(res => res.json())
        .then(addMissingProperties)
        .catch(chechIfLoggedOut);
}

export function saveCustomer(customer) {
    const url = '/api/biz/customers' + ( customer.ID ? `/${customer.ID}` : '' );
    return fetch(SERVER_URL + url, {
        method: customer.ID ? 'PUT' : 'POST',
        body: JSON.stringify(customer),
        headers: standardHeaders(),
    })
        .then(handleFetchError)
        .then(res => res.json())
        .catch(chechIfLoggedOut);
}

export function deleteCustomer(customer) {
    return fetch(SERVER_URL + `/api/biz/customers/${customer.ID}`, {
        method: 'DELETE',
        headers: standardHeaders(),
    })
        .then(handleFetchError)
        .catch(chechIfLoggedOut);
}

export function login(username, password) {
    return fetch(SERVER_URL + '/api/init/sign-in', {
        method: 'POST',
        body: JSON.stringify({username: username, password: password}),
        headers: {
            'content-type': 'application/json',
        },
    })
        .then(handleFetchError)
        .then(res => res.json());
}

export function logout() {
    fetch(SERVER_URL + '/api/init/log-out', {
        method: 'POST',
        headers: standardHeaders(),
    });
    store.commit('clear');
}

function standardHeaders() {
    return {
        'Authorization': `Bearer ${store.state.token}`,
        'CompanyKey': store.state.companyKey,
        'Content-Type': 'application/json',
    };
}

function handleFetchError(response) {
    if (!response.ok) {
        if (response.status === 401) {
            throw LOGGED_OUT_ERROR;
        } else {
            throw Error(`Server returned a ${response.status} error!`);
        }
    }
    return response;
}

function chechIfLoggedOut(err) {
    if (err === LOGGED_OUT_ERROR) {
        router.push('login');
        console.log('Redirected to login page because got 401 from server.')
    }
    throw err;
}

function addMissingProperties(customer) {
    customer.Info = customer.Info || {_createguid: createGuid()};
    customer.Info.DefaultEmail = customer.Info.DefaultEmail || {_createguid: createGuid()};
    customer.Info.DefaultPhone = customer.Info.DefaultPhone || {_createguid: createGuid()};
    customer.Info.InvoiceAddress = customer.Info.InvoiceAddress || {_createguid: createGuid()};
    return customer;
}

function createGuid() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + '-' + S4() + '-4' + S4().substr(0, 3) + '-' + S4() + '-' + S4() + S4() + S4()).toLowerCase();
}
