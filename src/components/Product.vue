<template>
    <div>

        <div class="jumbotron">
            <h1>{{records.page.name}}</h1>  
        </div>
    
        <div class="card">
            <div class="row">
                <div class="col-md-6"  style="width: 50%;">
                    <router-link :to="{ name: 'product', params: { productId: records.product.productId} }">{{records.product.name}}</router-link>
                    <img class="card-img-top" :src="records.product.image" alt="Card image cap">
                </div>
                <div class="card-body col-md-6">
                    <p class="card-text">{{records.product.description}}</p>
                    <p>{{records.product.price}}</p>
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
                    page: { name: 'Detail' },
                    product: {}
                }
            }
        },

        methods: {
            getProduct(productId) {
                axios.get(`http://localhost:3000/products/${productId}`)
                    .then(res => this.records.product = res.data)
                    .catch(err => alert(err));
            },
        },

        created() {
            this.getProduct(this.$route.params.id);
        }
    }
</script>