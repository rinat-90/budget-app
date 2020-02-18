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
      <HistoryTable :records="items" />
      <paginate
        v-model="page"
        :page-count="pageCount"
        :click-handler="pageChangeHandler"
        :prev-text="'Prev'"
        :next-text="'Next'"
        :container-class="'pagination'"
        :page-class="'waves-effect'">
      </paginate>
    </section>
  </div>
</template>

<script>
  import paginationMixin from '../mixins/pagination.mixin'
  import HistoryTable from "../components/Partials/HistoryTable";
  export default {
    name: "History",
    components:{ HistoryTable },
    mixins:[paginationMixin],
    data:()=>({
      loading: true,
      records: [],
    }),
    async mounted() {
      this.records = await this.$store.dispatch('fetchRecords');
      const categories = await this.$store.dispatch('fetchCategories');
      this.setupPagination(this.records.map(record => {
        return{
          ...record,
          categoryName: categories.find(c => c.id === record.categoryId).title,
          typeClass: record.type === 'income' ? 'green' : 'red',
          typeText: record.type === 'income' ? 'Income': 'Expense'
        }
      }));
      this.loading = false
    },
  }
</script>

<style scoped>

</style>
