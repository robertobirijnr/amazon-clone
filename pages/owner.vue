<template>
  <div class="container">
    <div class="row my-5 justify-content-md-center">
      <div class="col-md-8 product">
        <h4>Create new Category</h4>
        <hr />
        <div class="form-group">
          <label for="name">Name</label>
          <input
            type="text"
            v-model="name"
            class="form-control"
            placeholder="name"
          />
        </div>
        <div class="form-group">
          <label for="about"> About</label>
          <textarea
            name="about"
            class="form-control"
            v-model="about"
            rows="4"
            placeholder="about"
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
        </div>

        <button
          @click.prevent="createOwner"
          class="btn btn-warning mt-3 pull-right"
        >
          add owner
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
      about: "",
      filename: "",
      selectedFile: "",
    };
  },
  methods: {
    onFileSelected(e) {
      this.selectedFile = e.target.files[0];
      this.filename = e.target.files[0].name;
    },
    async createOwner() {
      try {
        let owner = await new FormData();
        owner.append("name", this.name),
          owner.append("about", this.about),
          owner.append("photo", this.selectedFile, this.selectedFile.name);

        let response = this.$axios.$post("create-owner", owner);
        console.log(response);
        this.$router.push("/");
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
