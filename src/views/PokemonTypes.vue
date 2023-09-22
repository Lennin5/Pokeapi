<template>
  <div style="margin-top: 40px">
    <h1 style="text-align: center;" class="grey--text">Pokémon Types</h1>
    <br>
      <v-container>
        <v-row>
            <!-- render image for each pokemon type -->
            <v-col
                v-for="(pokemonType, index) in pokemonTypes"
                :key="index"
                cols="12"
                sm="6"
                md="4"
                lg="3"
                xl="2"
                class=""
            >
            <v-card
                class="mx-auto rounded-xl"
                :color="getElementColorNormal(pokemonType.name)"
                :dark="pokemonType.name === 'flying' ? false : true"
                max-width="400"                    
            >                
                <div>
                    <v-card-title>
                        <img :src="getElementTypeLogo(pokemonType.name)" 
                            class="" 
                            style="
                            width: 150px; 
                            height: 150px; 
                            margin-top: 100px; 
                            margin-bottom: 5px; 
                            margin-left: 90px;
                            opacity: 0.1;
                            position: absolute;">
                        <v-avatar 
                        size="56" 
                        style="border-radius: 0px;"
                        >
                        <img
                            alt="type-logo"
                            :src="getElementTypeLogo(pokemonType.name)"
                            class="pa-2"
                        >
                        </v-avatar>      
                    <span class="text-h6 font-weight-bold">
                        {{ pokemonType.name[0].toUpperCase() + pokemonType.name.slice(1) }}
                    </span>
                    </v-card-title>

                    <v-card-text class="text-h5 font-weight-bold d-flex justify-center">
                        <v-btn
                            :to="{ path: '/type/' + pokemonType.name }"
                            :color="getElementColorNormal(pokemonType.name)"
                            class="mt-2"
                            :lihght="pokemonType.name === 'flying' ? true : false">
                            View Pokemons
                        </v-btn>
                    </v-card-text>

                    <v-card-actions>
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
                                {{ pokemonTypes[index].numberOfPokemon }}
                            </span>
                        </div>
                        
                        <div title="Pokemon's Moves" style="cursor: help">
                            <v-icon class="mr-1">
                                mdi-star
                            </v-icon>
                            <span class="subheading mr-2">
                                {{ pokemonTypes[index].pokemonMoves }}
                            </span>
                        </div>

                        <div title="Pokemon's Generations" style="cursor: help">
                            <v-icon class="mr-1">
                                mdi-cube
                            </v-icon>
                            <span class="subheading">
                                {{ pokemonTypes[index].pokemonGeneration }}
                            </span>
                        </div>

                        </v-row>
                    </v-list-item>
                    </v-card-actions>
                </div>
            </v-card>

            </v-col>
        </v-row>
      </v-container>
    </div>
  </template>
  
  <script>
  import pokeApi from '../plugins/axios';
  export default {
      name: 'PokemonTypes',

      data() {
          return {
              pokemonTypes: [],
          };
      },
  
      async created() {
          this.getPokemonTypes();
      },
  
      methods: {
        async getPokemonTypes() {
            try {
                const response = await pokeApi.get('/type');
                const pokemonTypes = response.data.results;

                const pokemonDataTypes = await Promise.all(
                    pokemonTypes.map(async (type) => {
                        const pokemonResponse = await pokeApi.get(`/type/${type.name}`);
                        const pokemonList = pokemonResponse.data.pokemon;
                        const pokemonMoves = pokemonResponse.data.moves;
                        const pokemonGeneration = pokemonResponse.data.game_indices;
                        // console.log(`Type: ${type.name}, Number of Pokemon: ${pokemonList.length || 0} and Moves: ${pokemonMoves.length || 0}`);
                        return {
                            name: type.name,
                            type: type.name,
                            numberOfPokemon: pokemonList.length,
                            pokemonMoves: pokemonMoves.length,
                            pokemonGeneration: pokemonGeneration.length,
                        };
                    })
                );

                this.pokemonTypes = pokemonDataTypes;

            } catch (error) {
                console.log(error);
            }
        },
        getElementTypeLogo(element) {
        return this.$root.getElementTypeLogo(element);
        },
        getElementColorNormal(element) {
        return this.$root.getElementColorNormal(element);
        },
        getElementColorHex(element) {
        return this.$root.getElementColorHex(element);      
        }            
      },
  }
  </script>
  
  <style>
  
  </style>