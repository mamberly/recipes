<template>
<div class="add">
  <h1>Add a Recipe</h1>
  <div class="form">
    <input type="text" v-model="title" placeholder="Name" size=50>
    <p></p>
    <textarea placeholder="Description" v-model="description" rows=3 cols=50></textarea>
    <p></p>
    <textarea placeholder="Ingredients" v-model="ingredients" rows=5 cols=50></textarea>
    <p></p>
    <textarea placeholder="Instructions" v-model="instructions" rows=5 cols=50></textarea>
    <p></p>
    <input type="file" name="photo" @change="fileChanged">
    <button @click="upload">Add</button>
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
//import crypto;

export default {
  name: 'Home',
  data() {
    return {
      recipes: [],
      title: "",
      description: "",
      instructions: "",
      ingredients: ""
    }
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0]
    },
    async upload() {
      try {
        const formData = new FormData();
        formData.append('photo', this.file, this.file.name)
        let r1 = await axios.post('/api/photos', formData);
        console.log(r1);
        await axios.post('/api/recipes', {
          title: this.title,
          description: this.description,
          path: r1.data.path,
          instructions: this.instructions,
          ingredients: this.ingredients
        });
        this.title = "";
        this.description = "";
        this.instructions = "";
        this.ingredients = "";
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>

<style>
input[type='text'] {
  font-size: 18px;
}
</style>
