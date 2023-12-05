<template>
  <div class="mt-10 mt-lg-0">
    <v-container>

      <!-- Header of all pokemons getRandomPokemonType() -->
      <v-row justify="center">
        <v-col cols="12">
          <v-card
            class="mx-auto rounded-xl d-flex align-start justify-center"
            width="fullscreen"
            height="230px"
            :style="{
              background: 'linear-gradient(to right, ' + firstRandomColorHex + ', ' + secondRandomColorHex + ')'}"
            >           
            <div
                v-for="(item, index) in backgroundTypeList"
                :key="index"
                :style="{
                  backgroundImage: 'url(' + getElementTypeLogo(item.name) + ')',   
                  width: item.width,
                  height: item.height,         
                  margin: item.margin,      
                }"
                style="
                  border-radius: 0px;                                                    
                  opacity: 0.1;
                  position: absolute;
                  background-size: contain;
                  background-position: center;
                  "
              >
            </div>

            <div class="w-100" style="border: 1px solid transparent">
              <div class="d-flex justify-start align-end ms-2 mt-3 white--text" @click="$router.go(-1)">
                <div>
                  <v-icon       
                  style="z-index: 999"
                  class="white--text cursor-pointer"  
                  >mdi-chevron-left</v-icon>                      
                </div>
                <div>
                  <div 
                  style="z-index: 999"
                  class="text-subtitle-2 cursor-pointer"
                  >Back</div>
                </div>
              </div>  
              <div class="d-flex justify-center align-start w-100">
                <v-container class="d-flex flex-column justify-center align-center" style="border: 1px solid transparent" width="100%">
                  <div class="ml-0" style="border: 1px solid transparent;" >               
                    <span class="text-h4 font-weight-bold text-center white--text">
                        All Pokémons
                    </span> 
                  </div>         
                  <!-- Agregamos la paginación -->
                  <div class="d-flex justify-center mt-5" style="z-index: 99;">
                    <v-pagination
                      light
                      v-model="page"
                      :length="totalPages"
                      circle
                      :color="secondRandomColorHex"
                    >
                    </v-pagination>
                  </div>                     
                </v-container>
              </div>          
              <div class="mt-0">
                <v-row justify="center">
                  <v-col cols="3" class="me-0">
                    <v-text-field
                      v-model="search_word"
                      background-color="transparent"
                      :style="{background: 'linear-gradient(to right, ' + firstRandomColorHex + '8f, ' + secondRandomColorHex +'8f)'}"
                      class="rounded-lg"
                      dense
                      dark
                      color="white"
                      label="Search pokémon"
                      outlined
                      hide-details
                      
                      ></v-text-field>
                  </v-col>
                </v-row>
              </div>                    
            </div>
            </v-card>
        </v-col>    
      </v-row>  
      <!-- <h1 style="text-align: center;" class="grey--text">All Pokémons</h1> -->            
      <br>
      <div>
        <!-- Skeleton loader -->
        <v-row v-if="paginatedPokemons.length === 0">
          <v-col
            v-for="n in 18" :key="n"
            cols="12"
            xs="12"
            sm="4"
            md="3"
            lg="2"
            xl="2"
            class="d-flex justify-center"
          >
            <v-card 
            width="100%"
            class="card rounded-xl"
            :style="{
              height: '255px',  
              }" 
              >
              <div class="d-flex justify-center align-center flex-column">
                  <v-skeleton-loader type="image" aspect-ratio="0.9" height="170" class="mt-4 rounded-lg" style="width: 80%"></v-skeleton-loader>
                <v-card-actions class="d-flex justify-center">
                  <v-skeleton-loader type="button" class="w-100 mt-1"></v-skeleton-loader>
                </v-card-actions> 
              </div>         
            </v-card>           
          </v-col>
        </v-row>
        <!-- All pokemons rendered -->
        <v-row>          
          <v-col
            v-for="(pokemon) in paginatedPokemons"
            :key="pokemon.name"
            cols="12"
            xs="12"
            sm="4"
            md="3"
            lg="2"
            xl="2"
            class="d-flex justify-center"
          >
            <!-- Data rendered -->
            <v-card
              width="100%"
              class="card rounded-xl">
              <div class="d-flex justify-center align-center" 
              :style="{
                backgroundColor: getElementColorHex(pokemon.element),
                width: '100%',
                height: '170px',              
              }"
              @mouseover="setElementOpacity(pokemon.name, 0.3)"
              @mouseout="setElementOpacity(pokemon.name, 0.1)">
              <div
              :class="'pokemon_card_' + pokemon.name"
                :style="{
                  width: '130px',
                  height: '130px',
                  backgroundImage: 'url(' + getElementTypeLogo(pokemon.element) + ')',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  position: 'absolute',
                  opacity: '0.1',
                  marginTop: '40px',
                }" />
              <div class="">
                <v-img :src="pokemon.sprites[index]" max-height="300px" max-width="150" class="" :class="'pokemon_image_'+pokemon.name"></v-img>
                <div class="font-weight-bold d-flex justify-center"
                :class="pokemon.element === 'flying' ? 'gray--text' : 'white--text'">
                  <h2>
                    {{ pokemon.name[0].toUpperCase() + pokemon.name.slice(1) }}
                  </h2>                
                </div>
              </div>
              </div>
                <v-card-text :style="{backgroundColor: getElementColorHex(pokemon.element)}">
                  <div class="d-flex justify-center pb-2">
                    <v-btn
                      :to="{ path: '/details', query: { pokemonObject: pokemon, spritesObject: Object.values(pokemon.sprites) } }"
                      :color="getElementColorNormal(pokemon.element)"
                      class="mt-2 rounded-lg"
                      :dark="pokemon.element === 'flying' ? false : true"
                      :light="pokemon.element === 'flying' ? true : false">
                          Details
                    </v-btn>                
                  </div>
                </v-card-text>  
            </v-card>  
          </v-col>
        </v-row>
      </div>      
      </v-container>    
  </div>
