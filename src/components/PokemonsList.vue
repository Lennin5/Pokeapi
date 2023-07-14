<template>
  <div>
    <h1 style="text-align: center;">Pokémon Sprites</h1>
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
        class=""
        style="display: flex; justify-content: center;"
      >
        <v-card width="400" style="border-radius: 20px !important;">
          <div class="d-flex justify-center">
            <v-img :src="pokemon.spriteURL" max-height="300px" max-width="150" class="">
            <v-app-bar flat color="rgba(0, 0, 0, 0)">
              <v-app-bar-nav-icon color="white"></v-app-bar-nav-icon>
              <v-toolbar-title class="text-h6 gray--text pl-0"></v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="white" icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </v-app-bar>
          </v-img>
          </div>
          <v-card-text>
            <div class="font-weight-bold ml-8 mb-2 gray--text">
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
                color="orange"
                small
              >
                <div>
                  <div class="font-weight-normal">
                    <strong>Habilidad</strong> {{ getPokemonAbility(pokemon)[0].toUpperCase() + getPokemonAbility(pokemon).slice(1)  }}
                  </div>
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
        const response = await pokeApi.get('pokemon');
        const pokemons = response.data.results;

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
  },
};
</script>
  