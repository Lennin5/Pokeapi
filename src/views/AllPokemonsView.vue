<template>
  <div>
    <v-container>

      <!-- Header of all pokemons getRandomPokemonType() -->
      <v-row justify="center" class="mt-0">
        <v-col cols="12">
          <v-card
              class="mx-auto rounded-xl d-flex align-start justify-center"
              width="fullscreen"
              height="200px"
              :style="{
                background: 'linear-gradient(to right, ' + getRandomPokemonColorHex() + ', ' + getRandomPokemonColorHex() + ')'
                }"
              :dark="pokemonType === 'flying' ? false : true"
            >           
            <div
              :style="{
                backgroundImage: 'url(' + getElementTypeLogo(pokemonType) + ')',                  
              }"
              style="
                width: 350px; 
                height: 200px; 
                border-radius: 0px;                                    
                opacity: 0.1;
                position: absolute;
                background-size: cover;
                background-position: center;                
                "
              >
            </div>           
            <div
              :style="{
                backgroundImage: 'url(' + getElementTypeLogo('dragon') + ')',                  
              }"
              style="
                width: 350px; 
                height: 170px; 
                border-radius: 0px;                                    
                opacity: 0.1;
                position: absolute;
                background-size: contain;
                background-position: center;
                margin-left: 1050px;
                margin-top: 90px;
                "
              >
            </div>           
            <div
              :style="{
                backgroundImage: 'url(' + getElementTypeLogo('ground') + ')',                  
              }"
              style="
                width: 350px; 
                height: 200px; 
                border-radius: 0px;                                    
                opacity: 0.1;
                position: absolute;
                background-size: contain;
                background-position: center;
                margin-right: 1000px;
                margin-top: 80px;
                "
              >
            </div>           
            <div
              :style="{
                backgroundImage: 'url(' + getElementTypeLogo('dark') + ')',                  
              }"
              style="
                width: 350px; 
                height: 190px; 
                border-radius: 0px;                                    
                opacity: 0.1;
                position: absolute;
                background-size: contain;
                background-position: center;
                margin-right: 900px;
                margin-top: -120px;
                "
              >
            </div>           
            <div
              :style="{
                backgroundImage: 'url(' + getElementTypeLogo('rock') + ')',                  
              }"
              style="
                width: 250px; 
                height: 190px; 
                border-radius: 0px;                                    
                opacity: 0.1;
                position: absolute;
                background-size: contain;
                background-position: center;
                margin-left: 950px;
                margin-top: -80px;
                "
              >
            </div>           

            <div
              :style="{
                backgroundImage: 'url(' + getElementTypeLogo('grass') + ')',                  
              }"
              style="
                width: 350px; 
                height: 150px; 
                border-radius: 0px;                                    
                opacity: 0.1;
                position: absolute;
                background-size: contain;
                background-position: center;
                margin-right: 600px;
                margin-top: 110px;
                "
              >
            </div>
            <div
              :style="{
                backgroundImage: 'url(' + getElementTypeLogo('fire') + ')',                  
              }"
              style="
                width: 350px; 
                height: 200px; 
                border-radius: 0px;                                    
                opacity: 0.1;
                position: absolute;
                background-size: contain;
                background-position: center;
                margin-left: 700px;
                margin-top: 80px;
                "
              >
            </div>

            <div
              :style="{
                backgroundImage: 'url(' + getElementTypeLogo('electric') + ')',                  
              }"
              style="
                width: 250px; 
                height: 150px; 
                border-radius: 0px;                                    
                opacity: 0.1;
                position: absolute;
                background-size: contain;
                background-position: center;
                margin-right: 450px;
                margin-top: -20px;
                "
              >
            </div>
            <div
              :style="{
                backgroundImage: 'url(' + getElementTypeLogo('poison') + ')',                  
              }"
              style="
                width: 350px; 
                height: 150px; 
                border-radius: 0px;                                    
                opacity: 0.1;
                position: absolute;
                background-size: contain;
                background-position: center;
                margin-left: 530px;
                margin-top: -70px;
                "
              >
            </div>
            
            <div
              :style="{
                backgroundImage: 'url(' + getElementTypeLogo('water') + ')',                  
              }"
              style="
                width: 350px; 
                height: 50px; 
                border-radius: 0px;                                    
                opacity: 0.1;
                position: absolute;
                background-size: contain;
                background-position: center;
                margin-right: 1090px;
                margin-top: 60px;
                "
              >
            </div>            
            <div
              :style="{
                backgroundImage: 'url(' + getElementTypeLogo('psychic') + ')',                  
              }"
              style="
                width: 350px; 
                height: 90px; 
                border-radius: 0px;                                    
                opacity: 0.1;
                position: absolute;
                background-size: contain;
                background-position: center;
                margin-left: 435px;
                margin-top: 100px;
                "
              >
            </div>          
            <div
              :style="{
                backgroundImage: 'url(' + getElementTypeLogo('steel') + ')',                  
              }"
              style="
                width: 350px; 
                height: 70px; 
                border-radius: 0px;                                    
                opacity: 0.1;
                position: absolute;
                background-size: contain;
                background-position: center;
                margin-right: 650px;
                margin-top: 40px;
                "
              >
            </div>          
            <div
              :style="{
                backgroundImage: 'url(' + getElementTypeLogo('bug') + ')',                  
              }"
              style="
                width: 350px; 
                height: 50px; 
                border-radius: 0px;                                    
                opacity: 0.1;
                position: absolute;
                background-size: contain;
                background-position: center;
                margin-right: 780px;
                margin-top: 90px;
                "
              >
            </div>        
            <div
              :style="{
                backgroundImage: 'url(' + getElementTypeLogo('fighting') + ')',                  
              }"
              style="
                width: 350px; 
                height: 40px; 
                border-radius: 0px;                                    
                opacity: 0.1;
                position: absolute;
                background-size: contain;
                background-position: center;
                margin-right: 355px;
                margin-top: 150px;
                "
              >
            </div>        
            <div
              :style="{
                backgroundImage: 'url(' + getElementTypeLogo('ghost') + ')',                  
              }"
              style="
                width: 350px; 
                height: 45px; 
                border-radius: 0px;                                    
                opacity: 0.1;
                position: absolute;
                background-size: contain;
                background-position: center;
                margin-left: 870px;
                margin-top: 100px;
                "
              >
            </div>        
            <div
              :style="{
                backgroundImage: 'url(' + getElementTypeLogo('fairy') + ')',                  
              }"
              style="
                width: 350px; 
                height: 40px; 
                border-radius: 0px;                                    
                opacity: 0.1;
                position: absolute;
                background-size: contain;
                background-position: center;
                margin-left: 595px;
                margin-top: 100px;
                "
              >
            </div>

            <div class="w-100" style="border: 1px solid transparent">
              <div class="d-flex justify-start align-end cursor-pointer ms-2 mt-3 mb-0" @click="$router.go(-1)">
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
              <div class="d-flex justify-center align-start w-100">
                <v-container class="d-flex flex-column justify-center align-center" style="border: 1px solid transparent" width="100%">
                  <div class="ml-0" style="border: 1px solid transparent;" >               
                    <span class="text-h4 font-weight-bold" style="text-align: center;">
                        All Pokemons
                    </span> 
                  </div>         
                  <!-- Agregamos la paginación -->
                  <div class="d-flex justify-center mt-5" style="z-index: 99;">
                    <v-pagination
                      light
                      v-model="page"
                      :length="totalPages"
                      circle
                      :color="getRandomPokemonColorNormal()"
                    >
                    </v-pagination>
                  </div>                     
                </v-container>
              </div>                
            </div>
            </v-card>
        </v-col>    
      </v-row>  
      <!-- <h1 style="text-align: center;" class="grey--text">All Pokémons</h1> -->            
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
export default {
  data() {
    return {
      pokemonType: 'normal',
      pokemons: [],
      index: 0,
      page: 1, // Página inicial
      pokemonsLimit: 500, // 200 pokemons / 1292 en total
      pokemonsPerPage: 100, // 50 pokemons por página    
    };
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

        console.log(pokemons, 'POK');

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
}
</script>

<style>

</style>