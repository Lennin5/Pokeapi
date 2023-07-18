<template>
  <div style="margin-top: 40px">
    <h1 style="text-align: center;">Pokémon Sprites</h1>
    <br>
    <v-row>
      <v-col
        v-for="pokemon in pokemons"
        :key="pokemon.name"
        cols="12"
        xs="12"
        sm="6"
        md="4"
        lg="3"
        xl="3"
        class="d-flex justify-center"
      >
        <v-card width="400" style="border-radius: 20px !important;">
          <div class="d-flex justify-center">
            <v-img :src="pokemon.sprites[index]" max-height="300px" max-width="150" class="">
            </v-img>
          </div>
          <v-card-text>
            <div class="font-weight-bold ml-8 gray--text d-flex justify-left">
              <h2>
                {{ pokemon.name[0].toUpperCase() + pokemon.name.slice(1) }}
              </h2>
            </div>

            <v-timeline align-bottom dense class="mt-2" style="padding-top: 0px !important">
              <v-card-title class="white--text mt-0">
                <v-avatar 
                  size="56" 
                  :style="{ backgroundColor: getElementColorHex(pokemon.element) }">
                  <img
                    alt="user"
                    :src="getElementType(pokemon.element)"
                    class="pa-2"
                  >
                </v-avatar>
                  <p class="ml-3 font-weight-bold grey--text">
                    {{ pokemon.element[0].toUpperCase() + pokemon.element.slice(1) }} <br>
                      <v-btn
                      :to="{ path: '/details', query: { pokemonObject: pokemon, spritesObject: Object.values(pokemon.sprites) } }"
                      :color="getElementColor(pokemon.element)"
                      class="mt-2"
                      dark>

                      Details
                    </v-btn>
                  </p>                  
              </v-card-title>                
            </v-timeline>
          </v-card-text>

        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import pokeApi from '../plugins/axios';
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
  name: 'PokemonsList',

  data() {
    return {
      pokemons: [],
      BgPokemon: BgPokemon,
      index: 0,

      FireTypeLogo,
      GrassTypeLogo,
      WaterTypeLogo,
      BugTypeLogo,
      NormalTypeLogo,
      PoisonTypeLogo,
      ElectricTypeLogo,
      GroundTypeLogo,
      FairyTypeLogo,
      FightingTypeLogo,
      PsychicTypeLogo,
      RockTypeLogo,
      SteelTypeLogo,
      IceTypeLogo,
      GhostTypeLogo,
      DragonTypeLogo,
      DarkTypeLogo,

    };
  },

  async created() {
    this.getPokemonData();

   setInterval(() => {
     this.index = this.index === 3 ? 0 : this.index + 1;
     // console.log("hola");
     }, 1000);    
  },

  methods: {
    async getPokemonData() {
      try {
        const response = await pokeApi.get('pokemon/?offset=0&limit=200');
        const pokemons = response.data.results;
        console.log(pokemons);

        const pokemonData = await Promise.all(
          pokemons.map(async (pokemon) => {
            const pokemonResponse = await pokeApi.get(`pokemon/${pokemon.name}`);
            const spriteURL = pokemonResponse.data.sprites.front_default;
            const element = pokemonResponse.data.types[0].type.name;
            const abilities = pokemonResponse.data.abilities;
            
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
            };
          })
        );

        this.pokemons = pokemonData;
      } catch (error) {
        console.error(error);
      }
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
    }  
  },

};
</script>
