<template>
  <div>
    <app-loader v-if="loading" />
    <div v-else class="app-main-layout">
      <Navbar @click="isOpen = !isOpen" />
      <Sidebar v-model="isOpen" />



      <main class="app-content" :class="{full: !isOpen}">
        <div class="app-page">
          <router-view />
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link
          to="/record"
          class="btn-floating btn-large blue">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import Navbar from "../components/Partials/Navbar";
  import Sidebar from "../components/Partials/Sidebar";
  import messages from "../utils/messages";
  export default {
    name: "main-layout",
    components:{
      Navbar,
      Sidebar
    },
    data: () => ({
      isOpen: true,
      loading: true
    }),
    computed:{
      error(){
        return this.$store.getters.error
      }
    },
    watch:{
      error({code}){
        this.$error(messages[code] || 'Something went wrong!');
      }
    },
    async mounted() {
      if(!Object.keys(this.$store.getters.info).length){
        await this.$store.dispatch('fetchInfo')
      }
      this.loading = false
    }
  }
</script>

<style scoped>

</style>

