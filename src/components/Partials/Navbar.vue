<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="$emit('click')">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">{{ date | date('datetime') }}</span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a
            ref="dropdown"
            class="dropdown-trigger black-text"
            href="#"
            data-target="dropdown"
          >
            {{ name }}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id='dropdown' class='dropdown-content'>
            <li>
              <router-link to="/profile" class="black-text">
                <i class="material-icons">account_circle</i>
                {{ 'title_profile' | localize }}
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a @click="logout" href="#" class="black-text">
                <i class="material-icons">assignment_return</i>
                {{ 'exit' | localize }}
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
  export default {
    name: "Navbar",
    data: () =>({
      date: new Date(),
      interval: null,
      dropdown: null
    }),
    computed:{
      name(){
        return this.$store.getters.info.name
      }
    },
    mounted() {
      this.interval = setInterval(() =>{
        this.date = new Date()
      },1000);
      this.dropdown = M.Dropdown.init(this.$refs.dropdown, {
        constrainWidth: false
      })
    },
    methods: {
      async logout() {
        await this.$store.dispatch('logout');
        this.$router.push('/login?message=logout');
      }
    },
    beforeDestroy() {
      clearInterval(this.interval);
      if(this.dropdown && this.dropdown.destroy){
        this.dropdown.destroy()
      }
    }
  }
</script>

<style scoped>

</style>
