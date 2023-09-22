<template>
  <div class="fab-container">
    <v-speed-dial
      v-model="fab"
      :top="top"
      :bottom="bottom"
      :right="right"
      :left="left"
      :direction="direction"
      :open-on-hover="hover"
      :transition="transition"
    >
      <template v-slot:activator>

        <v-btn
          v-model="fab"
          :color="getElementColorNormal(pokemonType)"
          dark
          fab
        >
          <v-icon v-if="fab"
            :color="pokemonType === 'flying' ? 'black' : 'white'"          >
            mdi-close
          </v-icon>
          <div
            v-else
            class="container-element"
          >
            <div
              class="element-icon"
              :style="{
                  backgroundImage: 'url(' + getElementTypeLogo(pokemonType) + ')',
              }"
              />
          </div>          
        </v-btn>
      </template>
        <div class="scroll-container-for-vertical-pokemon-types">
          <div
            v-for="(pokemon, key) in pokemonTypes"
            :key="key">
            <div
              class="container-element-floating-button mt-0 mb-2 ms-1 me-1"
              style="cursor: pointer;"
              :style="{                
              backgroundColor: getElementColorHex(pokemon.name),
              boxShadow: pokemon.name === 'flying' ? '0px 0px 2px 0px #343838' : 'none',
              }"
              @click="goToPokemonType(pokemon.name)"
              v-if="pokemon.name !== 'shadow' && pokemon.name !== 'unknown'"
            >
              <div
              class="element-icon-floating-button"
              :style="{
                  backgroundImage: 'url(' + getElementTypeLogo(pokemon.name) + ')',
              }"
              />
            </div> 
          </div>       
        </div>      
    </v-speed-dial>  
  </div>
</template>

<script>
import pokeApi from '../plugins/axios';
// import { useRouter } from 'vue-router';
export default {
  props: {
      pokemonType: {
          type: String,
          required: true,
      },
  },  
  data: () => ({      
      direction: 'top',
      fab: false,
      fling: false,
      hover: false,
      tabs: null,
      top: false,
      right: true,
      bottom: true,
      left: false,
      transition: 'slide-y-reverse-transition',
      pokemonTypes: [],
    }),
    methods:{
      async getPokemonTypes() {
        try {
            const response = await pokeApi.get('/type');
            this.pokemonTypes = response.data.results;
          } catch (error) {
              console.log(error);
          }
      },    
      goToPokemonType(pokemonType) {
        window.location.href = `/type/${pokemonType}`;
      },  
    },
    created() {
      this.getPokemonTypes();
    }
};
</script>

<style>
  .fab-container {
    position: fixed;
    bottom: 10px;
    right: 10px;
    z-index: 99;
  }

  .scroll-container-for-vertical-pokemon-types{
    overflow-y: scroll;
    height: 400px;
    border-radius: 0px;
    background-color: transparent;
  }
</style>
