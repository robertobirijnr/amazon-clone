<template>
  <div class="container">
    <h4 class="py-3">All Products</h4>
    <div class="d-flex">
      <nuxt-link to="/products" class="btn btn-warning btn-sm mr-3"
        >Add a new product</nuxt-link
      >
      <nuxt-link to="/category" class="btn btn-info btn-sm mr-3"
        >Add a new category</nuxt-link
      >
      <nuxt-link to="/owner" class="btn btn-info btn-sm"
        >Add a new owner</nuxt-link
      >
    </div>

    <div class="d-flex">
      <div v-for="product in products" :key="product.index">
        <div class="card mt-5 mr-3" style="width: 18rem">
          <img class="card-img-top" :src="product.photo" alt="Card image cap" />
          <div class="card-body">
            <div class="d-flex">
              <i class="fa fa-star text-warning" aria-hidden="true"></i>
              <i class="fa fa-star text-warning" aria-hidden="true"></i>
              <i class="fa fa-star text-warning" aria-hidden="true"></i>
              <i class="fa fa-star text-warning" aria-hidden="true"></i>
              <i class="fa fa-star text-warning" aria-hidden="true"></i>
              (1713)
            </div>
            <h5 class="card-title">{{ product.title }}</h5>
            <p class="card-text">ghs {{ product.price }}</p>
            <div class="d-flex justify-content-between">
              <nuxt-link  :to="`products/${product._id}`" class="btn btn-warning btn-sm">Update</nuxt-link>
              <a href="#" class="btn btn-warning btn-sm">Delete</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    try {
      const response = await $axios.$get("products");
      console.log(response.product);
      return {
        products: response.product,
      };
    } catch (err) {
      console.log(err);
    }
  },
};
</script>

<style lang="scss" scoped>
</style>