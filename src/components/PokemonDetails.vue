<template>
    <div>
      <h1>RedRed</h1>
      <div v-if="pokemonData">
        <h2>{{ pokemonData.name }}</h2>
        <img :src="pokemonData.spriteURL" :alt="pokemonData.name" />
        <p><strong>Ability:</strong> {{ pokemonData.ability }}</p>
        <p><strong>Level:</strong> {{ pokemonData.level }}</p>
        <p><strong>Element:</strong> {{ pokemonData.element }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'PokemonDetails',
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
  