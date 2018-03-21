<template>
    <div class="container">
    
        <div class="jumbotron">
            <h1>{{records.page.name}}</h1>  
        </div>

        <form @submit.prevent="login()">
            <div>
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" class="form-control" v-model="records.user.email">
                </div>

                <div class="form-group">
                    <label type="password">password</label>
                    <input class="form-control" type="password" v-model="records.user.password">
                </div>

                <button type="submit" class="btn btn-success" style="margin-top: 10px;">Enter</button>
            </div>
        </form>

    </div>  
</template>

<script>
import axios from 'axios';
import {api} from '../store/api';
import store from '../store/store';

    export default {
         data() {
             return {
                 records: {
                    page: { name: 'Login' },
                    user: { email: '', password: '' }
                 },
             }
         },

         methods: {
             login() {
                axios.get(`${api.url}users?email=${this.records.user.email}&password=${this.records.user.password}`)
                    .then(response => {
                        if (response) {
                            store.commit('login', response.data[0]);
                            this.$router.replace('/');
                        }
                    })
             }
         }
    }
</script>