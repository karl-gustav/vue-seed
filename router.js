import login from './views/login.js';
import customers from './views/customers.js';
import createCustomer from './views/create_customer.js';
import viewCustomer from './views/view_customer.js';
import editCusomer from './views/edit_customer.js';

export default new VueRouter({routes:[
    { path: "*", component: {template: '<h1>Page not found!</h1>'} },
    { path: '/login', component: login },
    { path: '/', component: customers },
    { path: '/create-customer', component: createCustomer },
    { path: '/customers/:id', component: viewCustomer },
    { path: '/customers/:id/edit', component: editCusomer },
]});
