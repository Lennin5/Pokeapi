<template>
  <div v-if="pokemonData" class="w-100 h-100 ma-0 d-flex justify-center align-center" style="height: 100vh;" 
  :style="{
    background: pokemonElement2 ? `linear-gradient(to right, ${getElementColorHex(pokemonElement)}, ${getElementColorHex(pokemonElement2)})` : getElementColorHex(pokemonElement),
    }">

      <template v-if="typeView == 'pure' ">
      <img :src="getElementTypeLogo(pokemonElement)" class="" 
      style="width: 800px; height: 800px; object-fit: contain; position: absolute; opacity: 0.08; z-index: 0" />

      <div style="position: absolute; opacity: 1; bottom: 30px; left: 40px" class="d-flex justify-center align-center">
        <img :src="getElementTypeLogo(pokemonElement)" class="" 
        style="width: 90px; height: 90px; object-fit: contain; " />  
        <span>
          <h1 class="white--text ms-2">{{ pokemonElement[0].toUpperCase() + pokemonElement.slice(1) }}</h1>
        </span>
      </div> 
      </template>
      <template v-else>
        <!-- <img :src="getElementTypeLogo(pokemonElement)" class=""         
        style="width: 800px; height: 800px; object-fit: contain; position: absolute; opacity: 0.08; z-index: 0,
        clip-path: polygon(100% 0, 100% 100%, 50% 100%, 50% 0), transform: scaleX(1) translateX(-50%)" /> -->

        <div
          :style="{
              width: '800px',
              height: '800px',
              backgroundImage: 'url(' + getElementTypeLogo(pokemonData.types[0].type.name) + ')',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              position: 'absolute',
              opacity: '0.08',
              marginTop: '10px',
              marginLeft: 'auto',
              marginRight: 'auto',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              top: '0',
              left: '0',
              clipPath: 'polygon(100% 0, 100% 100%, 50% 100%, 50% 0)', /* Mostrar lado derecho */                    
              transform: 'scaleX(1) translateX(-50%)', /* Escalar y ajustar la posición de la imagen */
          }">
        </div>        
        <div
          :style="{
              width: '800px',
              height: '800px',
              backgroundImage: 'url(' + getElementTypeLogo(pokemonData.types[1].type.name) + ')',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              position: 'absolute',
              opacity: '0.08',
              bottom: '0',            
              right: '0',
              clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0% 100%)', /* Cambiado el clipPath */
              transform: 'scaleX(1) translateX(50%)', /* Escalar y ajustar la posición de la imagen */
          }">
        </div>
        
      </template>
   

    <v-carousel
      :cycle="true"
      :continuous="true"
      :show-arrows="false"
      delimiter-icon="mdi-square"
      height="100%"
      hide-delimiter-background
    >
      <v-carousel-item
        v-for="(slide, i) in slides"
        :key="i"
      >
        <v-sheet
          :color="colors[i]"
          height="100%"
          tile
        >
          <div class="d-flex fill-height justify-center align-center">
            <div class="text-h2 white--text" v-if="slide !== 'First'">
              {{ slide }} Slide
            </div>
            <v-row class="d-flex justify-center align-center pt-12" v-if="slide === 'First'">     
              <v-col
                cols="12"
                xs="12"
                sm="12"
                md="12"
                lg="12"
                xl="12"          
                class="d-flex justify-center"
              >
                <div class="d-flex justify-center align-center">
                  <div class="d-flex flex-column justify-center align-center">
                    <v-avatar size="400" class="rounded-sm">
                      <img
                        alt="pokemon"
                        :src="pokemonSprites[index]"
                        class=""
                        style="border: 0px solid white;"
                      />                 
                    </v-avatar> 
                    <span class="align-center white--text font-weight-bold" style="font-size: 40px">
                      {{ pokemonData.name[0].toUpperCase() + pokemonData.name.slice(1) }}
                    </span>
                  </div>
                </div>
              </v-col>
            </v-row>                            
          </div>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>      

      <!-- <v-row class="d-flex justify-center align-center pt-12">      
        <v-col
          cols="12"
          xs="12"
          sm="12"
          md="12"
          lg="12"
          xl="12"          
          class="d-flex justify-center"
        >
          <div class="d-flex justify-center align-center">
            <div class="d-flex flex-column justify-center align-center">
              <v-avatar size="400" class="rounded-sm">
                <img
                  alt="pokemon"
                  :src="pokemonSprites[index]"
                  class="pa-0 l-r"
                  style="border: 0px solid white"
                />                 
              </v-avatar> 
              <span class="align-center white--text font-weight-bold" style="font-size: 40px">
                {{ pokemonData.name[0].toUpperCase() + pokemonData.name.slice(1) }}
              </span>
            </div>
          </div>
        </v-col>
      </v-row>     -->

      <!-- <v-col
          cols="12"
          xs="12"
          sm="12"
          md="6"
          lg="6"
          xl="6"          
      >
      
      <div class="l-r">
        B
      </div>
      </v-col> -->

  

  </div>
