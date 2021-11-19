<template>
<div class="home">
  <Recipes msg="Welcome to Your Vue.js App" />
</div>
</template>

<script>
// @ is an alias to /src
import Recipes from '@/components/Recipes.vue'

export default {
  name: 'Home',
  components: {
    Recipes
  },
  data: {
    recipes: [],
    search: []
  },
  created: {
    this.getRecipes();
  },
  computed: {

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
  }
}
</script>
