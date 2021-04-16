<template>
  <div class="container">
    <div class="row my-5 justify-content-md-center">
      <div class="col-md-8 product">
        <h4>Update Product</h4>
        <hr>
          <div class="form-group">
            <label for="formGroupExampleInput">Category</label>
            <select v-model="categoryId" name="category" class="form-control">
              <option v-for="cat in categories" :key="cat._id" :value="cat._id">
                {{ cat.name }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="Owner">Owner</label>
            <select v-model="ownerId" :value="product.owner" name="category" class="form-control">
              <option
                v-for="owner in owners"
                :key="owner._id"
                :value="owner._id"
              >
                {{ owner.name }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="Owner">Title</label>
            <input type="text" v-model="title" class="form-control" placeholder="enter title" />
          </div>
          <div class="form-group">
            <label for="Price">Price</label>
            <input
              type="number"
              v-model="price"
              class="form-control"
              placeholder="enter price"
            />
          </div>
           <div class="form-group">
            <label for="Price">StockQuantity</label>
            <input
              type="number"
              v-model="stockQuantity"
              class="form-control"
              placeholder="enter price"
            />
          </div>
          <div class="form-group">
            <label for="description">Description</label>
            <textarea
              name="description"
              v-model="description"
              class="form-control"
              rows="3"
            ></textarea>
          </div>
          <div class="custom-file">
            <input
              type="file"
              @change="onFileSelected"
              class="custom-file-input"
              id="validatedCustomFile"
              required
            />
            <label class="custom-file-label" for="validatedCustomFile">{{
              filename ? filename : "upload photo..."
            }}</label>
            <small v-if="filename" class="text-info">{{ filename }}</small>
          </div>
          <hr />
          <button @click.prevent="updateProduct" class="btn btn-warning btn-block">Add Product</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, params }) {
    try {
      let categories = $axios.$get("categories");
      let owners = $axios.$get("owners");
      let product = $axios.$get(`products/${params.id}`)

      const [cateResponse, ownerResponse,productResponse] = await Promise.all([
        categories,
        owners,
        product
      ]);
      //   console.log(cateResponse.category);
      //   console.log(ownerResponse.owner);
      console.log(productResponse);
      return {
        categories: cateResponse.category,
        owners: ownerResponse.owner,
        product:productResponse.product
      };
    } catch (err) {
      console.log(err);
    }
  },
  data() {
    return {
      categoryId: null,
      ownerId: null,
      title: "",
      price: 0,
      description: "",
      selectedFile: null,
      filename: "",
      stockQuantity:""
    };
  },
  methods: {
    onFileSelected(e) {
      this.selectedFile = e.target.files[0];
      console.log(this.selectedFile);
      this.filename = e.target.files[0].name;
    },
   async updateProduct(){
        let product = new FormData();
        product.append('title', this.title);
        product.append('description', this.description);
        product.append('photo', this.selectedFile, this.selectedFile.name);
        product.append('stockQuantity', this.stockQuantity);
        product.append('price', this.price);
        product.append('category', this.categoryId);
        product.append('owner',this.ownerId)

        let response = await this.$axios.$put(`product/${this.$route.params.id}`, product)
        console.log(response)
        this.$router.push('/')
    }
  },
  
};
</script>

<style  scoped>
.product h4 {
  text-align: center;
}
</style>