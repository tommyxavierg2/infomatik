<template>
    <div>

        <div class="jumbotron">
            <h1>{{records.page.name}}</h1>  
        </div>
    
        <div class="card" style="width: 18rem;">
            <router-link :to="{ name: 'product', params: { id: records.product.id} }">{{records.product.name}}</router-link>
            <img class="card-img-top" :src="records.product.image" alt="Card image cap">
            <div class="card-body">
                <p class="card-text">{{records.product.description}}</p>
                <p>{{records.product.price}}</p>
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
            getProduct(id) {
                axios.get(`http://localhost:3000/products/${id}`)
                    .then(res => this.records.product = res.data)
                    .catch(res => alert(err));
            },
        },

        created() {
            this.getProduct(this.$route.params.id);
        }
    }
</script>