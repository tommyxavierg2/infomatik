import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
        loggedIn: false,
        user: {},
        cart: []
    },

    mutations = {
        login(state, loginUser) {
            state.user = loginUser;
            state.loggedIn = true;
        },

        logout(state) {
            state.user = {};
            state.loggedIn = false;
        },

        addCartItem(state, product) {
            state.cart.push(product);
        },

        getOrders(state, orders) {
            state.cart = orders;
        }
    }

export default new Vuex.Store({
    state,
    mutations
})