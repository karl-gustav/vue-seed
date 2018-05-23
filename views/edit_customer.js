import {getCustomer, saveCustomer} from '../services/fetch_helper.js';

export default {
    props: ['id'],
    template: `
        <main>
            <form v-on:submit.prevent
                  v-if="customer">
                <label>
                    Name:
                    <input v-model="customer.Info.Name"/>
                </label>
                <label>
                    EmailAddress:
                    <input v-model="customer.Info.DefaultEmail.EmailAddress"/>
                </label>
                <label>
                    Number:
                    <input v-model="customer.Info.DefaultPhone.Number"/>
                </label>
                <label>
                    AddressLine1:
                    <input v-model="customer.Info.InvoiceAddress.AddressLine1"/>
                </label>
                <label>
                    PostalCode:
                    <input v-model="customer.Info.InvoiceAddress.PostalCode"/>
                </label>
                <label>
                    City:
                    <input v-model="customer.Info.InvoiceAddress.City"/>
                </label>
                <ul>
                    <li v-for="error in errors">{{error}}</li>
                </ul>
                <button type="submit" v-on:click="saveCustomer">Save</button>
            </form>
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
        saveCustomer() {
            saveCustomer(this.customer)
                .then(customer => this.customer = customer)
                .catch(err => this.errors.push(err.message));
            this.$router.push(`/customers/${this.$route.params.id}`);
        }
    }
}

