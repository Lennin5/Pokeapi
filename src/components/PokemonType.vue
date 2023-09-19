<template>
    <div>
      <h1 style="text-align: center;" class="grey--text mt-2">Pokémon Types: {{ pokemonType }}</h1>
      
      <v-container>
      <v-row>
        <v-col
          v-for="(pokemon, index) in pokemonsList"
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
              <v-img :src="pokemon.spriteURL || pokemon.sprites[index]
              " max-height="300px" max-width="150" class="">
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
                    size="46" 
                    
                    :style="{ backgroundColor: getElementColorHex(pokemonType), 
                        boxShadow: pokemonType === 'flying' ? '0px 0px 3px 0px #343838' : 'none' }"
                        >
                    <img
                      alt="user"
                      :src="getElementTypeLogo(pokemonType)"
                      class="pa-2"
                    >
                  </v-avatar><br>
                  <v-avatar           
                    v-if="pokemon.element !== pokemonType"
                    size="46" 
                    :style="{ backgroundColor: getElementColorHex(pokemon.element) }"
                    class="ms-1">
                    <img
                      alt="user"
                      :src="getElementTypeLogo(pokemon.element)"
                      class="pa-2"
                    >
                  </v-avatar>
                    <p class="ml-3 font-weight-bold grey--text">
                      {{ pokemonType[0].toUpperCase() + pokemonType.slice(1) }}
                      {{ pokemonType !== pokemon.element ? ' / ' + pokemon.element[0].toUpperCase() + pokemon.element.slice(1) : '' }} <br>
                        <v-btn
                        :to="{ path: '/details', query: { pokemonObject: pokemon, spritesObject: Object.values(pokemon.sprites) } }"
                        :color="getElementColorNormal(pokemonType)"
                        :style="{background: pokemon.element !== pokemonType ? 'linear-gradient(to right, ' + getElementColorHex(pokemonType) + ', ' + getElementColorHex(pokemon.element) + ')' : 'none' }"
                        class="mt-2"
                        :dark="pokemonType === 'flying' ? false : true"
                        :lihght="pokemonType === 'flying' ? true : false">
                        Details
                      </v-btn>
                    </p>                  
                </v-card-title>                
              </v-timeline>
            </v-card-text>

          </v-card>
        </v-col>
      </v-row>      
    </v-container>

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
  