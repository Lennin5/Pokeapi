<template>
    <v-container>
      <div class="d-flex justify-space-between align-center">
        <h1 class="orange--text ml-4" >
        <v-icon color="orange" size="40">mdi-star-shooting</v-icon>
        Legendary</h1>
  
        <v-hover v-slot="{ hover }" class="d-flex justify-center align-center">
          <span class="me-5 cursor-pointer" @click="$router.push('/type')"
          :class="hover ? 'deep-orange--text accent-4--text text-decoration-underline' : 'orange--text'">
            View all
            <v-icon 
            class="ms-1"
            :color="hover ? 'deep-orange accent-2' : 'orange'"
            size="15">mdi-arrow-right</v-icon>
          </span>
        </v-hover>
      </div>    
      <div class="horizontal-scroll scroll-container-for-horizontal-div">
        <div>
          <!-- Skeleton loader -->
          <div v-if="legendaryPokemons.length === 0">
            <v-card 
            class="card ma-3 rounded-xl"
            :style="{
              width: '200px',
              height: '255px',  
              }" 
              v-for="n in 8" :key="n">
              <div class="d-flex justify-center align-center flex-column">
                  <v-skeleton-loader type="image" aspect-ratio="0.9" height="170" class="mt-4 rounded-lg" style="width: 80%"></v-skeleton-loader>
                <v-card-actions class="d-flex justify-center">
                  <v-skeleton-loader type="button" class="w-100 mt-1"></v-skeleton-loader>
                </v-card-actions> 
              </div>         
            </v-card>           
          </div>
          <!-- Data rendered -->
          <v-card
          v-for="(pokemon) in legendaryPokemons"
            :key="pokemon.name"
            width="200"
            class="card ma-3 rounded-xl">
            <div class="d-flex justify-center align-center pt-5" 
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
                width: '180px',
                height: '180px',
                backgroundImage: 'url(' + getElementTypeLogo(pokemon.element) + ')',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                position: 'absolute',
                opacity: '0.1',
                marginTop: '40px',
              }" />

            <div>    
                <div class="d-flex justify-start mt-5" style="border: 1px solid transparent; margin-left: -40px">
                <v-icon
                :color="`rgba(${Math.max(0, parseInt(getElementColorHex(pokemon.element).slice(1, 3), 16) - 50)}, ${Math.max(0, parseInt(getElementColorHex(pokemon.element).slice(3, 5), 16) - 50)}, ${Math.max(0, parseInt(getElementColorHex(pokemon.element).slice(5, 7), 16) - 50)}, 0.8)`"
                class="me-0"
                size="30"
                >mdi-star</v-icon>   
                </div>

              <v-img :src="pokemon.sprites[spriteIndex]" max-height="300px" max-width="150" class="" :class="'pokemon_image_'+pokemon.name"></v-img>
              <div class="font-weight-bold d-flex justify-center align-center mt-5"
              :class="pokemon.element === 'flying' ? 'gray--text' : 'white--text'">

                <h2>
                  {{ pokemon.name[0].toUpperCase() + pokemon.name.slice(1) }}
                </h2>          
                      
              </div>
            </div>
            </div>
              <v-card-text :style="{backgroundColor: getElementColorHex(pokemon.element)}">
                <div class="d-flex justify-center " style="opacity: 0;">
                  <v-btn
                    :to="{ path: '/details', query: { pokemonObject: pokemon, spritesObject: Object.values(pokemon.sprites) } }"
                    :color="getElementColorNormal(pokemon.element)"
                    class="rounded-lg"
                    :dark="pokemon.element === 'flying' ? false : true"
                    :light="pokemon.element === 'flying' ? true : false">
                        View Details
                  </v-btn>                
                </div>
              </v-card-text>  
          </v-card>  
  
        </div>
      </div>
    </v-container>
  </template>
  
  <script>
  import pokeApi from '../../plugins/axios';
  export default {
    data() {
      return {
        legendaryPokemons: [],
        spriteIndex: 0,
      };
    },
    created() {
      this.getPokemonData();

      setInterval(() => {
        if(this.spriteIndex === 3)
          this.spriteIndex = 0;
        else
          this.spriteIndex++;
      }, 1500);
    },
    methods: {
      async getPokemonData() {
        this.legendaryPokemons = [];
          try {
            const legendaryPokemonIds = [144, 145, 146, 150, 151, 243, 244, 245, 249, 250, 251, 377, 378, 379, 380, 381, 382, 383, 384, 385, 386, 483, 484, 487, 488, 489, 490, 491, 492, 493];

            for (const id of legendaryPokemonIds) {
              const { data, status } = await pokeApi.get(`/pokemon/${id}`);
              if(status==200){
                const pokemon = data;
                const name = pokemon.name;
                const sprites = [
                    pokemon.sprites.front_default,
                    pokemon.sprites.back_default,
                    pokemon.sprites.front_shiny,
                    pokemon.sprites.back_shiny,
                ];
                const element = pokemon.types[0].type.name;

                const legendaryPokemon = { id, name, sprites, element };
                this.legendaryPokemons.push(legendaryPokemon);
              }
            }
            
            console.log(this.legendaryPokemons, 'legendaryPokemons');
          } catch (error) {
            console.error(error);
          }
      },   
    }
  };
  </script>
  
  <style scoped>
  .horizontal-scroll {
  width: 100%;
  overflow-x: auto; /* Habilita la barra de desplazamiento horizontal */
  border: 1px solid transparent;
  white-space: nowrap; /* Evita que el contenido se divida en varias líneas */
  }
  
  .card {
  /* width: 100px;
  height: 100px; */
  display: inline-block; /* Para asegurar que las tarjetas se muestren en línea */
  }
  </style>
  