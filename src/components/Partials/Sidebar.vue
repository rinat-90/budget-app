<template>
  <ul class="sidenav app-sidenav" :class="{open: value}">
    <router-link
      v-for="(link, index) in links"
      :key="index"
      :to="link.to"
      active-class="active"
      :exact="link.exact"
      tag="li"
    >
      <a class="waves-effect waves-orange pointer">{{ link.title }}</a>
    </router-link>
  </ul>
</template>

<script>
  import localizeFilter from "../../filters/localize.filter";
  export default {
    name: "Sidebar",
    props: ['value'],
    data: () => ({
      links: [
        { title: localizeFilter('title_balance'),  to: '/', exact: true },
        { title: localizeFilter('title_history'),  to: '/history' },
        { title: localizeFilter('title_planning'), to: '/planing' },
        { title: localizeFilter('title_record'),   to: '/record' },
        { title: localizeFilter('title_categories'), to: '/categories' },
      ]
    })
  }
</script>

<style scoped>

</style>
