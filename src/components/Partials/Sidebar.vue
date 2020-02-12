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
  export default {
    name: "Sidebar",
    props: ['value'],
    data: () => ({
      links: [
        { title: 'Balance', to: '/', exact: true },
        { title: 'History', to: '/history' },
        { title: 'Planing', to: '/planing' },
        { title: 'New Record', to: '/record' },
        { title: 'Categories', to: '/categories' },
      ]
    })
  }
</script>

<style scoped>

</style>
