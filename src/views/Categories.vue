<template>
  <div>
    <div class="page-title">
      <h3>Categories</h3>
    </div>
    <section>
      <div class="row">
        <CreateCategory @created="addNewCategory" />
        <EditCategory />
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
    data:() =>({
      categories: []
    }),
    methods: {
      addNewCategory(category) {
        this.categories.push(category);
        console.log(this.categories);
      }
    }
  }
</script>

<style scoped>

</style>
