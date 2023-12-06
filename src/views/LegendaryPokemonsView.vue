<template>
  <v-container class="mt-10 mt-lg-0">
    <v-row>          
        <v-col
            v-for="(pokemon, index) in legendaryPokemons"
            :key="index"
            cols="12"
            class="d-flex justify-center"
        >
        <!-- Data rendered -->
        <v-card
            width="100%"
            class="rounded-xl"
            @mouseover="updateNavigationDrawerColorDinamically(pokemon.element), setElementOpacity(pokemon.name, 0.3)"
            @mouseout="setElementOpacity(pokemon.name, 0.2)"
            :style="{
            background: `linear-gradient(to right, 
            rgba(
                ${Math.max(0, parseInt(getElementColorHex(pokemon.element).slice(1, 3), 16) - 40)}, 
                ${Math.max(0, parseInt(getElementColorHex(pokemon.element).slice(3, 5), 16) - 40)}, 
                ${Math.max(0, parseInt(getElementColorHex(pokemon.element).slice(5, 7), 16) + 10 )}), 

            rgba(${Math.min(255, parseInt(getElementColorHex(pokemon.element).slice(1, 3), 16) + 10)}, 
                ${Math.min(255, parseInt(getElementColorHex(pokemon.element).slice(3, 5), 16) + 10)}, 
                ${Math.min(255, parseInt(getElementColorHex(pokemon.element).slice(5, 7), 16) + 30 )}))`,

              width: '100%',
              height: 'auto',              
            }">
                <div
                :class="'pokemon_card_' + pokemon.name"
                :style="{
                    width: '350px',
                    height: '350px',
                    backgroundImage: 'url(' + getElementTypeLogo(pokemon.element) + ')',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'contain',
                    position: 'absolute',
                    opacity: '0.1',
                    right: '-5px',                    
                }" />            
            <v-icon
            :style="{
                color: `rgba(
                    ${Math.min(255, parseInt(getElementColorHex(pokemon.element).slice(1, 3), 16) + 30)}, 
                    ${Math.min(255, parseInt(getElementColorHex(pokemon.element).slice(3, 5), 16) + 30)}, 
                    ${Math.min(255, parseInt(getElementColorHex(pokemon.element).slice(5, 7), 16) + 30)})`,
                position: 'absolute',
            }"
            class="ms-3 mt-3"
            size="30"
            >mdi-star</v-icon>      

            <v-row class="ma-5">
                <v-col cols="12" lg="3" class="d-flex justify-center l-r">
                    <div 
                        :style="{
                            border: '7px solid ' + getBorderColor(pokemon.element),                           
                        }"
                        style="
                            padding: 0px;                            
                            border-radius: 50%;
                            width: 150px;
                            height: 150px;
                        ">
                        <v-img :src="pokemon.sprites[spriteIndex || 0]" max-height="300px" max-width="150" class="mt-0" :class="'pokemon_image_'+pokemon.name"></v-img>
                    </div>                    
                </v-col>                
                <v-col cols="12" lg="9" class="l-b">
                    <div class="d-flex justify-start align-center l-r" 
                        style="opacity: 0.8;"
                        :class="pokemon.element === 'flying' ? 'gray--text' : 'white--text'">
                        <div>
                            <div
                            class="element-icon"
                            :style="{
                                width: '50px',
                                height: '50px',
                                backgroundImage: 'url(' + getElementTypeLogo(pokemon.element) + ')',
                            }"
                            />                           
                        </div>  
                        <div>
                            <h2 class="ms-2">
                                {{ pokemon.name[0].toUpperCase() + pokemon.name.slice(1) }}
                            </h2>                                 
                        </div>                                              
                    </div>                
                </v-col>
            </v-row>
        </v-card>          
                 
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
import pokeApi from '@/plugins/axios';
import { useRootStore } from "@/assets/store/index";
export default {
  data() {
    return {
      legendaryPokemons: [],
      spriteIndex: 0,
      rootStore: useRootStore(),
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
    updateNavigationDrawerColorDinamically(pokemonElement){        
        if(pokemonElement === 'flying'){
            this.rootStore.updateNavigationDrawerColor('white');
        }else{
            var color_rgb = `rgba(
                    ${Math.max(0, parseInt(this.getElementColorHex(pokemonElement).slice(1, 3), 16) - 40)}, 
                    ${Math.max(0, parseInt(this.getElementColorHex(pokemonElement).slice(3, 5), 16) - 40)}, 
                    ${Math.max(0, parseInt(this.getElementColorHex(pokemonElement).slice(5, 7), 16) + 10 )})`

            this.rootStore.updateNavigationDrawerColor(color_rgb);
        }            
    },
    getBorderColor(type){
        if(type === 'flying')
            return '#0000008a';
        else
            return `rgba(
                ${Math.min(255, parseInt(this.getElementColorHex(type).slice(1, 3), 16) + 30)}, 
                ${Math.min(255, parseInt(this.getElementColorHex(type).slice(3, 5), 16) + 30)}, 
                ${Math.min(255, parseInt(this.getElementColorHex(type).slice(5, 7), 16) + 30)})` 
    },    
    async getPokemonData() {
      this.legendaryPokemons = [];
        try {
          const legendaryPokemonIds = [144, 145, 146, 212, 150, 492, 493, 620, 821, 151, 243, 244, 245, 249, 250, 251, 377, 378, 380, 379, 381, 382, 383, 384, 385, 386, 483, 484, 487, 488, 490, 491, 489];

          for (const id of legendaryPokemonIds) {
            try {
              const { data, status } = await pokeApi.get(`/pokemon/${id}`);
              if(status==200){
                const pokemon = data;                
                // const name = pokemon.name;
                const sprites = [
                    pokemon.sprites.front_default,
                    pokemon.sprites.back_default,
                    pokemon.sprites.front_shiny,
                    pokemon.sprites.back_shiny,
                ];
                const element = pokemon.types[0].type.name;

                pokemon.element = element;
                pokemon.sprites = sprites;
                this.legendaryPokemons.push(pokemon);
                // console.log(pokemon, 'TEST');
              }
            } catch (warning) {
              console.warn(warning);
            }

          }            
        } catch (error) {
          console.error("Issues when trying to get legendary pokemons: ", error);
        }
    },   
  }
};
</script>

<style>

</style>