</template>

<script>
  import pokeApi from '../plugins/axios';
  import { useRootStore } from "@/assets/store/index";
export default {
  data() {
    return {
      pokemonType: 'normal',
      pokemons: [],
      index: 0,
      page: 1, // Página inicial
      pokemonsLimit: 1000, // 200 pokemons / 1292 en total
      pokemonsPerPage: 100, // 50 pokemons por página    
      search_word: null,
      backgroundTypeList: [
        {
          name: 'normal',
          width: '450px',
          height: '350px',
          margin: '-70px 0px 0px 0px',
        },
        {
          name: 'dragon',
          width: '350px',
          height: '170px',
          margin: '90px 0px 0px 1050px',
        },
        {
          name: 'ground',
          width: '350px',
          height: '200px',
          margin: '80px 1000px 0px 0px',
        },
        {
          name: 'dark',
          width: '350px',
          height: '190px',
          margin: '-120px 900px 0px 0px',
        },
        {
          name: 'rock',
          width: '250px',
          height: '190px',
          margin: '-80px 0px 0px 950px',
        },
        {
          name: 'grass',
          width: '350px',
          height: '150px',
          margin: '110px 600px 0px 0px',
        },
        {
          name: 'fire',
          width: '350px',
          height: '200px',
          margin: '80px 0px 0px 700px',
        },
        {
          name: 'electric',
          width: '250px',
          height: '150px',
          margin: '-20px 450px 0px 0px',          
        },
        {
          name: 'poison',
          width: '350px',
          height: '150px',
          margin: '-70px 0px 0px 530px',
        },
        {
          name: 'water',
          width: '350px',
          height: '50px',
          margin: '60px 1090px 0px 0px',
        },
        {
          name: 'psychic',
          width: '350px',
          height: '90px',
          margin: '100px 0px 0px 435px',
        },
        {
          name: 'steel',
          width: '350px',
          height: '70px',
          margin: '40px 650px 0px 0px',
        },
        {
          name: 'bug',
          width: '350px',
          height: '50px',
          margin: '90px 780px 0px 0px',          
        },
        {
          name: 'fighting',
          width: '350px',
          height: '40px',
          margin: '150px 355px 0px 0px',
        },
        {
          name: 'ghost',
          width: '350px',
          height: '45px',
          margin: '100px 0px 0px 870px',
        },
        {
          name: 'fairy',
          width: '350px',
          height: '40px',
          margin: '100px 0px 0px 595px',
        },
      ],
      firstRandomColorHex: this.getRandomPokemonColorHex(),
      secondRandomColorHex: this.getRandomPokemonColorHex(),
      rootStore: useRootStore(),
    };
  },
  beforeMount(){
    this.rootStore.updateNavigationDrawerColor(this.firstRandomColorHex);
  },
  async created() {
    this.getPokemonData();
  },  
  methods: {
    async getPokemonData() {
      try {
        // 640 we encounter a flying pokemon (white color)
        const response = await pokeApi.get(`/pokemon/?offset=0&limit=${this.pokemonsLimit}`);
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
        // sort data randomly
        // this.pokemons.sort(() => Math.random() - 0.5);
      } catch (error) {
        console.error(error);
      }
    },     
  },
  computed: {
    totalPages() {
      if(this.search_word){
        // Return 1 page if search_word is not null
        return 1;
      }else{
        // 100 is the number of pokemons per page
        return Math.ceil(this.pokemons.length / this.pokemonsPerPage);
      }
    },

    paginatedPokemons() {
      const startIndex = (this.page - 1) * this.pokemonsPerPage;
      const endIndex = startIndex + this.pokemonsPerPage;        
      if(this.search_word){      
        return this.pokemons.filter(pokemon => pokemon.name.includes(this.search_word)).slice(startIndex, endIndex);
      }else{
        return this.pokemons.slice(startIndex, endIndex);
      }
    },
  },
}
</script>

<style>

</style>