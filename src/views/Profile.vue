<template>
  <div>
    <div class="page-title">
      <h3>{{ 'title_profile' | localize }}</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input
          v-model="name"
          :class="{invalid: $v.name.$dirty && $v.name.reuired}"
          id="description"
          type="text"
        >
        <label for="description">{{ 'label_name' | localize }}</label>
        <small
          v-if="$v.name.$dirty && !$v.name.required"
          class="helper-text invalid">
          {{ 'Profile_msg' | localize }}
        </small>
      </div>

      <div class="switch" style="margin-bottom: 2rem;">
        <label>
          РУССКИЙ
          <input
            v-model="isUSLocal"
            type="checkbox">
          <span class="lever"></span>
          ENGLISH
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{'update' | localize }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
  import { required } from 'vuelidate/lib/validators';
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: "Profile",
    data:() =>({
      name: '',
      isUSLocal: true
    }),
    validations:{
      name: {required },
    },
    computed:{
      ...mapGetters(['info']),
    },
    mounted() {
      this.name = this.info.name;
      this.isUSLocal = this.info.local === 'en-US';
      setTimeout(() => {
        M.updateTextFields();
      })
    },
    methods: {
      ...mapActions(['updateInfo']),
      async submitHandler() {
        if(this.$v.$invalid){
          this.$v.$touch();
          return
        }

        try{
          await this.updateInfo({
            name: this.name,
            local: this.isUSLocal ? 'en-US' : 'ru-RU'
          })
        }catch (e) { }
      }
    }
  }
</script>

<style scoped>

</style>
