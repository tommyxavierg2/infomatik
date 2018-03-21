<template>
  <div id="app" style="padding: 25px;">

      <b-navbar type="dark" variant="info" style="margin-bottom: 25px;">

        <b-navbar-brand>
          <router-link to="/" class="nav-items">Foomatik</router-link>
        </b-navbar-brand>

        <b-navbar-nav v-if="checkUserLogged.user.id">
          <router-link :to="{ name: 'dashboard', params: { id: checkUserLogged.user.id }}" class="nav-items">Dashboard {{checkUserLogged.cart.length}} </router-link>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">

          <b-nav-form>
                <multiselect v-model="records.multiselect.searchValue" :options="records.multiselect.searchedProduct" :searchable="true" placeholder="¿What you looking for?" label="name" track-by="name" :loading="records.isLoading" :limit="5" @search-change="searchProduct" :options-limit="20" :option-height="100" @select="goToProductDetails" open-direction="bottom">
                  <template slot="option" slot-scope="props" style="background-color: black'"> <img class="option__image" :src="props.option.image" :alt="props.option.name" style="width: 80px;"> <div class="option__desc"> <span> <router-link class="option__title" :to="{ path: `/product/${props.option.id}`}">{{ props.option.name }}</router-link> </span> </div> </template>   
                  <span slot="noResult">Oops! No elements found.</span>
              </multiselect>
          </b-nav-form>
            
        </b-navbar-nav>

        <b-navbar-nav style="padding-left: 15px;">
          <b-nav-item @click="logout()" v-if="checkUserLogged.user.id">Logout</b-nav-item>
          <b-nav-item to="/login" v-if="!checkUserLogged.user.id">Login</b-nav-item>
        </b-navbar-nav>


        </b-navbar>

    <router-view/>
  </div>
</template>

<script>
    import store from '../src/store/store';
    import {api} from '../src/store/api';
    import Multiselect from 'vue-multiselect'
    import axios from 'axios';
    
    export default {
        components: {
            Multiselect
        },
        data() {
            return {
                records: {
                    multiselect: { searchValue: '', isLoading: false, searchedProduct: [], }
                }
            }
        },
        computed: {
            checkUserLogged() {
                return {
                    user: this.$store.state.user,
                    loggedIn: this.$store.state.loggedIn,
                    cart: this.$store.state.cart
                };
            }
        },
        methods: {
            searchProduct(query) {
                this.records.multiselect.isLoading = true;
                axios.get(`${api.url}products?name=${query}`)
                    .then(response => {
                        this.records.multiselect.searchedProduct = response.data;
                        this.records.isLoading = false;
                    })
                    .catch(err => toastr.warning(err));
            },

            goToProductDetails(selected) {
                this.$router.push(`/product/${selected.id}`);
            },
            
            getOrders() {
              axios.get(`${api.url}orders?userId=${this.checkUserLogged.user.id}`)
                .then(res => this.$store.commit('getOrders', res.data))
                .catch(err => alert(err));
            },

            logout() {
                if (confirm('¿Are you sure about logging out?')) {
                    this.$store.commit('logout');
                }
            }
        },
        created() {
            if (!store.state.loggedIn) {

            } else {
                this.getOrders();
            }
        }
    }
</script>

<style>
    .nav-items {
      color: #fffffffb;
    }

    .nav-link {
        display: inline;
        padding: 0px;
    }

    .ul {
      display: inline;
    }

    .li {
      list-style: none;
    }
</style>

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

