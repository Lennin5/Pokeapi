<template>
    <div class="mt-10 mt-lg-0">
      <!--Horizontal scroll of all pokemons component-->
      <HorizontalScrollAllPokemons />

      <!--Horizontal scroll of legendary pokemons component-->
      <HorizontalScrollLegendaryPokemons />        

      <!--Horizontal scroll of all types component-->
      <HorizontalScrollAllTypes />      

      <!--Horizontal scroll of all regions component-->
      <HorizontalScrollAllRegions />
    </div>
  </template>
  
  <script>
  import pokeApi from '../plugins/axios';
  import BgPokemon from '@/assets/img/bg-pokemon.png';
  import HorizontalScrollAllPokemons from '@/components/horizontal_scrolls/AllPokemons.vue';
  import HorizontalScrollAllTypes from '@/components/horizontal_scrolls/AllTypes.vue';
  import HorizontalScrollAllRegions from '@/components/horizontal_scrolls/AllRegions.vue';
  import HorizontalScrollLegendaryPokemons from '@/components/horizontal_scrolls/LegendaryPokemons.vue';
  
  export default {
    name: 'PokemonsList',
  
    data() {
      return {
        pokemons: [],
        BgPokemon: BgPokemon,  
      };
    },
  
    async created() {
      this.getPokemonData();
    },
    
    components: {
      HorizontalScrollAllPokemons,
      HorizontalScrollAllTypes,
      HorizontalScrollAllRegions,
      HorizontalScrollLegendaryPokemons,
    },

    methods: {
      async getPokemonData() {
        try {
          // 640 we encounter a flying pokemon (white color)
          const response = await pokeApi.get(`/pokemon/?offset=1&limit=${this.pokemonsLimit}`);
          const pokemons = response.data.results;
  
          const pokemonData = await Promise.all(
            pokemons.map(async (pokemon) => {
              const pokemonResponse = await pokeApi.get(`/pokemon/${pokemon.name}`);
              const spriteURL = pokemonResponse.data.sprites.front_default;
              const element = pokemonResponse.data.types[0].type.name;
              const abilities = pokemonResponse.data.abilities;
  
              const id = pokemonResponse.data.id;
              const level = pokemonResponse.data.base_experience;
              const height = pokemonResponse.data.height;
              
              const sprites = [
                pokemonResponse.data.sprites.front_default,
                pokemonResponse.data.sprites.back_default,
                pokemonResponse.data.sprites.front_shiny,
                pokemonResponse.data.sprites.back_shiny,
              ];
              return {
                name: pokemon.name,
                spriteURL: spriteURL,
                element: element,
                sprites: sprites,
                abilities: abilities,
                id: id,
                level: level,
                height: height,
              };
            })
          );
  
          this.pokemons = pokemonData;
        } catch (error) {
          console.error(error);
        }
      }, 
    },

  };
  </script>
  