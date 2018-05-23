function initialState() {
    return {
        token: null,
        companyKey: null,
        user: null,
    };
}

const store = new Vuex.Store({
    state: initialState(),
    mutations: {
        setToken(state, payload) {
            state.token = payload.token;
            state.companyKey = payload.companyKey;
        },
        setUser(state, payload) {
            state.user = payload.user;
        },
        clear (state) {
            const init = initialState();
            Object.keys(init).forEach(key => state[key] = init[key]);
        },
        initialiseStore(state) {
            if(localStorage.getItem('store')) {
                this.replaceState(
                    Object.assign(state, JSON.parse(localStorage.getItem('store')))
                );
            }
        },
    },
});

store.subscribe((mutation, state) => {
    localStorage.setItem('store', JSON.stringify(state));
});


export default store;
