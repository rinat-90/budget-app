<template>
  <form @submit.prevent="onSubmit" class="card auth-card">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
          v-model.trim="email"
          :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
          id="email"
          type="text"
        >
        <label for="email">Email</label>
        <small
          v-if="$v.email.$dirty && !$v.email.required"
          class="helper-text invalid">
          Email cannot be empty
        </small>
        <small
          v-else-if="$v.email.$dirty && !$v.email.email"
          class="helper-text invalid">
          Email is invalid
        </small>
      </div>
      <div class="input-field">
        <input
          v-model.trim="password"
          id="password"
          type="password"
          :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
        >
        <label for="password">Password</label>
        <small
          v-if="$v.password.$dirty && !$v.password.required"
          class="helper-text invalid">
          Enter password
        </small>
        <small
          v-else-if="$v.password.$dirty && !$v.password.minLength"
          class="helper-text invalid">
          Password must be at least {{ $v.password.$params.minLength.min }} characters. Now it is {{ this.password.length }} characters.
        </small>
      </div>
      <div class="input-field">
        <input
          v-model.trim="name"
          :class="{invalid: $v.name.$dirty && !$v.name.required}"
          id="name"
          type="text"
        >
        <label for="name">Name</label>
        <small
          v-if="$v.name.$dirty && !$v.name.required"
          class="helper-text invalid">
          Enter your name
        </small>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="agree" />
          <span>I agree to the rules</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
        >
          Register
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Already have an account?
        <router-link to="/login">Login!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
  import { email, required, minLength } from 'vuelidate/lib/validators';
  export default {
    name: "Register",
    metaInfo(){
      return{
        title: 'Register',
      }
    },
    data: () => ({
      name: '',
      email: '',
      password: '',
      agree: false
    }),
    validations:{
      email: { email, required },
      password: { required, minLength: minLength(6) },
      name: { required },
      agree: { checked: v => v }
    },
    methods: {
      async onSubmit() {
        if(this.$v.$invalid){
          this.$v.$touch();
          return
        }

        try {
          await this.$store.dispatch('register', {
            email: this.email,
            password: this.password,
            name: this.name
          });
          await this.$router.push('/')
        }
        catch (e) { }
      }
    }
  }
</script>

<style scoped>

</style>
