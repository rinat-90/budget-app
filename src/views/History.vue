<template>
  <div>
    <div class="page-title">
      <h3>Records History</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>

    <app-loader v-if="loading" />

    <p v-else-if="!records.length" class="center">
      You don't have any records
      <router-link to="/record">Add new record</router-link>
    </p>

    <section v-else>
      <HistoryTable :records="records" />
    </section>
  </div>
</template>

<script>
  import HistoryTable from "../components/Partials/HistoryTable";
  export default {
    name: "History",
    components:{ HistoryTable },
    data:()=>({
      loading: true,
      categories: [],
      records: [],
    }),
    async mounted() {
      const records = await this.$store.dispatch('fetchRecords');
      this.categories = await this.$store.dispatch('fetchCategories');
      this.records = records.map(record => {
        return{
          ...record,
          categoryName: this.categories.find(c => c.id === record.categoryId).title,
          typeClass: record.type === 'income' ? 'green' : 'red',
          typeText: record.type === 'income' ? 'Income': 'Expense'
        }
      });
      this.loading = false
    }
  }
</script>

<style scoped>

</style>
