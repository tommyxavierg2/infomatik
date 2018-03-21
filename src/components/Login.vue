<template>
    <div class="container">
    
        <div class="jumbotron">
            <h1>{{records.page.name}}</h1>  
        </div>

        <form @submit.prevent="login()">
            <div>
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" class="form-control" v-model="records.user.email"></input>
                </div>

                <div class="form-group">
                    <label type="password">password</label>
                    <input class="form-control" type="password" v-model="records.user.password"></input>
                </div>

                <button type="submit" class="btn btn-success" style="margin-top: 10px;">Enter</button>
            </div>
        </form>

    </div>  
</template>

<script>
import axios from 'axios';

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
                axios.get(`http://localhost:3000/users?email=${this.records.user.email}&password=${this.records.user.password}`)
                    .then(response => {
                        if (response) {
                            sessionStorage.setItem('userData', response.data[0]);
                            this.$router.replace('/');
                        }
                    })
             }
         }
    }
</script>