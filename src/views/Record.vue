<template>
  <div>
    <div class="page-title">
      <h3>{{ 'title_record' | localize }}</h3>
    </div>
    <app-loader v-if="loading"></app-loader>
    <p v-else-if="!categories.length" class="center">
      You don't have any categories
      <router-link to="/categories">Add new category</router-link>
    </p>
    <form
      @submit.prevent="submitHandler"
      v-else
      class="form">
      <div class="input-field" >
        <select
          v-model="category"
          ref="select"
          id="select">
          <option
            v-for="cat in categories"
            :key="cat.id"
            :value="cat.id">
            {{ cat.title }}
          </option>
        </select>
        <label for="select">{{ 'label_choose_cat' | localize }}</label>
      </div>

      <p>
        <label>
          <input
            v-model="type"
            class="with-gap"
            name="type"
            type="radio"
            value="income"
          />
          <span>{{ 'income' | localize }}</span>
        </label>
      </p>

      <p>
        <label>
          <input
            v-model="type"
            class="with-gap"
            name="type"
            type="radio"
            value="expense"
          />
          <span>{{ 'expense' | localize }}</span>
        </label>
      </p>

      <div class="input-field">
        <input
          v-model.number="amount"
          :class="{invalid: $v.amount.$dirty && !$v.amount.minValue}"
          id="amount"
          type="number"
        >
        <label for="amount">{{ 'sum' | localize }}</label>
        <span
          v-if="$v.amount.$dirty && !$v.amount.minValue"
          class="helper-text invalid">
            {{ 'error_min_amount' | localize }} {{ $v.amount.$params.minValue.min }}
          </span>
      </div>

      <div class="input-field">
        <input
          v-model="description"
          :class="{invalid: $v.description.$dirty && !$v.description.required}"
          id="description"
          type="text"
        >
        <label for="description">{{ 'label_description' | localize }}</label>
        <span
          v-if="$v.description.$dirty && !$v.description.required"
          class="helper-text invalid">
            {{ 'error_desc' | localize }}
        </span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{ 'create' | localize }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
  import { required, minValue } from 'vuelidate/lib/validators';
  import { mapGetters } from 'vuex';
  export default {
    name: "Record",
    metaInfo(){
      return{
        title: this.$title('title_record'),
      }
    },
    data:() =>({
      loading: true,
      select: null,
      categories: [],
      category: null,
      type: 'income',
      amount: 1,
      description: ''
    }),
    validations:{
      amount: { minValue: minValue(1) },
      description: { required }
    },
    async mounted() {
      this.categories = await this.$store.dispatch('fetchCategories');
      this.loading = false;

      if(this.categories.length){
        this.category = this.categories[0].id
      }

      setTimeout(() => {
        this.select = M.FormSelect.init(this.$refs.select);
        M.updateTextFields();
      }, 0);

    },
    destroyed() {
      if(this.select && this.select.destroy){
        this.select.destroy()
      }
    },
    computed:{
      ...mapGetters(['info']),
      canCreateRecord(){
        if(this.type === 'income'){
          return true
        }
        return this.info.balance >= this.amount
      }
    },
    methods: {
      async submitHandler() {
        if(this.$v.$invalid){
          this.$v.$touch();
          return false
        }

        if(this.canCreateRecord){
          try {
            await this.$store.dispatch('createRecord', {
              categoryId: this.category,
              amount: this.amount,
              description: this.description,
              type: this.type,
              date: new Date().toJSON()
            });

            const balance = this.type === 'income'
              ? this.info.balance + this.amount
              : this.info.balance - this.amount;

            await this.$store.dispatch('updateInfo', { balance });
            this.$message('Record has been successfully added');
            this.$v.$reset();
            this.amount = 1;
            this.description = ''
          }
          catch (e) { }

        }else{
          this.$message(`You have not enough money on your balance. (-${this.amount - this.info.balance})`);
        }
      }
    }
  }
</script>

<style scoped>

</style>
