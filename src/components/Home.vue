<template>
    <div class="container">

        <div class="jumbotron">
            <h1>{{records.page.name}}</h1>  
        </div>

        <div class="row">
            <div class="col-md-4" style="padding: 10px;" v-for="product in records.products" :key="product.id">
                <router-link :to="{ path: `/product/${product.id}`}">{{product.name}}</router-link>
                <div class="card" style="width: 18rem;">
                    <img class="card-img-top" :src="product.image" alt="Card image cap" width="100px" height="150px">
                    <div class="card-body">
                        <p class="card-text">{{product.description}}</p>
                        <p>RD$ {{product.price}}</p>
                    </div>
                    <button v-if="checkUserLogged.loggedIn" class="btn btn-info btn-block" @click="addToCart(product)"><icon icon="cart-plus"/> </button>
                </div>
            </div>
        </div>

    </div>  
</template>

<script>
import axios from 'axios';
import {api} from '../store/api';

    export default {
         data() {
             return {
                 records: {
                    page: { name: 'Home' },
                    products: [],
                    user: {
                        cart: [] 
                    } 
                 }
             }
         },

         computed: {
             checkUserLogged() {
                return this.$store.state
             },

             checkUserType() {
                return this.checkUserLogged.loggedIn && !this.checkUserLogged.user.type ? true : false
             }
         },

         methods: {
             getProducts() {
                 axios.get(`http://localhost:3000/products`)
                    .then(response => this.records.products = response.data)
                    .catch(err => alert(err));
             },

             addToCart(product) {
                 if (confirm(`¿Are you sure about adding the ${product.name} to your cart?`)) {
                     let tempOrder = product;
                     tempOrder.userId = this.$store.state.user.id;
                     axios.post(`${api.url}orders`, tempOrder)
                        .then(res => {
                            alert(`A ${product.name} pricing: ${product.price}, has been added to your cart`);
                            this.$store.commit('addCartItem', product);
                        })
                        .catch(err => alert(err));
                 }
             }
         },

         created() {
             this.getProducts();
         }
    }
</script>