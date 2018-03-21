<template>
    <div style="padding: 15px;">
        <div class="jumbotron">
            <h1>{{records.page.name}}</h1>  
        </div>

        <b-card no-body v-if="checkUserLogged.loggedIn">
            <b-tabs card v-model="records.page.tabIndex">
                <b-tab v-if="!checkUserLogged.user.type" title="Orders" active>
                    <div class="card" v-if="!checkUserLogged.user.type" style="margin: 75px; padding: 40px;">
                        <h1 style="margin-bottom: 15px;">Your Orders</h1>
                        <div class="row" v-for="item in records.user.orders" :key="item.id" style="border-bottom:1px solid gray; padding-bottom: 20px; margin-bottom: 20px;">
                            <div class="col-md-6">
                                <router-link :to="{ path: `/product/${item.id}`}">{{item.name}}</router-link>
                                <img class="card-img-top" :src="item.image" alt="Card image cap" style="height: 150px;">
                            </div>
                            <div class="card-body col-md-6">
                                <p class="card-text">{{item.description}}</p>
                                <p>{{item.price}}</p>
                            </div>
                        </div>
                    </div>
                </b-tab>
                <b-tab title="Dashboard" v-if="checkUserLogged.user.type">
                    <h1>Inventory</h1>  
                    <div class="row">
                        <div class="col-md-4" style="padding: 10px;" v-for="(product, index) in records.user.inventory" :key="product.id">
                            <router-link v-if="!records.user.editing" :to="{ path: `/product/${product.id}`}">{{product.name}}</router-link>
                            <input class="card-text" v-model="product.name" :readonly="records.user.editing">
                            <div class="card" style="width: 18rem;">
                                <img class="card-img-top" :src="product.image" alt="Card image cap" width="100px" height="150px">
                                <div class="card-body">
                                    <input class="card-text" v-model="product.description" :readonly="records.user.editing">
                                    <input class="card-text" v-model="product.price" :readonly="records.user.editing">
                                </div>
                                <button v-if="records.user.editing" class="btn btn-success btn-block" @click="editItem(product)"> <icon icon="edit"/> Edit </button>
                                <button v-if="records.user.editing" class="btn btn-warning btn-block" @click="records.user.editing = false"> <icon icon="edit"/> Cancel </button>
                                <button v-if="checkUserLogged.loggedIn" class="btn btn-danger btn-block" @click="deleteItem(product, index)" style="padding-left: 10px;"> <icon icon="trash"/> </button>
                                <button v-if="checkUserLogged.loggedIn && !records.user.editing" class="btn btn-info btn-block" @click="records.user.editing = true"> <icon icon="edit"/> </button>
                            </div>
                        </div>
                    </div>
                </b-tab>
                <b-tab title="Add Product" v-if="checkUserLogged.user.type">
                    <div class="form-control">
                        <div class="form-group">
                            <label>Name</label>
                            <input type="text" class="form-control" v-model="records.user.newProduct.name">
                        </div>

                        <div class="form-group">
                            <label type="password">Description</label>
                            <input class="form-control" type="text" v-model="records.user.newProduct.description">
                        </div>

                        <div class="form-group">
                            <label type="password">Image</label>
                            <input id="image" type="file" class="form-control" @change="addImage()">
                        </div>

                        <div class="form-group">
                            <label>Price</label>
                            <input type="text" class="form-control" v-model="records.user.newProduct.price">
                        </div>

                        <button type="submit" class="btn btn-success btn-block" style="margin-top: 10px;" @click="addItemToInventory(records.user.newProduct)">Add New Product</button>
                    </div>
                </b-tab>
            </b-tabs>
        </b-card>
        
        <img v-if="!checkUserLogged.loggedIn" src="https://firebasestorage.googleapis.com/v0/b/morse-code-7eb28.appspot.com/o/descarga.jpg?alt=media&token=c08c5d0f-0967-4607-9752-47ab03265f79" alt="Puerco" width="700px" height="300px">
    </div>
</template>

<script>
import axios from 'axios';
import {api} from '../store/api';

    export default {
        data() {
            return {
                records: {
                    page: { name: 'Dashboard', tabIndex: 0 },
                    user: {
                        orders: [],
                        inventory: [],
                        editing: false,
                        newProduct: {
                            name: '',
                            description: '',
                            price: '',
                            state: 1,
                            userId: this.$route.params.id,
                            image: ''
                        }
                    }
                },
                
            }
        },
        
        computed: {
            checkUserLogged() {
                 return this.$store.state;
            },

            getInventory() {
                return axios.get(`${api.url}inventory?userId=${this.$route.params.id}&state=1`)
                    .then(res => {
                        this.records.user.inventory = res.data;
                    })
                    .catch(err => alert(err));
            },
        },

        methods: {
            getOrders() {
                axios.get(`${api.url}orders?userId=${this.$route.params.id}`)
                    .then(res => this.records.user.orders = res.data)
                    .catch(err => alert(err))     
            },

            addImage() {
                let t = document.getElementById('image').files[0];
            },
 
            addItemToInventory(product) {
                axios.post(`${api.url}inventory`, product) 
                    .then(res => {
                        alert(`Item: ${product.name} with a price of RD$ ${product.price} has been successfully added to your inventory`);
                        this.records.page.tabIndex = 0;
                    })
            },

            deleteItem(product, index) {
                if (confirm(`Are you sure about deleting item ${product.name}`)) {
                    product.state = 0;
                    axios.put(`${api.url}inventory/${product.id}`, product)
                        .then(res => {
                            this.records.user.inventory.splice(index, 1);
                            alert(`Item ${product.name} successfully removed`);
                        })
                        .catch(err => alert(err));
                }
            },

            editItem(product) {
                if (confirm(`Are you sure about editing item ${product.name}`)) {
                    axios.put(`${api.url}inventory/${product.id}`, product)
                        .then(res => {
                            this.records.user.editing = false;
                            alert(`Item ${product.name} successfully updated`);
                        })
                        .catch(err => alert(err));
                } else {
                    this.records.user.editing = false;
                }
            },

            init() {
                this.getOrders();
                this.getInventory;
            }
        },
        
        created() {
            this.init();
        }
    }
</script>

<style>
    .nav-link {
        padding: 10px;
    }
</style>
