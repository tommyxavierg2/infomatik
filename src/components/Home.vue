<template>
    <div class="container">

        <div class="jumbotron">
            <h1>{{records.page.name}}</h1>  
        </div>

        <div class="row">
            <div class="col-md-4" style="padding: 10px;" v-for="product in records.products" :key="product.id">
                <router-link :to="{ name: 'product', params: { id: product.id} }">{{product.name}}</router-link>
                <div class="card" style="width: 18rem;">
                    <img class="card-img-top" :src="product.image" alt="Card image cap" width="150px" height="150px">
                    <div class="card-body">
                        <p class="card-text">{{product.description}}</p>
                        <p>{{product.price}}</p>
                    </div>
                </div>
            </div>
        </div>

    </div>  
</template>

<script>
import axios from 'axios';

    export default {
         data() {
             return {
                 records: {
                    page: { name: 'Home' },
                    user: { 
                        email: '', 
                        password: '' 
                    },
                    products: []  
                 }
             }
         },

         methods: {
             getProducts() {
                 axios.get(`http://localhost:3000/products`)
                    .then(response => this.records.products = response.data)
                    .catch(err => alert(err));
             }
         },

         created() {
             this.getProducts();
         }
    }
</script>