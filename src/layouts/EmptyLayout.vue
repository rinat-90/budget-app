<template>
  <div class="grey darken-1 empty-layout">
    <router-view />
  </div>
</template>

<script>
  import messages from "../utils/messages";
  export default {
    name: "empty",
    computed:{
      error(){
       return this.$store.getters.error
      }
    },
    watch:{
      error({code}){
        this.$error(messages[code] || 'Something went wrong!');
       console.log(code)
      }
    }
  }
</script>

<style scoped>

</style>
