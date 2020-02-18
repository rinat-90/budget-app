<template>
  <div>
    <app-loader v-if="loading" />
    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link  to="/history" class="breadcrumb">History</router-link>
        <a @click.prevent class="breadcrumb">
          {{ record.type === 'income' ? 'Income' : 'Expense'}}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div
            class="card"
            :class="{
            'red': record.type === 'expense',
            'green': record.type === 'income'}">
            <div class="card-content white-text">
              <p>{{ 'label_description' | localize }}: {{ record.description }}</p>
              <p>{{ 'label_sum' | localize }}: {{ record.amount | currency('USD') }}</p>
              <p>{{ 'category' | localize }}: {{ record.categoryName }}</p>

              <p>{{ 'date' | localize }}: {{ record.date | date('datetime')}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="center" v-else>
      There is no record with such ID: {{ $route.params.id }}
    </p>
  </div>
</template>

<script>
  export default {
    name: "DetailRecord",
    data:() => ({
      record: null,
      loading: true
    }),
    async mounted() {
      const id = this.$route.params.id;
      const record = await this.$store.dispatch('fetchRecordById', id);
      const category = await this.$store.dispatch('fetchCategoryById', record.categoryId);

      this.record = {
        ...record,
        categoryName: category.title
      };
      this.loading = false
    }
  }
</script>

<style scoped>

</style>
