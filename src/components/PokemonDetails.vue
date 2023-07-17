<template>
  <div>
    <div v-if="pokemonData">
      <h2>{{ pokemonData.name[0].toUpperCase() + pokemonData.name.slice(1) }}</h2>
      <div>
        <img v-for="(sprite, index) in pokemonData.sprites" :key="index" :src="sprite" :alt="pokemonData.name" />
      </div>

      
        <h3>Abilities</h3>
        <ul>
          <li v-for="(ability, index) in pokemonData.abilities" :key="index">
            {{ ability.ability.name }}
          </li>
        </ul>

        <!-- print element -->
        <h3>Element</h3>
        <p>{{ pokemonData.element[0].toUpperCase() + pokemonData.element.slice(1) }}</p>
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
      // const sprites = this.$route.query.spritesObject;
      const pokemon = this.$route.query.pokemonObject;
      if (pokemon) {
        // this.pokemonData = {
        //   name: pokemon.name,
        //   sprites: Array.isArray(sprites) ? sprites : [sprites],
        // };
        this.pokemonData = pokemon;
      }
      console.log(pokemon);
    },
  },
};
</script>
