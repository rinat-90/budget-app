<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">{{ 'currencies_rate' | localize }}</span>
        </div>
        <table>
          <thead>
          <tr>
            <th>{{'currency' | localize }}</th>
            <th>{{'rate' | localize }}</th>
            <th>{{'date' | localize}}</th>
          </tr>
          </thead>

          <tbody>
          <tr
            v-for="(cur, index) in currencies"
            :key="index">
            <td>{{ cur }}</td>
            <td>{{rates[cur]}}</td>
            <td>{{ date | date('date') }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Currency",
    props:['rates', 'date'],
    data:() =>({
      currencies: ['USD', 'EUR', 'GBP']
    })
  }
</script>

<style scoped>

</style>