</template>

<script>

import BgPokemon from '@/assets/img/bg-pokemon.png';
import pokeApi from '../plugins/axios';
import { useRootStore } from "@/assets/store/index";

export default {
  name: 'PokemonDetails',
  data() {
    return {
      pokemonData: null,
      pokemonElement: null,
      pokemonElement2: null,
      pokemonAbilities: null,
      pokemonId: this.$route.params.id,
      pokemonHeight: null,
      pokemonLevel: null,
      pokemonSprites: [],
      BgPokemon,
      messages: [
        {
          from: 'You',
          message: `Sure, I'll see you later.`,
          time: '10:42am',
          color: 'deep-purple lighten-1',
        },
        {
          from: 'John Doe',
          message: 'Yeah, sure. Does 1:00pm work?',
          time: '10:37am',
          color: 'green',
        },
        {
          from: 'You',
          message: 'Did you still want to grab lunch today?',
          time: '9:47am',
          color: 'deep-purple lighten-1',
        },
      ],
      index: 0,
      rootStore: useRootStore(),
      typeView: 'pure',

        colors: [
          'transparent',
          'transparent',
          'transparent',
          'transparent',
          'transparent',
        ],
        slides: [
          'First',
          'Second',
          'Third',
          'Fourth',
          'Fifth',
        ],      
    };
  },
  created() {
    // console.log(this.$route.params);
    this.getPokemonData();

    setInterval(() => {
      this.index = this.index === 3 ? 0 : this.index + 1;
    }, 1000);

    console.log('currentBreakpoint: ', this.currentBreakpoint);
  },
  methods: {
    async getPokemonData() {
      try {
        const pokemonResponse = await pokeApi.get(`/pokemon/${this.pokemonId}`);
        if(pokemonResponse.status === 200) {
          this.pokemonData = pokemonResponse.data;
          this.pokemonElement = this.pokemonData.types[0].type.name;
        }
              
        if(this.pokemonData?.types[1] == undefined){
          this.pokemonElement2 = null;
          this.typeView = 'pure';
        }else{
          this.pokemonElement2 = await this.pokemonData?.types[1]?.type?.name;
          this.typeView = 'not-pure';          
        }      
        
        this.rootStore.updateNavigationDrawerColor(this.getElementColorHex(this.pokemonElement));
        this.pokemonSprites = [
          this.pokemonData.sprites.front_default,
          this.pokemonData.sprites.back_default,
          this.pokemonData.sprites.front_shiny,
          this.pokemonData.sprites.back_shiny,
        ];     

        // console.log(this.pokemonData, 'pokemonData');
      } catch (error) {
        console.warn(error);
      }
      
    },
    getElementTypeLogo(element) {
      return this.$root.getElementTypeLogo(element);
    },
    getElementColorNormal(element) {
      return this.$root.getElementColorNormal(element);
    },
    getElementColorHex(element) {
      return this.$root.getElementColorHex(element);      
    }       
  },
  computed: {
    currentBreakpoint() {
      return this.$vuetify.breakpoint.name;    
    },
  },  
};


// sumar + 1 a la variable index cada 1 segundo, cuandi llegue a 4, reiniciar

// ejecutar codigo 5 segundos despues que carga la pagina


</script>
