import {getCustomer, saveCustomer, deleteCustomer} from '../services/fetch_helper.js';

export default {
    props: ['id'],
	template: `
		<main v-if="customer">
            <router-link :to="'/customers/' + customer.ID + '/edit'">Edit</router-link>
            <a href="javascript:void(0)" v-on:click="deleteCustomer">Delete</a>
	        <section>
                <label>
                    Name:
                    {{customer.Info.Name}}
                </label>
                <label>
                    EmailAddress:
                    {{customer.Info.DefaultEmail.EmailAddress}}
                </label>
                <label>
                    Number:
                    {{customer.Info.DefaultPhone.Number}}
                </label>
                <label>
                    AddressLine1:
                    {{customer.Info.InvoiceAddress.AddressLine1}}
                </label>
                <label>
                    PostalCode:
                    {{customer.Info.InvoiceAddress.PostalCode}}
                </label>
                <label>
                    City:
                    {{customer.Info.InvoiceAddress.City}}
                </label>
                <ul>
                    <li v-for="error in errors">{{error}}</li>
                </ul>
            </section>
	    </main>
    `,
    data() {
    	return {
	        customer: undefined,
	        errors: [],
	    };
    },
    created() {
        this.getCustomer();
    },
    methods: {
        getCustomer() {
            getCustomer(this.$route.params.id)
                .then(customer => this.customer = customer)
                .catch(err => this.errors.push(err.message));
        },
        deleteCustomer() {
            deleteCustomer(this.customer)
                .then(() => this.$router.push('/'))
                .catch(err => this.errors.push(err.message));
        }
    }
}

