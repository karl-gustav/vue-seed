import router from './router.js';
import store from './store.js';
import user from './components/user.js';

Vue.component('user', user);

new Vue({
    template: `
        <div>
            <header></header>
            <nav>
                <router-link to="/login">Login/Logout</router-link>
                <router-link to="/select-company">Select company</router-link>
                <router-link to="/">Customers</router-link>
                <router-link to="/create-customer">Create customer</router-link>
                <user class="user-component"></user>
            </nav>
            <router-view></router-view>
            <footer></footer>
        </div>
    `,
    router,
    store,
    beforeCreate() {
        this.$store.commit('initialiseStore');
    }
}).$mount('#app');
