    <!-- <div v-if="pokemonData">
      <h2>{{ pokemonData.name[0].toUpperCase() + pokemonData.name.slice(1) }}</h2>
      <div>
        <img v-for="(sprite, index) in pokemonData.sprites" :key="index" :src="sprite" :alt="pokemonData.name" />
      </div>

      
        <h3>Abilities</h3>
        <ul>
          <li v-for="(ability, index) in pokemonData.abilities" :key="index">
            {{ ability.ability.name }}
          </li>
        </ul>


        <h3>Element</h3>
        <p>{{ pokemonData.element[0].toUpperCase() + pokemonData.element.slice(1) }}</p>
    </div> -->











    <!-- <v-container>
      <br>
    <v-row justify="space-around">
      <v-card width="400" class="rounded-xl">
        <v-img
          height="210px"
          :src="BgPokemon"
        >
          <v-card-title class="white--text mt-2 d-flex flex-column align-center">
            <v-avatar size="125">
              <img
                alt="user"
                :src="pokemonData.sprites[index]"
                class="l-r pa-2"
                style="border: 5px solid white"
              >   
                  
            </v-avatar>                 
            <div class="pa-1 mt-2" style="background-color: #622301;">
              <h2>{{ pokemonData.name[0].toUpperCase() + pokemonData.name.slice(1) }}</h2>                 
            </div>
            
          </v-card-title>
        </v-img>

        <v-card-text>
          <v-timeline align-bottom dense class="mt-2" style="padding-top: 0px !important">
              <v-card-title class="white--text">
                <v-avatar 
                  size="56" 
                  :style="{ backgroundColor: getElementColorHex(pokemonData.element) }">
                  <img
                    alt="user"
                    :src="getElementTypeLogo(pokemonData.element)"
                    class="pa-2"
                  >
                </v-avatar>
                  <p class="ml-3 font-weight-bold grey--text mt-5">
                    Type {{ pokemonData.element[0].toUpperCase() + pokemonData.element.slice(1) }} Pokemon<br>
                  </p>                  
              </v-card-title>    
              <v-timeline-item 
              :color="getElementColorNormal(pokemonData.element)" 
              medium 
              icon="mdi-information" 
              :fill-dot="true">
              <div>                
                <div class="font-weight-normal grey--text">
                  <strong>Basic Information</strong>
                </div>
                <div>
                  <ul>
                      <strong class="grey--text">ID:</strong> {{ pokemonId }} <br>
                      <strong class="grey--text">Height:</strong> {{ pokemonHeight }} cm <br>
                      <strong class="grey--text">Level:</strong> {{ pokemonLevel }} <br>
                  </ul>
                </div>                               
              </div>                
              </v-timeline-item>       
              <v-timeline-item 
              :color="getElementColorNormal(pokemonData.element)" 
              medium 
              icon="mdi-flash" 
              :fill-dot="true">
              <div>                
                <div class="font-weight-normal grey--text">
                  <strong>Abilities</strong>
                </div>
                <div>
                  <ul>
                    <li v-for="(pokemon, index) in pokemonData.abilities" :key="index">
                      {{ pokemon.ability.name }}
                    </li>
                  </ul>
                </div>                               
              </div>                
              </v-timeline-item>     
              <v-timeline-item 
              :color="getElementColorNormal(pokemonData.element)" 
              medium 
              icon="mdi-star" 
              :fill-dot="true">
              <div>                
                <div class="font-weight-normal grey--text">
                  <strong>Level</strong>
                </div>
                <div>
                  <ul>
                    <li>
                      {{ pokemonLevel }}

                    </li>
                  </ul>
                </div>                               
              </div>                
              </v-timeline-item>            
            </v-timeline>          
          
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>     -->


<template>
  <div v-if="pokemonData" class="w-100 h-100 ma-0 d-flex justify-center align-center" style="height: 100vh;" :style="{backgroundColor: getElementColorHex(pokemonElement)}">
      <img :src="getElementTypeLogo(pokemonElement)" class="" 
      style="width: 800px; height: 800px; object-fit: contain; position: absolute; opacity: 0.08; z-index: 0" />

      <div style="position: absolute; opacity: 1; bottom: 30px; left: 40px" class="d-flex justify-center align-center">
        <img :src="getElementTypeLogo(pokemonElement)" class="" 
        style="width: 90px; height: 90px; object-fit: contain; " />  
        <span>
          <h1 class="white--text ms-2">{{ pokemonElement[0].toUpperCase() + pokemonElement.slice(1) }}</h1>
        </span>
      </div>    

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
  },
  methods: {
    async getPokemonData() {
      try {
        const pokemonResponse = await pokeApi.get(`/pokemon/${this.pokemonId}`);
        this.pokemonData = pokemonResponse.data;
        this.pokemonElement = await this.pokemonData?.types[0]?.type?.name;

        
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
};

// sumar + 1 a la variable index cada 1 segundo, cuandi llegue a 4, reiniciar

// ejecutar codigo 5 segundos despues que carga la pagina


</script>
