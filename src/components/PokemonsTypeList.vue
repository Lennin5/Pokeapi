<template>
    <div>
      <!-- Floating type pokemons button -->
      <FloatingButtons 
        :pokemonType="pokemonType"
      />

      <v-container>      
        <v-row justify="center" class="mt-0">
          <v-col cols="12">
            <v-card
                class="mx-auto rounded-xl d-flex align-center justify-center"
                width="fullscreen"
                height="200px"
                :color="getElementColorNormal(pokemonType)"
                :dark="pokemonType === 'flying' ? false : true"
              >           
              <div
                :style="{
                  marginRight: getMarginToTypeBackground(pokemonType),
                  backgroundImage: 'url(' + getElementTypeLogo(pokemonType) + ')',
                  
                }"
                style="
                  width: 350px; 
                  height: 200px; 
                  border-radius: 0px;                                    
                  opacity: 0.1;
                  position: absolute;
                  background-size: cover;
                  background-position: center;"
                >
              </div>
              <div class="d-flex justify-start align-end mb-0 cursor-pointer" style="margin-top: -150px; margin-left: 10px; z-index: 10" @click="$router.go(-1)">
                <div>
                  <v-icon                  
                  :style="{color: pokemonType === 'flying' ? '#0000008a' : '#ffffff8a'}"
                  >mdi-chevron-left</v-icon>                      
                </div>
                <div>
                  <span class="text-subtitle-2"
                  :style="{color: pokemonType === 'flying' ? '#0000008a' : '#ffffff8a'}"
                  >Back</span>
                </div>
              </div>                 
              <v-container class="d-flex justify-center align-center" style="border: 1px solid transparent" width="100%">
                <div class="ml-0" style="border: 1px solid transparent;" >
               
                  <v-card-title class="d-flex align-center" >
                      <v-avatar 
                      size="80" 
                      style="border-radius: 0px;"
                      >
                      <img                          
                          alt="type-logo"
                          :src="getElementTypeLogo(pokemonType)"
                      />
                      </v-avatar>
                      <span class="text-h4 font-weight-bold ml-2" style="text-align: center;">
                          {{ pokemonType.toUpperCase() }}
                      </span>                                                                                            
                  </v-card-title>
                </div>
                <div style="border: 1px solid transparent; width: 50%">
                  <v-container class="d-flex justify-end">
                    <div>
                      <v-tabs 
                        v-model="tab"
                        :color="pokemonType === 'flying' ? 'grey darken-3' : 'white'"
                        background-color="transparent">
                      <v-tab @click="setAllPokemons()">
                        <v-icon class="mr-2">mdi-pokeball</v-icon>
                        <span v-if="pokemonsAll.length === 0">
                          Total Pokemons ...
                        </span>
                        <span v-else>
                          Total Pokemons {{  pokemonsAll.length }}
                        </span>
                      </v-tab>
                      <v-tab @click="setPurePokemons()">
                        <v-icon class="mr-2">mdi-star</v-icon>
                        <span v-if="pokemonsPure.length === 0">
                          Pure ...
                        </span>
                        <span v-else>
                          Pure {{  pokemonsPure.length }}
                        </span>
                      </v-tab>
                      <v-tab @click="setNotPurePokemons()">
                        <v-icon class="mr-2">mdi-star-off</v-icon>
                        <span v-if="pokemonsNotPure.length === 0">
                          Not Pure ...
                        </span>
                        <span v-else>
                          Not Pure {{  pokemonsNotPure.length }}
                        </span>
                      </v-tab>
                      <!-- <v-tab-item>
                          <span>Tab1</span>
                      </v-tab-item>
                      <v-tab-item>
                          <span>Tab2</span>
                      </v-tab-item>             -->
                      </v-tabs>
                    </div>
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
      <!-- Skeleton loader -->
      <v-row v-if="pokemonsList.length === 0">
        <v-col cols="3" v-for="n in 6" :key="n" >
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

      <!-- Pokemons list -->
      <v-tabs 
        v-model="tabClone"
        color="red"
        background-color="transparent"
        style="margin-top: -50px;"
        >

        <!-- Tabs clone -->
        <v-tab id="totalPokemonsCloneTab" class="d-none">
          <v-icon class="mr-2">mdi-pokeball</v-icon>                            
          <span>
            Total Pokemons Clone
          </span>
        </v-tab>
        <v-tab id="purePokemonsCloneTab" class="d-none">
          <v-icon class="mr-2">mdi-star</v-icon>                            
          <span >
            Pure Clone
          </span>
        </v-tab>
        <v-tab id="notPurePokemonsCloneTab" class="d-none">
          <v-icon class="mr-2">mdi-star-off</v-icon>                            
          <span>
            Not Pure Clone
          </span>
        </v-tab>

        <!-- Tabs content for each type pokemons -->
        <v-tab-item class="bg-transparent">
            <PokemonsList
              :pokemonsList="pokemonsAll"
              :pokemonType="pokemonType"
            />
        </v-tab-item>
        <v-tab-item class="bg-transparent">
            <PokemonsList
                :pokemonsList="pokemonsPure"
                :pokemonType="pokemonType"
              />
        </v-tab-item>  
        <v-tab-item class="bg-transparent">
            <PokemonsList
                :pokemonsList="pokemonsNotPure"
                :pokemonType="pokemonType"
              />
        </v-tab-item>            
      </v-tabs>      

    </v-container>

    </div>
  </template>
  
  <script>
    import pokeApi from '../plugins/axios';
    import FloatingButtons from './FloatingButtons.vue';
    import PokemonsList from './PokemonsList.vue';
  
  export default {
    data() {
      return {
        tab: 1,
        tabClone: 1,
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
      PokemonsList,
    },
    methods: {
      async getPurePokemons(){
        // setTimeout(() => {
          const pokemonsPure = this.pokemonsList.filter(pokemon => pokemon.element === this.pokemonType);
          const pokemonsNotPure = this.pokemonsList.filter(pokemon => pokemon.element !== this.pokemonType);
          this.pokemonsPure = pokemonsPure;
          this.pokemonsNotPure = pokemonsNotPure;
        // }, 1000);
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
        document.getElementById('totalPokemonsCloneTab').click();
      },
      setPurePokemons(){
        document.getElementById('purePokemonsCloneTab').click();
      },
      setNotPurePokemons(){
        document.getElementById('notPurePokemonsCloneTab').click();
      },
      getMarginToTypeBackground(pokemonType) {
        const typeMarginMapping = {
          'normal': '640px',
          'fighting': '680px',
          'flying': '480px',
          'poison': '615px',
          'ground': '700px',
          'rock': '500px',
          'bug': '562px',
          'ghost': '950px',
          'steel': '600px',
          'fire': '510px',
          'water': '610px',
          'grass': '890px',
          'electric': '635px',
          'psychic': '670px',
          'ice': '545px',
          'dragon': '830px',
          'dark': '580px',
          'fairy': '587px',
        };

        return typeMarginMapping[pokemonType] || '0px';
      }
    },
  };
  </script>
  <style scoped>
  .bg-transparent {
    background-color: #f2f2f2 !important;
  }
  </style>