<template>
    <div>
      <h1>Pokémon de Tipo {{ pokemonType }}</h1>
      
      <!-- <v-container>
      <v-row>
        <v-col
          v-for="pokemon in pokemonsList"
          :key="pokemon.name"
          cols="12"
          xs="12"
          sm="6"
          md="4"
          lg="4"
          xl="3"
          class="d-flex justify-center"
        >
          <v-card width="400" style="border-radius: 20px !important;">
            <div class="d-flex justify-center">
              <v-img :src="pokemon.url" max-height="300px" max-width="150" class="">
              </v-img>
            </div>
            <v-card-text>
              <div class="font-weight-bold ml-8 gray--text d-flex justify-left">
                <h2>
                  {{ pokemon.name[0].toUpperCase() + pokemon.name.slice(1) }}
                </h2>
              </div>

              <v-timeline align-bottom dense class="mt-2" style="padding-top: 0px !important">
                <v-card-title class="white--text mt-0">
                  <v-avatar 
                    size="56" 
                    :style="{ backgroundColor: getElementColorHex(pokemon.element) }">
                    <img
                      alt="user"
                      :src="getElementTypeLogo(pokemon.element)"
                      class="pa-2"
                    >
                  </v-avatar>
                    <p class="ml-3 font-weight-bold grey--text">
                      {{ pokemon.element[0].toUpperCase() + pokemon.element.slice(1) }} <br>
                        <v-btn
                        :to="{ path: '/details', query: { pokemonObject: pokemon, spritesObject: Object.values(pokemon.sprites) } }"
                        :color="getElementColorNormal(pokemon.element)"
                        class="mt-2"
                        dark>

                        Details
                      </v-btn>
                    </p>                  
                </v-card-title>                
              </v-timeline>
            </v-card-text>

          </v-card>
        </v-col>
      </v-row>      
    </v-container> -->

    </div>
  </template>
  
  <script>
    import pokeApi from '../plugins/axios';
  
  export default {
    data() {
      return {
        pokemonType: this.$route.params.type,
        pokemonsList: [],
      };
    },
    mounted() {
      this.fetchPokemonsByType();
    },
    methods: {
      async fetchPokemonsByType() {
        try {
          const response = await pokeApi.get('/type/' + this.pokemonType);
          const pokemons = response.data.pokemon;

          console.log(pokemons, 'pokemons');

          const pokemonData = await Promise.all(
          pokemons.map(async (pokemon) => {
            const pokemonResponse = await pokeApi.get(`/pokemon/${pokemon.pokemon.name}`);
            // console.log(pokemon.pokemon.name);
            // console.log(pokemonResponse.data);

            const name = pokemonResponse.data.name;
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
              name: name,
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

        this.pokemonsList = pokemonData;          
        console.log(this.pokemonsList, 'pokemonsList');

        } catch (error) {
          console.error('Error al cargar los Pokémon:', error);
        }
      },
    },
  };
  </script>
  