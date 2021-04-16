<template>
  <div class="container">
    <div class="row my-5 justify-content-md-center">
      <div class="col-md-8 product">
        <h4>Create new Category</h4>
        <hr />
        <div class="form-group">
          <label for="category">New Category</label>
          <input
            v-model="name"
            type="text"
            class="form-control"
            placeholder="new category name here..."
          />
        </div>
        <button
          @click.prevent="createCategory"
          class="btn btn-warning pull-right"
        >
          New Category
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
    };
  },
  methods: {
    async createCategory() {
     let res = await this.$axios.$post("create-category",{
         name : this.name
     });
      console.log(res)
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>