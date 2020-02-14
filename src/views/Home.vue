<template>
  <div>
    <div class="page-title">
      <h3>Balance</h3>

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
  export default {
    name: 'Home',
    components: {
      Balance,
      Currency
    },
    data:() => ({
      loading: true,
      currency: null
    }),
    async mounted() {
      this.currency =  await this.$store.dispatch('fetchCurrency');
      this.loading = false;
      console.log(this.currency);
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
