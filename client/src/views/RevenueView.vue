<script>
import axios from 'axios';


export default {
    data() {
        return {
            revenues: []
        };
    },
    computed: {
        monthlyRevenue() {
            // transform into ['Month from revenue.date', revenue.amount]
            const monthlyRevenue = this.revenues.map(revenue => {
                const date = new Date(revenue.date);
                const month = date.toLocaleString('default', { month: 'long' });
                return [month, revenue.amount];
            });
            console.log(monthlyRevenue)
            return monthlyRevenue;
        }
    },
    created() {
        this.fetchRevenues();
    },
    methods: {
        fetchRevenues() {
            axios.get('http://localhost:3000/revenue')
                .then(response => {
                    this.revenues = response.data.revenue;
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
};
</script>

<template>
    <div>
        <h1>Revenue Page</h1>
        <column-chart :data="this.monthlyRevenue"></column-chart>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Amount</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="revenue in this.revenues" :key="revenue.id">
                    <td>{{ revenue.id }}</td>
                    <td>{{ revenue.amount }}</td>
                    <td>{{ revenue.date }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
  
<!-- <style>
.chart-table-container {
  display: flex;
}

.column-chart {
  display: inline-block;
  width: 50%;
}

table {
  display: inline-block;
  width: 50%;
}
</style> -->