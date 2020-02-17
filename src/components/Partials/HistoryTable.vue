<template>
  <table>
    <thead>
    <tr>
      <th>#</th>
      <th>Sum</th>
      <th>Date</th>
      <th>Category</th>
      <th>Type</th>
      <th>Open</th>
    </tr>
    </thead>

    <tbody>
    <tr v-for="(record, idx) of records" :key="record.id">
      <td>{{ idx + 1 }}</td>
      <td>{{ record.amount | currency('USD') }}</td>
      <td>{{ record.date | date('datetime')}}</td>
      <td>{{ record.categoryName }}</td>
      <td>
        <span
          :class="[record.typeClass]"
          class="white-text badge">
          {{ record.typeText }}
        </span>
      </td>
      <td>
        <button
          v-tooltip="'Open record'"
          class="btn-small btn"
          @click="$router.push('/record-detail/' + record.id)">
          <i class="material-icons">open_in_new</i>
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
  export default {
    name: "HistoryTable",
    props:{
      records:{
        required: true,
        type: Array
      }
    }
  }
</script>

<style scoped>

</style>
