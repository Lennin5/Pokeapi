<template>
    <div>
      <h1>Abilities</h1>
      <div v-if="pokemonData">
        <h2>{{ pokemonData.name }}</h2>
        <ul>
          <li v-for="ability in pokemonData.abilities" :key="ability.name">
            {{ ability.name }}
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'PokemonAbilities',
    data() {
      return {
        pokemonData: null,
      };
    },
    created() {
      this.getPokemonData();
    },
    methods: {
      getPokemonData() {
        const pokemon = this.$route.query.pokemon;
        if (pokemon) {
          this.pokemonData = pokemon;
        }
      },
    },
  };
  </script>
  