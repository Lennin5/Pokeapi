<template>
  <div>
    <v-container>
      <h1>Pokémon Details</h1>

      <v-container>
      <br>
      <v-row justify="space-around">
        <v-card style="border: 1px solid transparent; border-radius: 20px !important" 
        v-for="(pokemon) in pokemons" :key="pokemon.index" 
        width="400" class="mb-10 rounded">
          <!-- <v-img
            height="300px"
            style="object-fit: contain !important; border: 1px solid none !important"
            :src="pokemon.url"
          >
          </v-img> -->

          <p>{{ pokemon.index }}</p>
          <p>{{ pokemon.name }}</p>
          <p>{{ pokemon.url }}</p>

        </v-card>
      </v-row>
    </v-container>

    </v-container>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ExampleTest',

  data() {
    return {
      pokemons: [] // Definir la variable pokemons como un array vacío
    };
  },

  mounted() {
  axios.get('https://pokeapi.co/api/v2/pokemon/1')
    .then(response => {
      this.pokemons = response.data.abilities.map(({ ability }, index) => ({
        name: ability.name,
        url: ability.url,
        index: index + 1 // Agregar +1 para tener índices basados en 1 en lugar de 0
      }));

      console.log(this.pokemons[0].name);
    })
    .catch(error => {
      console.log(error);
    });  
  },

  props: {
    palabra: String
  }

};
</script>
