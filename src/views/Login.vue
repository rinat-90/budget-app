<template>
  <form @submit.prevent="onSubmit" class="card auth-card">
    <div class="card-content">
      <span class="card-title">Home Budget</span>
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
    </div>
    <div class="card-action">
      <div>
        <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
        >
          Enter
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Don't have account?
        <router-link to="/register">Create account</router-link>
      </p>
    </div>
  </form>
</template>

<script>
  import { email, required, minLength } from 'vuelidate/lib/validators';
  import messages from "../utils/messages";
  export default {
    name: "Login",
    data: () => ({
      email: '',
      password: ''
    }),
    validations:{
      email: { email, required },
      password: { required, minLength: minLength(6) }
    },
    mounted(){
      if(messages[this.$route.query.message]){
        this.$message(messages[this.$route.query.message])
      }
    },
    methods: {
      async onSubmit() {
        if(this.$v.$invalid){
          this.$v.$touch();
          return
        }

        const formData = {
          email: this.email,
          password: this.password
        };

        try{
          await this.$store.dispatch('login', formData);
          this.$router.push('/')
        }catch (e) { }
      }
    }
  }
</script>

<style scoped>

</style>
