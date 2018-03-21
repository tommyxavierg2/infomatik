<template>
    <div class="jumbotron">
        <h1>{{records.page.name}}</h1>  
    </div>
</template>

<script>
    export default {
        data() {
            return {
                records: {
                    page: { name: 'Dashboard' },
                    orders: [],
                    user: {}
                },
                
            }
        },

        methods: {
            
        }
    }
</script>