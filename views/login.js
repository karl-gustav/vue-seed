import {logout, login, LOGGED_OUT_ERROR} from '../services/fetch_helper.js';
import router from '../router.js';
import store from '../store.js';


export default {
	template: `
    <main>
        <button type="button" v-if="isLoggedIn()" v-on:click="logout">Logout</button>
        <form v-on:submit.prevent v-else>
            <label>Username: <input type="text" autofocus v-model="username"></label>
            <label>Password: <input type="password" v-model="password"></label>
            <ul><li v-for="error in errors">{{error}}</li></ul>
            <button type="submit" v-on:click="submit">Login</button>
        </form>
    </main>
	`,
	 data() {
    	return {
	        username: '',
	        password: '',
	        errors: [],
	    };
    },
    methods: {
        isLoggedIn() {
            return !!store.state.token;
        },
        logout() {
            logout();
        },
    	submit() {
    		if (!(this.username.length && this.password)) {
    			this.errors.push("Both Username and Password need to be filled in!");
    			return;
    		}
    		login(this.username, this.password)
                .then(auth => store.commit('setToken', {
                    token: auth.access_token,
                }))
                .then(() => router.push({path: '/select-company'}))
                .catch(err => {
                    if (err === LOGGED_OUT_ERROR) {
                        this.errors.push('Wrong Username or Password!');
                    } else {
                        this.errors.push(`Got error when contacting server: ${err.message}`);
                    }
                });
    	}
    }
}
