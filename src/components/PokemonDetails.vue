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
      <v-card width="400">
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

        <v-card-text >
          <div class="font-weight-bold mb-2 display-flex justify-center">
            <!-- {{ pokemonData.element[0].toUpperCase() + pokemonData.element.slice(1) }} -->
            <v-card-title class="white--text l-b">
            <v-avatar size="60" :style="{ backgroundColor: getElementColorHex(pokemonData.element) }">
              <img
                alt="user"
                :src="getElementType(pokemonData.element)"
                class="pa-3"
              >
            </v-avatar>
            <p class="ml-3 grey--text mt-5">
              {{ pokemonData.element[0].toUpperCase() + pokemonData.element.slice(1) }}
            </p>
          </v-card-title>      
          </div>

          <v-timeline
            align-top
            dense
            class="l-g"
          >
            <v-timeline-item
              color="blue"
              small
            >                       
              <div>
                <v-avatar size="90">
                  <img
                    alt="user"
                    :src="pokemonData.sprites[2]"
                    class="pa-3"
                  >
                </v-avatar>                 
                <div class="font-weight-normal">
                  <strong>Fo</strong> @Bar
                </div>
                <div>Len</div>
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
      // console.log("hola");
      }, 1000);
    // }, 5000);

  },
  methods: {
    getPokemonData() {
      // const sprites = this.$route.query.spritesObject;
      const pokemon = this.$route.query.pokemonObject;
      if (pokemon) {
        // this.pokemonData = {
        //   name: pokemon.name,
        //   sprites: Array.isArray(sprites) ? sprites : [sprites],
        // };
        this.pokemonData = pokemon;
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
          return '#008080';
        case 'fire':
          return '#FF5733';
        case 'water':
          return '#87CEFA';
        case 'bug':
          return '#4CAF50';
        case 'normal':
          return '#FFA500';
        case 'poison':
          return '#673AB7';
        case 'electric':
          return '#FFD700';
        case 'ground':
          return '#654321';
        case 'fairy':
          return '#FFC0CB';
        case 'fighting':
          return '#FF8C00';
        case 'rock':
          return '#808080';
        case 'psychic':
          return '#FF1493';
        case 'ghost':
          return '#9370DB';
        case 'ice':
          return '#E0FFFF';
        case 'dragon':
          return '#1A237E';
        case 'dark':
          return '#424242';
        case 'steel':
          return '#37474F';
        default:
          return '#FFA500';
      }
    }
  },
};

// sumar + 1 a la variable index cada 1 segundo, cuandi llegue a 4, reiniciar

// ejecutar codigo 5 segundos despues que carga la pagina


</script>
