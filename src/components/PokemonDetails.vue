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
