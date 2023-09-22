<template>
    <div style="margin-top: 40px">
      <!-- Floating type pokemons button -->
      <FloatingButtons 
        :pokemonType="'normal'"
      />

      <v-container>
        <v-row>
          <v-col cols="2" lg="2" style="border: 1px solid red">
            <v-card
              height="400"
              width="100%"
              class=""
            >
              <v-navigation-drawer permanent color="orange" dark>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="text-h6">
                      Application
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      subtext
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-divider></v-divider>

                <v-list
                  dense
                  nav
                >
                  <v-list-item
                    v-for="item in items"
                    :key="item.title"
                    link
                  >
                    <v-list-item-icon>
                      <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                      <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>                
              </v-navigation-drawer>

              
            </v-card>  
          </v-col>
          <v-col cols="10" lg="10" style="border: 1px solid blue">
            <h1 class="grey--text ml-7">All Pokémons</h1>
            <HorizontalCards />   
          </v-col>
        </v-row>
      </v-container>


    

      <v-container>
        <h1 style="text-align: center;" class="grey--text">All Pokémons</h1>

             
      <!-- Agregamos la paginación -->
      <!-- <div class="text-center">
        <v-pagination
          v-model="page"
          :length="totalPages"
          circle
          color="orange"
        >
      </v-pagination>
      </div> -->
      <br>
        <v-row>
          <v-col
            v-for="pokemon in paginatedPokemons"
            :key="pokemon.name"
            cols="12"
            xs="12"
            sm="6"
            md="4"
            lg="3"
            xl="3"
            class="d-flex justify-center"
          >
            <v-card width="400" style="border-radius: 20px !important;">
              <div class="d-flex justify-center">
                <v-img :src="pokemon.sprites[index]" max-height="300px" max-width="150" class="">
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
                      {{ pokemon.element[0].toUpperCase() + pokemon.element.slice(1) }}
                  </h4>
                  </div>              
                  <div class="d-flex justify-center mb-3">
                  <div
                      class="container-element"
                      :style="{                
                      backgroundColor: getElementColorHex(pokemon.element),
                      boxShadow: pokemon.element === 'flying' ? '0px 0px 2px 0px #343838' : 'none',
                      }"
                  >
                      <div
                      class="element-icon"
                      :style="{
                          backgroundImage: 'url(' + getElementTypeLogo(pokemon.element) + ')',
                      }"
                      />
                  </div>
                  </div>
                  <div class="d-flex justify-center pb-4">
                  <v-btn
                  :to="{ path: '/details', query: { pokemonObject: pokemon, spritesObject: Object.values(pokemon.sprites) } }"
                  :color="getElementColorNormal(pokemon.element)"
                  class="mt-2"
                  :dark="pokemon.element === 'flying' ? false : true"
                  :lihght="pokemon.element === 'flying' ? true : false">
                      View Details
                          </v-btn>                
                  </div>
              </v-card-text>  

              <!-- <v-card-text>
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
              </v-card-text> -->
  
            </v-card>
          </v-col>
        </v-row>      
      </v-container>
  
  
    </div>
  </template>
  
  <script>
  import pokeApi from '../plugins/axios';
  import BgPokemon from '@/assets/img/bg-pokemon.png';
  import FloatingButtons from '../components/FloatingTypesButton.vue';
  import HorizontalCards from '@/components/HorizontalCards.vue';
  
  export default {
    name: 'PokemonsList',
  
    data() {
      return {
        pokemons: [],
        BgPokemon: BgPokemon,
        index: 0,
        page: 1, // Página inicial
        pokemonsLimit: 300, // 200 pokemons
        pokemonsPerPage: 50, // 50 pokemons por página
        items: [
          { title: 'Dashboard', icon: 'mdi-view-dashboard' },
          { title: 'Photos', icon: 'mdi-image' },
          { title: 'About', icon: 'mdi-help-box' },
        ],
        right: true,        
      };
    },
  
    async created() {
      this.getPokemonData();
    },
    
    components: {
      FloatingButtons,
      HorizontalCards
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
  
    computed: {
      totalPages() {
        // 100 is the number of pokemons per page
        return Math.ceil(this.pokemons.length / this.pokemonsPerPage);
      },
  
      paginatedPokemons() {
        const startIndex = (this.page - 1) * this.pokemonsPerPage;
        const endIndex = startIndex + this.pokemonsPerPage;
        return this.pokemons.slice(startIndex, endIndex);
      }
    }
  };
  </script>
  