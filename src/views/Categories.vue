<template>
  <div>
    <div class="page-title">
      <h3>{{ 'title_categories' | localize }}</h3>
    </div>
    <section>
      <app-loader v-if="loading"></app-loader>
      <div class="row" v-else>
        <CreateCategory @created="addNewCategory" />
        <EditCategory
          v-if="categories.length"
          :categories="categories"
          @updated="updateCategories"
          :key="categories.length + updateCount"/>
        <p v-else class="center">No categories</p>
      </div>
    </section>
  </div>
</template>

<script>
  import CreateCategory from "../components/Category/CreateCategory";
  import EditCategory from "../components/Category/EditCategory";
  export default {
    name: "Categories",
    components:{ CreateCategory, EditCategory },
    metaInfo(){
      return{
        title: this.$title('title_categories'),
      }
    },
    data:() =>({
      categories: [],
      loading: true,
      updateCount: 0
    }),
    async mounted(){
      this.categories = await this.$store.dispatch('fetchCategories');
      this.loading = false
    },
    methods: {
      addNewCategory(category) {
        this.categories.push(category);
      },
      updateCategories(category) {
        const idx = this.categories.findIndex(cat => cat.id === category.id);
        this.categories[idx].title = category.title;
        this.categories[idx].amount = category.amount;
        this.updateCount++
      }
    }
  }
</script>

<style scoped>

</style>
