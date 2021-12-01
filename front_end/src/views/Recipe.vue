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
      <star-rating class = "recipeRating" v-bind:increment="0.5" v-bind:max-rating="5" v-model="recipe.rating" inactive-color="#c0c0c0" active-color="#6897bb" show-rating="false" v-bind:star-size="30">
      </star-rating>
      <img :src="recipe.path" />
      <h3>{{recipe.description}}</h3>
      <p class="ingredients">{{recipe.ingredients}}</p>
      <p>{{recipe.instructions}}</p>
      <hr />
      <div class="reviews">
        <h2>Reviews</h2>
        <p>Write a review!</p>
        <div class="write">
          <star-rating v-bind:increment="0.5" v-bind:max-rating="5" v-model="curRating" inactive-color="#c0c0c0" active-color="white" v-bind:star-size="30" class="element">
          </star-rating>
          <textarea v-model="review" rows=3 cols=50 class="element"></textarea>
          <button class="element" @click=submitReview>Submit</button>
        </div>
        <div class="review" v-for="(review, index) in recipe.reviews" :key="index">
          <star-rating v-bind:increment="0.5" v-bind:max-rating="5" v-model="review.rating" read-only="true" inactive-color="#c0c0c0" active-color="#6897bb" show-rating="false" class="reviewItem" v-bind:star-size="20">
          </star-rating>
          <p class="reviewItem">{{review.review}}</p>
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
        await axios.put('/api/recipes/' + this.recipe._id, {
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
img {
  height: 300px;
}

.recipeRating {
  justify-content: center;
  padding: 5px;
}
.write {
  display: flex;
  justify-content: center;
  margin: 20px;
  background-color: #6897bb;
}

.element {
  margin: 15px;
}

.rating {
  justify: center;
  justify-content: center
}

.reviewItem {
  margin: 10px;
}

.review {
  border: 3px solid black;
  margin: 10px;
  display: flex;
  justify-content: center
}
</style>
