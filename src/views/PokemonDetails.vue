<template>
  <div v-if="pokemonData" class="w-100 h-100 l- ma-0 d-flex justify-center align-center" style="height: 100vh;" 
  :style="{
    background: pokemonElement2 ? `linear-gradient(to right, ${getElementColorHex(pokemonElement)}, ${getElementColorHex(pokemonElement2)})` : getElementColorHex(pokemonElement),
    }">
     <!-- {{currentBreakpoint}} -->
    <!-- {{isMdAndUp}} -->
      <template v-if="typeView == 'pure' ">
        <img :src="getElementTypeLogo(pokemonElement)" class="l-" 
        style="width: 700px; height: 700px; object-fit: contain; position: absolute; z-index: 0" 
        :style="{opacity: isMdAndUp ? '0.06' : '0.05',}"
        />

        <div class="d-flex justify-center align-center"
        :style="{ position: 'absolute', opacity: 1, bottom: isMdAndUp ? '20px' : 'auto', top: isMdAndUp ? 'auto' : '90px',
            left: isMdAndUp ? '30px' : 'auto', right: 'auto', 'z-index': 4 }">
          <img :src="getElementTypeLogo(pokemonElement)" class="l-" 
          
          style="width: 90px; height: 90px; object-fit: contain; " />  
          <span>
            <h1 class="white--text ms-2">{{ pokemonElement[0].toUpperCase() + pokemonElement.slice(1) }}</h1>
          </span>
        </div> 
      </template>
      <template v-else>
        <!-- Renderizar los 2 logos de los elementos -->
        <div v-for="(element, index) in [pokemonElement, pokemonElement2]" :key="element" 
            :style="{ position: 'absolute', opacity: 1, bottom: isMdAndUp ? '20px' : 'inherit', top: isMdAndUp ? 'inherit' : '70px',
            left: index === 0 ? '30px' : 'auto', right: index === 1 ? '30px' : 'auto', 'z-index': 4 }"
            class="d-flex justify-center align-center">
          <img :src="getElementTypeLogo(element)" 
            :style="{ width: '90px', height: '90px', objectFit: 'contain', order: index === 0 ? 0 : 1 }" />
          <span :style="{ order: index === 0 ? 1 : 0 }">
            <span :class="[
            element === 'flying' ? 'gray--text' : 'white--text', 
            'ms-2', index === 0 ? '' : 'me-2',
            ]"
            class="font-weight-bold text-subtitle-2 text-sm-h6 text-md-h5 text-lg-h4 text-xl-h4 text-2xl-h3">
              {{ element[0].toUpperCase() + element.slice(1) }}
            </span>
          </span>
        </div>
   
        <!-- Renderizar los logos gradiantes de fondo -->
        <div v-for="(type, index) in pokemonData.types" :key="index"
          :style="{
              width: '600px',
              height: '600px',
              backgroundImage: 'url(' + getElementTypeLogo(type.type.name) + ')',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              position: 'absolute',
              opacity: isMdAndUp ? '0.06' : '0.03',
              marginLeft: index === 0 ? 'auto' : '0',
              marginRight: index === 0 ? 'auto' : '0',
              right: index === 1 ? '0' : 'auto',
              left: index === 0 ? '0' : 'auto',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              clipPath: index === 0 ? 'polygon(100% 0, 100% 100%, 50% 100%, 50% 0)' : 'polygon(0 0, 50% 0, 50% 100%, 0% 100%)',
              transform: index === 0 ? 'scaleX(1) translateX(-50%)' : 'scaleX(1) translateX(50%)',
          }">
        </div>        
      </template>
  
      <v-carousel
        v-model="carouselModel"
        :cycle="true"
        :continuous="true"
        :show-arrows="false"
        delimiter-icon="mdi-square"
        :hide-delimiters="true"
        delimiter
        height="100%"
        hide-delimiter-background
        interval="9000"
        class="l-"
      >
        <div class="d-flex justify-center align-center" style="position: absolute; bottom: 0; left: 0; right: 0; padding-bottom: 20px; z-index: 3">
          <div class="d-flex justify-center align-center pa-3 rounded-pill" style="z-index: 3">
            <div v-for="(slide, index) in slides" :key="index" class="d-flex justify-center align-center" style="transition: 5s">
              <v-btn
                :style="{
                  background: index === carouselModel ? 'rgba(266, 266, 266, 0.3)' : 'rgba(266, 266, 266, 0.09)',
                  transition: '0.4s',
                  transform: index === carouselModel ? 'scale(1.2)' : 'scale(1)',
                }"
                class="mx-2"
                style="text-decoration: none !important; color: white !important; box-shadow: none;"
                rounded
                @click="carouselModel = index"
              >
                <v-icon color="white">
                  {{ slide.icon }}
                </v-icon>
                <span style="text-transform: none" v-show="index === carouselModel">
                  {{ slide.title }}
                </span>
              </v-btn>
            </div>
          </div>
        </div>
        <v-carousel-item
          v-for="(slide, index) in slides"
          :key="index"
        >
          <v-sheet
            color="transparent"
            height="100%"
            tile
            class="d-flex justify-center align-center"
          >
            <div class="d-flex justify-center align-start overflow-auto overflow-x-hidden l-" style="width: 90%"
            :style="{
              height: customHeight,
            }">
              <div class="text-h2 white--text" v-if="slide.title !== 'A'" >
                <p v-for="n in 10" :key="n">
                  {{ slide.title }} Slide
                </p>                         
              </div>
              <v-row class="d-flex justify-center align-center pt-12" v-if="slide.title === 'A'">     
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
                      <v-avatar size="400" class="rounded-sm l- d-flex flex-column">
                        <img
                          alt="pokemon"
                          :src="pokemonSprites[indexSlide]"
                          class="l-"
                          style="border: 0px solid white;"
                        />
                      </v-avatar> 
                      <span class="align-center white--text font-weight-bold l-" style="font-size: 40px;">
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
      carouselModel: 0,
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
      indexSlide: 0,
      rootStore: useRootStore(),
      typeView: 'pure',
      slides: [
        {
          title: 'A',
          icon: 'mdi-pokeball',
        },
        {
          title: 'B',
          icon: 'mdi-home',
        },
        {
          title: 'C',
          icon: 'mdi-account',
        },
        {
          title: 'D',
          icon: 'mdi-heart',
        }
      ],      
    };
  },
  created() {
    // console.log(this.$route.params);
    this.getPokemonData();

    // Ejecutar codigo 5 segundos despues que carga la pagina
    // Sumar + 1 a la variable index cada 1 segundo, cuandi llegue a 4, reiniciar    
    setInterval(() => {
      this.indexSlide = this.indexSlide === 1 ? 0 : this.indexSlide + 1;
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

        console.log(this.pokemonData, 'pokemonData');
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
    isMdAndUp() {
      // retornar si el breakpoint actual es mayor o igual a md, es decir: md, lg, xl y xxl
      return this.$vuetify.breakpoint.mdAndUp;
    },
    customHeight() {
      switch (this.currentBreakpoint) {
        case 'xs':
          return '60%';
        case 'sm':
          return '60%';
        case 'md':
          return '60%';
        case 'lg':
          return '70%';
        case 'xl':
          return '70%';
        case '2xl':
          return '80%';
        default:
          return '50%';
      }
    },    
  },  
};



</script>
