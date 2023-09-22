<template>
    <v-container>
      <div class="horizontal-scroll">
        <div

        >
          <!-- <v-card
            elevation="2"
            v-for="n in 50"
            :key="n"
            class="card ma-3 rounded-xl"
          >
          <div class="d-flex justify-center align-center" style="width: 100px; height: 100px;">
            <span>
              {{ n }}
            </span>
          </div>
          </v-card> -->
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
              
            }">
            <div
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
              <v-img :src="pokemon.sprites[0]" max-height="300px" max-width="150" class=""></v-img>
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
                    class="mt-2"
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
  import pokeApi from '../plugins/axios';
export default {
  data() {
    return {
      allPokemons: [],
      
    };
  },
  created() {
    this.getPokemonData();
  },
  methods: {
    async getPokemonData() {
        try {
          // 640 we encounter a flying pokemon (white color)
          const response = await pokeApi.get(`/pokemon/?offset=1&limit=900`);
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
          // filter by 'flying' element
          // this.allPokemons = this.allPokemons.filter(pokemon => pokemon.element === 'flying');
          console.log(this.allPokemons, 'allPokemons');
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
  border: 1px solid red;
  white-space: nowrap; /* Evita que el contenido se divida en varias líneas */
}

.card {
  /* width: 100px;
  height: 100px; */
  display: inline-block; /* Para asegurar que las tarjetas se muestren en línea */
}
</style>
