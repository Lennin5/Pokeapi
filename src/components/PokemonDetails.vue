<template>
  <div>

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
    <v-container>
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
            <v-badge
        bordered
        bottom
        color="deep-purple accent-4"
        dot
        offset-x="50"
        offset-y="50"
      />                    
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
                    :src="getElementType(pokemonData.element)"
                    class="pa-2"
                  >
                </v-avatar>
                  <p class="ml-3 font-weight-bold grey--text mt-5">
                    Type {{ pokemonData.element[0].toUpperCase() + pokemonData.element.slice(1) }} Pokemon<br>
                  </p>                  
              </v-card-title>    
              <v-timeline-item 
              :color="getElementColor(pokemonData.element)" 
              medium 
              icon="mdi-information" 
              :fill-dot="true">
              <div>                
                <div class="font-weight-normal grey--text">
                  <strong>Basic Information</strong>
                </div>
                <div>
                  <ul>
                    <li>
                      <strong class="grey--text">ID:</strong> {{ pokemonId }} <br>
                      <strong class="grey--text">Height:</strong> {{ pokemonHeight }} cm <br>
                      <strong class="grey--text">Level:</strong> {{ pokemonLevel }} cm <br>
                    </li>
                  </ul>
                </div>                               
              </div>                
              </v-timeline-item>       
              <v-timeline-item 
              :color="getElementColor(pokemonData.element)" 
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
              :color="getElementColor(pokemonData.element)" 
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

          <!-- <v-timeline
            align-top
            dense
          >
            <v-timeline-item
              v-for="message in messages"
              :key="message.time"
              :color="message.color"
              small
            >
              <div>
                <div class="font-weight-normal">
                  <strong>{{ message.from }}</strong> @{{ message.time }}
                </div>
                <div>{{ message.message }}</div>
              </div>
            </v-timeline-item>
          </v-timeline> -->
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>    

  </div>
</template>

<script>

import BgPokemon from '@/assets/img/bg-pokemon.png';

import FireTypeLogo from '@/assets/img/types/fire.svg';
import GrassTypeLogo from '@/assets/img/types/grass.svg';
import WaterTypeLogo from '@/assets/img/types/water.svg';
import BugTypeLogo from '@/assets/img/types/bug.svg';
import NormalTypeLogo from '@/assets/img/types/normal.svg';
import PoisonTypeLogo from '@/assets/img/types/poison.svg';
import ElectricTypeLogo from '@/assets/img/types/electric.svg';
import GroundTypeLogo from '@/assets/img/types/ground.svg';
import FairyTypeLogo from '@/assets/img/types/fairy.svg';
import FightingTypeLogo from '@/assets/img/types/fighting.svg';
import PsychicTypeLogo from '@/assets/img/types/psychic.svg';
import RockTypeLogo from '@/assets/img/types/rock.svg';
import SteelTypeLogo from '@/assets/img/types/steel.svg';
import IceTypeLogo from '@/assets/img/types/ice.svg';
import GhostTypeLogo from '@/assets/img/types/ghost.svg';
import DragonTypeLogo from '@/assets/img/types/dragon.svg';
import DarkTypeLogo from '@/assets/img/types/dark.svg';

export default {
  name: 'PokemonDetails',
  data() {
    return {
      pokemonData: null,
      pokemonAbilities: null,
      pokemonId: null,
      pokemonHeight: null,
      pokemonLevel: null,
      BgPokemon,
      FireTypeLogo,
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
    };
  },
  created() {
    this.getPokemonData();
    
    // setTimeout(() => {

      setInterval(() => {
     this.index = this.index === 3 ? 0 : this.index + 1;
      }, 1000);

    // }, 5000);

  },
  methods: {
    getPokemonData() {
      // const sprites = this.$route.query.spritesObject;
      const pokemon = this.$route.query.pokemonObject;
      if (pokemon) {
        this.pokemonData = pokemon;
        this.pokemonAbilities = pokemon.abilities;

        this.pokemonId = pokemon.id;
        this.pokemonHeight = pokemon.height;
        this.pokemonLevel = pokemon.level;
        console.log(this.pokemonData);
      }
      console.log(pokemon);
    },
    getElementType(element) {
      switch (element) {
        case 'grass':
          return GrassTypeLogo;
        case 'fire':
          return FireTypeLogo;
        case 'water':
          return WaterTypeLogo;
        case 'bug':
          return BugTypeLogo;
        case 'normal':
          return NormalTypeLogo;
        case 'poison':
          return PoisonTypeLogo;
        case 'electric':
          return ElectricTypeLogo;
        case 'ground':
          return GroundTypeLogo;
        case 'fairy':
          return FairyTypeLogo;
        case 'fighting':
          return FightingTypeLogo;
        case 'rock':
          return RockTypeLogo;
        case 'psychic':
          return PsychicTypeLogo;
        case 'ghost':
          return GhostTypeLogo;
        case 'ice':
          return IceTypeLogo;
        case 'dragon':
          return DragonTypeLogo;
        case 'dark':
          return DarkTypeLogo;
        case 'steel':
          return SteelTypeLogo;
        default:
          return NormalTypeLogo
      }
    },
    getElementColorHex(element) {
      switch (element) {
        case 'grass':
          return '#4DB6AC';
        case 'fire':
          return '#EF5350';
        case 'water':
          return '#4FC3F7';
        case 'bug':
          return '#00C853';
        case 'normal':
          return '#FF9800';
        case 'poison':
          return '#7C4DFF';
        case 'electric':
          return '#FBC02D';
        case 'ground':
          return '#5D4037';
        case 'fairy':
          return '#F06292';
        case 'fighting':
          return '#FF8A65';
        case 'rock':
          return '#757575';
        case 'psychic':
          return '#D81B60';
        case 'ghost':
          return '#9575CD';
        case 'ice':
          return '#80DEEA';
        case 'dragon':
          return '#3949AB';
        case 'dark':
          return '#424242';
        case 'steel':
          return '#546E7A';
        default:
          return '#FF9800';
      }
    },
    getElementColor(element) {
      switch (element) {
        case 'grass':
          return 'teal lighten-2';
        case 'fire':
          return 'red lighten-1';
        case 'water':
          return 'light-blue lighten-2';
        case 'bug':
          return 'green accent-4';
        case 'normal':
          return 'orange';
        case 'poison':
          return 'deep-purple accent-2';
        case 'electric':
          return 'yellow darken-2';
        case 'ground':
          return 'brown darken-2';
        case 'fairy':
          return 'pink lighten-2';
        case 'fighting':
          return 'deep-orange lighten-2';
        case 'rock':
          return 'grey darken-1';
        case 'psychic':
          return 'pink darken-1';
        case 'ghost':
          return 'deep-purple lighten-2';
        case 'ice':
          return 'cyan lighten-3';
        case 'dragon':
          return 'indigo darken-1';
        case 'dark':
          return 'grey darken-3';
        case 'steel':
          return 'blue-grey darken-1';
        default:
          return 'orange';
      }
    },    
  },
};

// sumar + 1 a la variable index cada 1 segundo, cuandi llegue a 4, reiniciar

// ejecutar codigo 5 segundos despues que carga la pagina


</script>
