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
            <!-- <div class="ml-8 mb-2 gray--text">
              <strong>Habilidad:</strong> {{ getPokemonAbility(pokemon) }}
            </div> -->
            <!-- <div class="ml-8 mb-2 gray--text">
              <strong>Nivel:</strong> {{ getPokemonLevel(pokemon) }}
            </div> -->
            <!-- <div class="ml-8 mb-2 gray--text">
              <strong>Elemento:</strong> {{ pokemon.element }}
            </div> -->
            <v-timeline align-top dense>
              <v-timeline-item
                :color="getElementColor(pokemon.element)"
                small
              >
                <div>
                  <div class="font-weight-normal">
                    <strong>Element:</strong> {{ pokemon.element[0].toUpperCase() + pokemon.element.slice(1)  }}
                  </div>
                  <v-btn
                  :color="getElementColor(pokemon.element)"
                    dark
                  >
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

export default {
  name: 'PokemonsList',

  data() {
    return {
      pokemons: [],
      messages: [
        {
          from: 'John Doe',
          time: '10:00 AM',
          message: 'Hello there!',
        },
        {
          from: 'Jane Smith',
          time: '11:30 AM',
          message: 'How are you?',
        },
      ],
    };
  },

  async created() {
    this.getPokemonData();
  },

  methods: {
    async getPokemonData() {
      try {
        const response = await pokeApi.get('pokemon/?offset=0&limit=50');
        const pokemons = response.data.results;
        console.log(pokemons);

        // Obtener los sprites, nombres, habilidades, niveles y elementos de todos los Pokémon
        const pokemonData = await Promise.all(
          pokemons.map(async (pokemon) => {
            const pokemonResponse = await pokeApi.get(`pokemon/${pokemon.name}`);
            const spriteURL = pokemonResponse.data.sprites.front_default;
            const ability = pokemonResponse.data.abilities[0].ability.name;
            const level = pokemonResponse.data.base_experience;
            const element = pokemonResponse.data.types[0].type.name;
            return {
              name: pokemon.name,
              spriteURL: spriteURL,
              ability: ability,
              level: level,
              element: element,
            };
          })
        );

        this.pokemons = pokemonData;
      } catch (error) {
        console.error(error);
      }
    },

    getPokemonAbility(pokemon) {
      return pokemon.ability;
    },

    getPokemonLevel(pokemon) {
      return pokemon.level;
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
        return 'deep-purple accent-2'
      case 'electric':
        return 'yellow darken-2'
      case 'ground':
        return 'brown darken-2'
      case 'fairy':
        return 'pink darken-1'
      default:
        return 'orange';
    }
  },

  },
};
</script>
  