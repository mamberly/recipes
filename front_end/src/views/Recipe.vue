<template>
<div>
  <section class="wrapper">
    <button @click=editRecipe>Edit</button>
    <div v-if=edit class="edit">
      <h1>Edit the Recipe</h1>
      <div class="form">
        <input type="text" v-model="recipe.title" placeholder="Name" size=50>
        <p></p>
        <textarea v-model="recipe.description" rows=3 cols=50></textarea>
        <p></p>
        <textarea v-model="recipe.ingredients" rows=5 cols=50></textarea>
        <p></p>
        <textarea v-model="recipe.instructions" rows=5 cols=50></textarea>
        <p></p>
        <button @click="upload">Update</button>
      </div>
    </div>
    <div v-else class="display">
      <h1>{{recipe.title}}</h1>
      <star-rating v-model="recipe.rating" increment=.5 class="rating"></star-rating>
      <img :src="recipe.path" />
      <h3>{{recipe.description}}</h3>
      <p>{{recipe.ingredients}}</p>
      <p>{{recipe.instructions}}</p>

      <div class="reviews">
        <h2>Reviews</h2>
        <p>Write a review!</p>
        <div class="write">
          <star-rating v-model="curRating" increment=.5 class="rating"></star-rating>
          <textarea v-model="review" rows=3 cols=50></textarea>
          <button @click=submitReview>Submit</button>
        </div>
        <div class="review" v-for="(review, index) in recipe.reviews" :key="index">
          <star-rating read-only="true" increment=.5 v-model="review.rating" class="rating"></star-rating>
          {{review.review}}
        </div>
      </div>
    </div>
  </section>
</div>
</template>

<script>
import axios from 'axios';
import StarRating from 'vue-star-rating'
export default {
  name: 'Recipe',
  data() {
    return {
      recipe: null,
      edit: false,
      curRating: 5,
      review: ""
    }
  },
  components: {
    StarRating
  },
  created() {
    this.getRecipe();
  },
  methods: {
    async getRecipe() {
      try {
        let response = await axios.get("/api/recipes/" + this.$route.params.id);
        this.recipe = response.data;
        console.log(this.recipe);
      } catch (error) {
        console.log(error);
      }
    },
    async deleteRecipe() {
      try {
        await axios.delete("/api/recipes/" + this.$route.params.id);
      } catch (error) {
        console.log(error);
      }
    },
    editRecipe() {
      this.edit = true;
    },
    async upload() {
      try {
        await axios.put('/api/recipes/' + this.recipe.id, {
          title: this.recipe.title,
          description: this.recipe.description,
          instructions: this.recipe.instructions,
          ingredients: this.recipe.ingredients,
        });
        this.edit = false;
      } catch (error) {
        console.log(error);
      }
    },
    async submitReview() {
      try {
        await axios.post("/api/recipes/" + this.$route.params.id + "/review", {
          review: this.review,
          rating: this.curRating
        });
        this.review = "";
        this.curRating = 5;
        this.getRecipe();
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style scoped>
.image {
  width: 30%;
}
</style>
