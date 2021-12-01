<template>
<div class="home">
  <section class="image-gallery">
    <div class="image" v-for="recipe in recipes" :key="recipe.id">
      <router-link :to="{ name: 'recipe', params: { id: recipe.id}}">
        <h2>{{recipe.title}}</h2>
        <img :src="recipe.path" />
        <p>{{recipe.description}}</p>
      </router-link>
      <button @click=deleteRecipe(recipe.id)>Delete</button>
    </div>
  </section>
</div>
</template>

<script>
import axios from 'axios';
// @ is an alias to /src
export default {
  name: 'Home',
  data() {
    return {
      recipes: [],
    }
  },
  created() {
    this.getRecipes();
  },
  methods: {
    async getRecipes() {
      try {
        let response = await axios.get("/api/recipes");
        this.recipes = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteRecipe(id) {
      try {
        await axios.delete("/api/recipes/" + id);
      } catch (error) {
        console.log(error);
      }
      this.getRecipes();
    },
  }
}
</script>

<style scoped>
.image h2 {
  font-style: italic;
}

/* Masonry */
*,
*:before,
*:after {
  box-sizing: inherit;
}

.image-gallery {
  column-gap: 1.5em;
}

.image {
  margin: 0 0 1.5em;
  display: inline-block;
  width: 100%;
}

.image img {
  width: 100%;
}

/* Masonry on large screens */
@media only screen and (min-width: 1024px) {
  .image-gallery {
    column-count: 4;
  }
}

/* Masonry on medium-sized screens */
@media only screen and (max-width: 1023px) and (min-width: 768px) {
  .image-gallery {
    column-count: 3;
  }
}

/* Masonry on small screens */
@media only screen and (max-width: 767px) and (min-width: 540px) {
  .image-gallery {
    column-count: 2;
  }
}
</style>
