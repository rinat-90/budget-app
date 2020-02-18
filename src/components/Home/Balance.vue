<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">{{'title_balance' | localize }}</span>

        <p
          v-for="(curr, i) in currencies"
          :key="i"
          class="currency-line">
          <span>
            {{ getCurrency(curr) | currency(curr) }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Balance",
    props:['rates'],
    data:() => ({
      currencies: ['USD', 'EUR', 'GBP']
    }),
    computed:{
      base(){
        return this.$store.getters.info.balance / (this.rates['USD'] / this.rates['EUR'])
      }
    },
    methods: {
      getCurrency(currency){
        console.log(this.$store.getters.info.balance);
        return Math.floor(this.base * this.rates[currency])
      }
    },
  }
</script>

<style scoped>

</style>
