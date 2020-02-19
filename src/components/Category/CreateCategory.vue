<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{ 'create' | localize }}</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <input
            v-model="title"
            :class="{invalid: $v.title.$dirty && !$v.title.required}"
            type="text"
            id="title"
            >
          <label for="title">{{ 'label_title' | localize }}</label>
          <span
            v-if="$v.title.$dirty && !$v.title.required"
            class="helper-text invalid">
            {{ 'error_cat_title' | localize }}
          </span>
        </div>

        <div class="input-field">
          <input
            :class="{invalid: $v.amount.$dirty && !$v.amount.minValue}"
            v-model.number="amount"
            id="amount"
            type="number"
          >
          <label for="amount">{{ 'label_amount' | localize }}</label>
          <span
            v-if="$v.amount.$dirty && !$v.amount.minValue"
            class="helper-text invalid">
            {{ 'error_min_amount' | localize }} {{ $v.amount.$params.minValue.min }}
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{ 'create' | localize }}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>
<script>
  import { required, minValue } from 'vuelidate/lib/validators'

  export default {
    name: "CreateCategory",
    data:() => ({
      title: '',
      amount: 50
    }),
    validations:{
      title:{ required },
      amount: { minValue: minValue(50) }
    },
    mounted(){
      M.updateTextFields();
    },
    methods: {
      async submitHandler() {
        if(this.$v.$invalid){
          this.$v.$touch();
          return false
        }

        try {
          const category = await this.$store.dispatch('createCategory',{
            title: this.title,
            amount: this.amount
          });
          this.title = '';
          this.amount = 50;

          this.$v.$reset();
          this.$message('Category has been created');
          this.$emit('created', category);

        }
        catch (e) { }

      }
    }
  }
</script>

<style scoped>

</style>
