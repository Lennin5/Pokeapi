<template>
  <div style="margin-top: 40px">
    <h1 style="text-align: center;">Pokémon Sprites</h1>
    <br>
    <v-row>
      <v-col
        v-for="pokemon in pokemons"
        :key="pokemon.name"
        cols="12"
        xs="12"
        sm="6"
        md="4"
        lg="4"
        xl="4"
        class="d-flex justify-center"
      >
        <v-card width="400" style="border-radius: 20px !important;">
          <div class="d-flex justify-center">
            <v-img :src="pokemon.spriteURL" max-height="300px" max-width="150" class="">
            </v-img>
          </div>
          <v-card-text>
            <div class="font-weight-bold ml-8 mb-2 gray--text d-flex justify-left">
              <h2>
                {{ pokemon.name[0].toUpperCase() + pokemon.name.slice(1) }}
              </h2>
            </div>
            <v-timeline align-top dense>
              <v-timeline-item :color="getElementColor(pokemon.element)" small>
                <div>
                  <div class="font-weight-normal">
                    <strong>Element:</strong> {{ pokemon.element[0].toUpperCase() + pokemon.element.slice(1)  }}
                  </div>
                  <v-btn
                    :to="{ path: '/details', query: { pokemonObject: pokemon, spritesObject: Object.values(pokemon.sprites) } }"
                    :color="getElementColor(pokemon.element)"
                    class="mt-2"
                    dark
                  >
                    <v-icon class="mr-2">mdi-open-in-new</v-icon>
                    Details
                  </v-btn>
                </div>
              </v-timeline-item>
            </v-timeline>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import pokeApi from '../plugins/axios';
import BgPokemon from '@/assets/img/bg-pokemon.png';

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

  methods: {
    async getPokemonData() {
      try {
        const response = await pokeApi.get('pokemon/?offset=0&limit=10');
        const pokemons = response.data.results;
        console.log(pokemons);

        const pokemonData = await Promise.all(
          pokemons.map(async (pokemon) => {
            const pokemonResponse = await pokeApi.get(`pokemon/${pokemon.name}`);
            const spriteURL = pokemonResponse.data.sprites.front_default;
            const element = pokemonResponse.data.types[0].type.name;
            const abilities = pokemonResponse.data.abilities;
            
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
            };
          })
        );

        this.pokemons = pokemonData;
      } catch (error) {
        console.error(error);
      }
    },

    getElementColor(element) {
      switch (element) {
        case 'grass':
          return 'teal lighten-2';
        case 'fire':
          return 'red lighten-1';
        case 'water':
          return 'light-blue lighten-2';
        case 'bug':
          return 'green accent-4';
        case 'normal':
          return 'orange';
        case 'poison':
          return 'deep-purple accent-2';
        case 'electric':
          return 'yellow darken-2';
        case 'ground':
          return 'brown darken-2';
        case 'fairy':
          return 'pink lighten-2';
        case 'fighting':
          return 'deep-orange lighten-2';
        case 'rock':
          return 'grey darken-1';
        case 'psychic':
          return 'pink darken-1';
        case 'ghost':
          return 'deep-purple lighten-2';
        case 'ice':
          return 'cyan lighten-3';
        case 'dragon':
          return 'indigo darken-1';
        case 'dark':
          return 'grey darken-3';
        case 'steel':
          return 'blue-grey darken-1';
        default:
          return 'orange';
      }
    },
  },

};
</script>
