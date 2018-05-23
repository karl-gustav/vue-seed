import {getUser, logout} from '../services/fetch_helper.js';

export default {
    template: `<section v-if="user">
        <span>User: {{user.DisplayName}}</user>
        <button v-on:click="logout">Logout</button>
    </section>`,
    computed: {
        user() {
            return this.$store.state.user;
        },
    },
    methods: {
        logout() {
            logout();
            this.$router.push('/login')
        },
    }
}
