<template>
    <div class="container">
    
        <div class="jumbotron">
            <h1>{{records.page.name}}</h1>  
        </div>

        <div>
            <div class="form-group">
                <label>Email</label>
                <input type="email" class="form-control" v-model="records.user.email">
            </div>

            <div v-if="checkUserLogged.user.type" class="form-group">
                <label>Company Name</label>
                <input type="email" class="form-control" v-model="records.user.companyName">
            </div>

            <div class="form-group">
                <label>Address</label>
                <input type="email" class="form-control" v-model="records.user.address">
            </div>

            <div class="form-group">
                <label type="password">Password</label>
                <input class="form-control" type="password" v-model="records.user.password">
            </div>

            <div class="form-group">
                <label type="password">Confirm Password</label>
                <input class="form-control" type="password" v-model="records.user.confirmPassword">
            </div>

            <button v-if="!records.page.editing" type="button" class="btn btn-info" style="margin-top: 10px;" @click="records.page.editing = true">Edit</button> 
            <button v-if="records.page.editing" type="button" class="btn btn-danger" style="margin-top: 10px;" @click="records.page.editing = false">Cancel</button>
            <button v-if="records.page.editing" type="button" class="btn btn-success" style="margin-top: 10px;" @click="update()">Update</button>
        </div>

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
                    page: { name: 'Settings', editing: false },
                    user: {
                        name: '',
                        email: '',
                        companyName: '',
                        password: '',
                        confirmPassword: '',
                        address: ''

                    }
                }
            }
         },

         computed: {
            checkUserLogged() {
                return this.$store.state;
             }
         },

         methods: {
             update() {
                 if(confirm('¿Are you sure about these changes?')) {
                     axios.put(`${api.url}users/${this.$route.params.id}`, this.records.user)
                        .then(res => alert('Changes successfully applied'))
                        .catch(err => alert(err));
                 }  
             }
         }
    }
</script>