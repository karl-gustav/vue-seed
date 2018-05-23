import {getCustomers} from '../services/fetch_helper.js';

export default {
	template: `
		<main>
            <button v-on:click="populateCustomers">Refresh</button>
            <router-link to="/create-customer">Create new customer</router-link>
	        <ul>
                <li v-for="error in errors">{{error}}</li>
                <li v-for="customer in customers">
                    <router-link :to="'/customers/' + customer.ID">
                        <p>{{customer.Info.Name}}<p>
                        <p v-if="customer.Info.DefaultEmail">{{customer.Info.DefaultEmail.EmailAddress}}</p>
                        <p v-if="customer.Info.DefaultPhone">{{customer.Info.DefaultPhone.Number}}</p>
                        <p v-if="customer.Info.InvoiceAddress">
                            {{customer.Info.InvoiceAddress.AddressLine1}},
                            {{customer.Info.InvoiceAddress.PostalCode}}
                            {{customer.Info.InvoiceAddress.City}}
                        </p>
                    </router-link>
                </li>
            </ul>
	    </main>
    `,
    data() {
    	return {
	        customers: [],
	        errors: [],
	    };
    },
    created() {
    	this.populateCustomers()
    },
    methods: {
        populateCustomers() {
            getCustomers()
                .then(customers => this.customers = customers)
                .catch(err => this.errors.push(err));
        }
    }
}
