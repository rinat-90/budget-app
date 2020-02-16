<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Edit</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field" >
          <select
            v-model="current"
            ref="select"
            id="cats">
            <option
              v-for="cat in categories"
              :key="cat.id"
              :value="cat.id">
              {{ cat.title }}
            </option>
          </select>
          <label for="cats">Choose category</label>
        </div>

        <div class="input-field">
          <input
            v-model="title"
            :class="{invalid: $v.title.$dirty && !$v.title.required}"
            type="text"
            id="title"
          >
          <label for="title">Title</label>
          <span
            v-if="$v.title.$dirty && !$v.title.required"
            class="helper-text invalid">
            Enter name of the category
          </span>
        </div>

        <div class="input-field">
          <input
            :class="{invalid: $v.amount.$dirty && !$v.amount.minValue}"
            v-model.number="amount"
            id="amount"
            type="number"
          >
          <label for="amount">Amount</label>
          <span
            v-if="$v.amount.$dirty && !$v.amount.minValue"
            class="helper-text invalid">
            Minimal amount is {{ $v.amount.$params.minValue.min }}
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Update
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
  import { required, minValue } from 'vuelidate/lib/validators'
  export default {
    name: "EditCategory",
    props: ['categories'],
    data:() =>({
      select: null,
      title: '',
      amount: 50,
      current: null
    }),
    validations:{
      title:{ required },
      amount: { minValue: minValue(50) }
    },
    mounted(){
     this.select =  M.FormSelect.init(this.$refs.select);
      M.updateTextFields();
    },
    destroyed() {
      if (this.select && this.select.destroy){
        this.select.destroy()
      }
    },
    watch:{
      current(catId){
        const { title, amount } = this.categories.find(cat => cat.id === catId);
        this.title = title;
        this.amount = amount
      }
    },
    created() {
      const { id, title, amount } = this.categories[0];
      this.current = id;
      this.title = title;
      this.amount = amount
    },
    methods: {
      async submitHandler() {
        if(this.$v.$invalid){
          this.$v.$touch();
          return false
        }

        const category = {
          id: this.current,
          title: this.title,
          amount: this.amount
        };
        try {
          await this.$store.dispatch('updateCategory', category);
          this.$message('Category successfully updated');
          this.$emit('updated', category);
        }catch (e) { }
      }
    }
  }
</script>

<style scoped>

</style>
