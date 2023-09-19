<template>
    <div >
      <div :style="{ backgroundColor: getElementColorHex(pokemonType) }">

      </div>

      <v-row justify="center" class="mt-5">
        <v-col cols="9">
          <v-card
              class="mx-auto rounded-xl"
              :color="getElementColorNormal(pokemonType)"
              :dark="pokemonType === 'flying' ? false : true"
            >                
                <div>
                    <v-card-title>
                        <img :src="getElementTypeLogo(pokemonType)" 
                            class="" 
                            style="
                            width: 180px; 
                            height: 180px; 
                            margin-top: 60px; 
                            margin-bottom: 0px; 
                            margin-left: 900px;
                            opacity: 0.1;
                            position: absolute;">
                        <v-avatar 
                        size="90" 
                        >
                        <img
                            alt="type-logo"
                            :src="getElementTypeLogo(pokemonType)"
                            class="pa-2"
                        >
                        </v-avatar>
                        
                        
                        <div class="d-flex justify-end" style="border: 1px solid blue">
                          <div>
                            <span class="text-h4 font-weight-bold">
                                {{ pokemonType[0].toUpperCase() + pokemonType.slice(1) }}
                            </span>                            
                          </div>
                          <div>
                            <v-list-item class="grow">
                                <v-row
                                    align="center"
                                    justify="space-around"
                                >
                                <div title="Pokemon's Number" style="cursor: help">
                                    <v-icon class="mr-1">
                                        mdi-pokeball
                                    </v-icon>
                                    <span class="subheading mr-2">
                                        97
                                    </span>
                                </div>
                                
                                <div title="Pokemon's Moves" style="cursor: help">
                                    <v-icon class="mr-1">
                                        mdi-star
                                    </v-icon>
                                    <span class="subheading mr-2">
                                        98
                                    </span>
                                </div>

                                <div title="Pokemon's Generations" style="cursor: help">
                                    <v-icon class="mr-1">
                                        mdi-cube
                                    </v-icon>
                                    <span class="subheading">
                                        99
                                    </span>
                                </div>

                                </v-row>
                            </v-list-item>                            
                          </div>
                        </div>
                    </v-card-title>

                    <v-card-actions>

                    </v-card-actions>
                </div>
            </v-card>
        </v-col>    
      </v-row>  


      <h1 style="text-align: center;" class="grey--text mt-2">Pokémon Types: {{ pokemonType }}</h1>
      
      <v-container>
        <FloatingButtons />
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
              <div class="font-weight-bold ml-0 gray--text d-flex justify-center">
                <h2>                  
                  {{ pokemon.name[0].toUpperCase() + pokemon.name.slice(1) }}
                </h2>
              </div>
              <div class="font-weight-bold mt-2 grey--text d-flex justify-center">
                <h4>                  
                  {{ pokemonType[0].toUpperCase() + pokemonType.slice(1) }}
                      {{ pokemonType !== pokemon.element ? ' / ' + pokemon.element[0].toUpperCase() + pokemon.element.slice(1) : '' }}
                </h4>
              </div>              
              <div class="d-flex justify-center mb-2">
                <v-avatar 
                    size="45"                     
                    :style="{ backgroundColor: getElementColorHex(pokemonType), 
                      boxShadow: pokemonType === 'flying' ? '0px 0px 3px 0px #343838' : 'none' }">
                    <img
                      alt="user"
                      :src="getElementTypeLogo(pokemonType)"
                      class="pa-2"
                    >
                  </v-avatar><br>
                  <v-avatar           
                    v-if="pokemon.element !== pokemonType"
                    size="45" 
                    :style="{ backgroundColor: getElementColorHex(pokemon.element), 
                      boxShadow: pokemon.element === 'flying' ? '0px 0px 3px 0px #343838' : 'none' }"
                    class="ms-1">
                    <img
                      alt="user"
                      :src="getElementTypeLogo(pokemon.element)"
                      class="pa-2"
                    >
                  </v-avatar>
              </div>
              <div class="d-flex justify-center pb-4">
                <v-btn
                :to="{ path: '/details', query: { pokemonObject: pokemon, spritesObject: Object.values(pokemon.sprites) } }"
                :color="getElementColorNormal(pokemonType)"
                :style="{background: pokemon.element !== pokemonType ? 'linear-gradient(to right, ' + getElementColorHex(pokemonType) + ', ' + getElementColorHex(pokemon.element) + ')' : 'none' }"
                class="mt-2"
                :dark="pokemonType === 'flying' ? false : true"
                :lihght="pokemonType === 'flying' ? true : false">
                  View Details
                      </v-btn>                
              </div>
            </v-card-text>

          </v-card>
        </v-col>
      </v-row>      
    </v-container>

    </div>
  </template>
  
  <script>
    import pokeApi from '../plugins/axios';
    import FloatingButtons from './FloatingButtons.vue';
  
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
    components: {
      FloatingButtons,
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
  