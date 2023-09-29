<template>
  <div class="mt-10 mt-lg-0">
      <v-container>
        <!-- Skeleton loader -->
        <v-row v-if="pokemonTypes.length === 0">
            <v-col
                cols="12"
                sm="6"
                md="4"
                lg="3"
                xl="2"
                class="" v-for="n in 20" :key="n">                
                <v-card 
                class="mx-auto rounded-xl"
                :style="{
                    width: '400px',
                    height: '212px',  
                    }" 
                    >
                    <div class="d-flex justify-start align-center container pt-5 ms-3">
                        <v-skeleton-loader
                        type="avatar"
                        ></v-skeleton-loader>
                        <v-skeleton-loader
                        type="text@1" class="ms-2" style="width: 30%;"
                        ></v-skeleton-loader>
                    </div>
                    <div class="d-flex justify-center align-center container pt-4">
                        <v-skeleton-loader
                        type="card" class="" style="width: 150px; height: 30px;"
                        ></v-skeleton-loader>
                    </div>
                    <div class="d-flex justify-space-around pt-6 pb-0">
                        <v-skeleton-loader
                        type="button"
                        ></v-skeleton-loader>    
                        <v-skeleton-loader
                        type="button"
                        ></v-skeleton-loader>    
                        <v-skeleton-loader
                        type="button"
                        ></v-skeleton-loader>                        
                    </div>
                </v-card>           
            </v-col>            
        </v-row>
        <!-- Render image for each pokemon type -->                  
        <v-row>            
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
                            opacity: 0.1;
                            position: absolute;"
                            :style="{marginLeft: '70px'}">
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

      props: {
          mini: Boolean,
      },

      data() {
          return {
              pokemonTypes: [],
          };
      },
  
      async created() {
        setTimeout(() => {
          this.getPokemonTypes();
        }, 1500);
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