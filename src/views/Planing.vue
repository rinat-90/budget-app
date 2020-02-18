<template>
  <div>
    <div class="page-title">
      <h3>{{'title_planning' | localize }}</h3>
      <h4>{{ info.balance | currency('USD') }}</h4>
    </div>

    <app-loader v-if="loading"></app-loader>

    <p v-else-if="!categories.length" class="center">
      You don't have any categories
      <router-link to="/categories">Add new category</router-link>
    </p>

    <section v-else>
      <div v-for="cat in categories" :key="cat.id">
        <p>
          <strong>{{ cat.title }}:</strong>
          {{ 'spent' | localize }} {{ cat.expense | currency('USD') }} {{ 'out_of' | localize }} {{ cat.amount | currency('USD') }}
        </p>
        <div class="progress" v-tooltip="cat.tooltip">
          <div
            class="determinate"
            :class="[cat.progressColor]"
            :style="{ width: cat.progressPercent + '%' }"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

  import { mapGetters } from 'vuex';
  import currencyFilter from "../filters/currency";
  import localizeFilter from "../filters/localize.filter";
  export default {
    name: "Planing",
    data:() =>({
      loading: true,
      categories: []
    }),
    computed:{
      ...mapGetters(['info']),
    },
    async mounted(){
      const records = await this.$store.dispatch('fetchRecords');
      const categories = await this.$store.dispatch('fetchCategories');

      this.categories = categories.map(cat => {
        const expense = records
          .filter(r => r.categoryId === cat.id)
          .filter(r => r.type === 'expense')
          .reduce((total, record) => {
            return total += +record.amount
          }, 0);

        const percent = 100 * expense / cat.amount;
        const progressPercent = percent > 100 ? 100 : percent;
        const progressColor = percent < 60
          ? 'green'
          : percent < 100
            ? 'yellow'
            : 'red';
        const tooltipValue = cat.amount -expense;
        const tooltip = `${ tooltipValue < 0 ? 'Over the limit for ' : `${localizeFilter('remaining')} ` }${ currencyFilter(Math.abs(tooltipValue)) }`;

        return{
          ...cat,
          progressPercent,
          progressColor,
          expense,
          tooltip
        }
      });

      this.loading = false
    }
  }
</script>

<style scoped>

</style>
