import {getUser, logout} from '../services/fetch_helper.js';
import router from '../router.js';
import store from '../store.js';

export default {
    template: `<section v-if="user">
        <span>User: {{user.DisplayName}}</user>
        <button v-on:click="logout">Logout</button>
    </section>`,
    computed: {
        user() {
            return store.state.user;
        },
    },
    methods: {
        logout() {
            logout();
            router.push('/login')
        },
    }
}
