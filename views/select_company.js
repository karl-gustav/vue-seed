import {getCompanies, getUser} from '../services/fetch_helper.js';
import router from '../router.js';
import store from '../store.js';


export default {
	template: `
    <main>
        <ul>
            <li v-if="companies === undefined">loading...</li>
            <li v-for="company in companies">
                <a href="javascript:void(0)" v-on:click="selectCompany(company)">{{company.Name}}</a>
            </li>
            <li v-for="error in errors">{{error}}</li>
        </ul>
    </main>
	`,
	 data() {
    	return {
	        companies: undefined,
	        errors: [],
	    };
    },
    created() {
        this.setCompanies();
    },
    methods: {
        setCompanies() {
            getCompanies()
                .then(companies => this.companies = companies)
                .catch(err => this.errors.push(err));
        },
        selectCompany(company) {
            store.commit('setCompanyKey', {companyKey: company.Key});
            getUser()
                .then(user => {
                    store.commit('setUser', {user});
                    router.push('/');
                })
                .catch(err => console.log('Got error when getting user:', err));
            ;
        }
    }
}
