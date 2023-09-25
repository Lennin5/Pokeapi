<template>
  <v-container>
    <div class="d-flex justify-space-between align-center">
        <h1 class="orange--text ml-10" >
        <v-icon color="orange" size="40">mdi-cards</v-icon>
        All Pokémons</h1>

        <div class="d-flex justify-center">
          <v-icon 
            class="me-5 cursor-pointer"
            :color="filter === 'all' ? 'orange' : filter === 'flying' ? 'grey lighten-1' : getElementColorNormal(filter)"
            size="25"
            @click="getPokemonData(getRandomPokemonType())">
            mdi-dice-5            
          </v-icon>          
          <v-hover v-slot="{ hover }" class="d-flex justify-center align-center">
          <span class="me-15 cursor-pointer" @click="$router.push('/pokemons')"
          :class="hover ? 'orange--text text-decoration-underline' : 'deep-orange--text accent-4--text'">
            View all
            <v-icon 
            class="ms-1"
            :color="hover ? 'orange' : 'deep-orange accent-2'"
            size="15">mdi-arrow-right</v-icon>
          </span>
          </v-hover>            
        </div>
      </div>    
    <div class="horizontal-scroll scroll-container-for-horizontal-div">
      <div>
        <!-- Skeleton loader -->
        <div v-if="allPokemons.length === 0">
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
        v-for="(pokemon) in allPokemons"
          :key="pokemon.name"
          width="200"
          class="card ma-3 rounded-xl">
          <div class="d-flex justify-center align-center" 
          :style="{
            backgroundColor: getElementColorHex(pokemon.element),
            width: '100%',
            height: '170px',              
          }"
          @mouseover="setElementOpacity(pokemon.name, 0.3)"
          @mouseout="setElementOpacity(pokemon.name, 0.1)">
          <div
          :id="'pokemon_card_' + pokemon.name"
            :style="{
              width: '150px',
              height: '150px',
              backgroundImage: 'url(' + getElementTypeLogo(pokemon.element) + ')',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              position: 'absolute',
              opacity: '0.1',
              marginTop: '40px',
            }" />
          <div class="">
            <v-img :src="pokemon.sprites[0]" max-height="300px" max-width="150" class="" :id="'pokemon_image_'+pokemon.name"></v-img>
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
    allPokemons: [],
    filter: 'all',
  };
},
created() {
  this.getPokemonData(this.filter);
},
methods: {
  async getPokemonData(filter) {
      try {
        // 640 we encounter a flying pokemon (white color)
        const response = await pokeApi.get(`/pokemon/?offset=0&limit=1500`);
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

        this.allPokemons = pokemonData;
        // sort by random
        this.allPokemons.sort(() => Math.random() - 0.5);
        // filter by element
        this.filter = filter;
        if(this.filter !== 'all') {
          this.allPokemons = this.allPokemons.filter(pokemon => pokemon.element === filter);
          // If random filter gets empty, show all pokemons
          if(this.allPokemons.length === 0) {
            this.allPokemons = pokemonData;
            this.filter = 'all';
          }
        }
        // this.allPokemons = this.allPokemons.filter(pokemon => pokemon.element === 'fire');
        // console.log(this.allPokemons, 'allPokemons');
      } catch (error) {
        console.error(error);
      }
  }, 
  setElementOpacity(pokemonName, opacity) {
    const pokemonCard = document.getElementById(`pokemon_card_${pokemonName}`);
    const pokemonImage = document.getElementById(`pokemon_image_${pokemonName}`);
    if (pokemonCard && pokemonImage) {
      pokemonCard.style.opacity = opacity;
      pokemonCard.style.transition = 'all 0.3s ease-in-out';

      pokemonCard.style.opacity = opacity;
      pokemonImage.style.transform = opacity === 0.3 ? 'scale(1.4)' : 'scale(1.1)';
      pokemonImage.style.transition = 'all 0.3s ease-in-out';
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
