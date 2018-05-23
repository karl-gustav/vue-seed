import {saveCustomer} from '../services/fetch_helper.js';

export default {
	template: `
		<main>
	        <form v-on:submit.prevent>
                <label>Name <input v-model="customer.Info.Name"></label>
                <label>EmailAddress <input v-model="customer.Info.DefaultEmail.EmailAddress"></label>
                <label>Number <input v-model="customer.Info.DefaultPhone.Number"></label>
                <label>AddressLine1 <input v-model="customer.Info.InvoiceAddress.AddressLine1"></label>
                <label>PostalCode <input v-model="customer.Info.InvoiceAddress.PostalCode"></label>
                <label>City <input v-model="customer.Info.InvoiceAddress.City"></label>
                <ul>
                    <li v-for="error in errors">{{error}}</li>
                </ul>
                <button v-on:click="saveCustomer">Save</button>
            </form>
	    </main>
    `,
    data() {
    	return {
	        customer: {Info:{DefaultEmail:{},DefaultPhone:{},InvoiceAddress:{}}},
	        errors: [],
	    };
    },
    methods: {
        saveCustomer() {
            if (!this.customer.Info.Name) {
                this.errors.push('Name is a required field!');
                return;
            }
        	saveCustomer(this.customer)
                .then(customer => this.customer = customer)
                .then(customer => this.$router.push(`/view-customer/${customer.ID}`))
                .catch(err => this.errors.push(err.message));
        }
    }
}
