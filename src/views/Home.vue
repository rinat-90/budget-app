<template>
  <div>
    <div class="page-title">
      <h3>{{'title_balance' | localize }}</h3>

      <button @click="refresh" class="btn waves-effect waves-light btn-small">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <app-loader v-if="loading" />
    <div v-else class="row">

      <Balance
        :rates="currency.rates"/>
      <Currency
        :rates="currency.rates"
        :date="currency.date"/>
    </div>
  </div>
</template>

<script>
  import Balance from "../components/Home/Balance";
  import Currency from "../components/Home/Currency";
  import localizeFilter from "../filters/localize.filter";
  export default {
    name: 'Home',
    components: { Balance, Currency },
    metaInfo(){
      return{
        title: this.$title('title_balance'),
      }
    },
    data:() => ({
      loading: true,
      currency: null
    }),
    async mounted() {
      this.currency =  await this.$store.dispatch('fetchCurrency');
      this.loading = false;
    },
    methods: {
      async refresh() {
        this.loading = true;
        this.currency = await this.$store.dispatch('fetchCurrency');
        this.loading = false;
      }
    }
  };
</script>
