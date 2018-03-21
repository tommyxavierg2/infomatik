<template>
    <div style="padding: 15px;">
        <div class="jumbotron">
            <h1>{{records.page.name}}</h1>  
        </div>

        <div class="card">
            <div class="row" v-for="item in records.user.orders" :key="item.id" style="width: 50%; padding: 15px;">
                <div class="col-md-6">
                    <router-link :to="{ name: 'product', params: { id: item.id} }">{{item.name}}</router-link>
                    <img class="card-img-top" :src="item.image" alt="Card image cap">
                </div>
                <div class="card-body col-md-6">
                    <p class="card-text">{{item.description}}</p>
                    <p>{{item.price}}</p>
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
                    page: { name: 'Dashboard' },
                    user: {
                        orders: [],
                    }
                },
                
            }
        },

        methods: {
            getOrders() {
                axios.get(`${api.url}orders?userId=${this.$route.params.id}`)
                    .then(res => this.records.user.orders = res.data)
                    .catch(err => alert(err))     
            }
        },
        
        created() {
            this.getOrders();
        }
    }
</script>