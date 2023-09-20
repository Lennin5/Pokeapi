<template>
    <div >
      <v-container>      
        <v-row justify="center" class="mt-5">
          <v-col cols="12">
            <v-card
                class="mx-auto rounded-xl d-flex align-center justify-center"
                width="fullscreen"
                height="200px"
                :color="getElementColorNormal(pokemonType)"
                :dark="pokemonType === 'flying' ? false : true"
              >                
              <img :src="getElementTypeLogo(pokemonType)" v-if="pokemonType !== 'flying'"
                  class="" 
                  style="
                  width: 350px; 
                  height: 350px; 
                  margin-right: 750px;
                  opacity: 0.1;
                  position: absolute;">                  
              <!-- <img :src="getElementTypeLogo(pokemonType)" 
                  class="" 
                  style="
                  width: 180px; 
                  height: 180px; 
                  margin-left: 900px;
                  opacity: 0.1;
                  position: absolute;">             -->
                  <v-container class="d-flex justify-space-between align-center" style="border: 1px solid transparent" width="100%">
                    <div class="ml-0" style="border: 1px solid transparent">
                      <v-card-title class="d-flex align-center">
                          <v-avatar 
                          size="80" 
                          :style="{ borderRadius: pokemonType === 'flying' ? '0px' : '50%' }"
                          >
                          <img                          
                              alt="type-logo"
                              :src="getElementTypeLogo(pokemonType)"
                          />
                          </v-avatar>
                          <span class="text-h4 font-weight-bold ml-2" style="text-align: center; word-spacing: px;">
                              {{ pokemonType.toUpperCase() }}
                          </span>                                                                                            
                      </v-card-title>
                    </div>
                    <div style="border: 1px solid transparent; width: 50%">
                      <v-container>
                          <v-tabs v-model="tab" color="white" background-color="transparent">
                          <v-tab @click="setAllPokemons()">
                            <v-icon class="mr-2">mdi-pokeball</v-icon>
                            <span>Total pokemons {{  pokemonsAll.length }}</span>
                          </v-tab>
                          <v-tab @click="setPurePokemons()">
                            <v-icon class="mr-2">mdi-star-shooting</v-icon>
                            <span class="text-subtitle-2">Pures {{  pokemonsPure.length }}</span>
                          </v-tab>
                          <v-tab @click="setNotPurePokemons()">
                            <v-icon class="mr-2">mdi-star-off</v-icon>
                            <span class="text-subtitle-2">Not Pures {{  pokemonsNotPure.length }}</span>
                          </v-tab>
                          <!-- <v-tab-item>
                              <span>Tab1</span>
                          </v-tab-item>
                          <v-tab-item>
                              <span>Tab2</span>
                          </v-tab-item>             -->
                          </v-tabs>
                      </v-container>  
                    </div>
                      <v-card-actions>
                      </v-card-actions>
                  </v-container>
              </v-card>
          </v-col>    
        </v-row>  
      </v-container>

      <v-container>
        <FloatingButtons />
        <v-row v-if="pokemonsList.length === 0">
          <v-col cols="4" v-for="n in 3" :key="n" >
            <v-card style="border-radius: 20px;">
              <div class="d-flex justify-center">
                <v-skeleton-loader type="image" aspect-ratio="0.5" class="mb-3 mt-4" style="width: 80%; border-radius: 20px"></v-skeleton-loader>
              </div>    
              <div>
                <v-col class="d-flex justify-center" style="margin: 0px; padding: 0px;">
                  <v-skeleton-loader type="text" style="width: 50%"></v-skeleton-loader>
                </v-col>
                <v-col class="d-flex justify-center" style="margin: 0px; padding: 0px;">
                  <v-skeleton-loader type="text" style="width: 40%"></v-skeleton-loader>
                </v-col>
              </div>
              <v-skeleton-loader type="avatar" class="mb-3 mt-1 d-flex justify-center"></v-skeleton-loader>
              <v-card-actions class="d-flex justify-center pb-4">
                <v-skeleton-loader type="button" class="w-100"></v-skeleton-loader>
              </v-card-actions>
            </v-card>           
          </v-col>
        </v-row>


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
                      boxShadow: pokemonType === 'flying' ? '0px 0px 2px 0px #343838' : 'none' }">
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
                      boxShadow: pokemon.element === 'flying' ? '0px 0px 2px 0px #343838' : 'none' }"
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
        tab: 0,
        pokemonType: this.$route.params.type,
        pokemonsList: [],
        pokemonsAll: [],
        pokemonsPure: [],
        pokemonsNotPure: [],
      };
    },
    created(){
      // top to scroll
      window.scrollTo(0, 0);
    },
    mounted() {
      this.fetchPokemonsByType();      
    },
    components: {
      FloatingButtons,
    },
    methods: {
      async getPurePokemons(){
        setTimeout(() => {
          const pokemonsPure = this.pokemonsList.filter(pokemon => pokemon.element === this.pokemonType);
          const pokemonsNotPure = this.pokemonsList.filter(pokemon => pokemon.element !== this.pokemonType);
          this.pokemonsPure = pokemonsPure;
          this.pokemonsNotPure = pokemonsNotPure;
        }, 1000);
      },
      async fetchPokemonsByType() {
        try {
          const response = await pokeApi.get('/type/' + this.pokemonType);
          const pokemons = response.data.pokemon;

          // console.log(pokemons, 'pokemons');

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
        this.pokemonsAll = pokemonData;
        this.getPurePokemons();

        } catch (error) {
          console.error('Error al cargar los Pokémon:', error);
        }
      },
      setAllPokemons(){
        this.pokemonsList = this.pokemonsAll;
      },
      setPurePokemons(){
        this.pokemonsList = this.pokemonsPure;
      },
      setNotPurePokemons(){
        this.pokemonsList = this.pokemonsNotPure;
      },
    },
  };
  </script>
  <style>

  </style>