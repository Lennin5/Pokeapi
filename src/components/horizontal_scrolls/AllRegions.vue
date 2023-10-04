<template>
    <v-container>
      <div class="d-flex justify-space-between align-center">
        <h1 class="orange--text ml-4" >
        <v-icon color="orange" size="40">mdi-image-filter-hdr</v-icon>
        All Regions</h1>

        <v-hover v-slot="{ hover }" class="d-flex justify-center align-center">
          <span class="me-5 cursor-pointer" @click="$router.push('/type')"
          :class="hover ? 'deep-orange--text accent-4--text text-decoration-underline' : 'orange--text'">
            View all
            <v-icon 
            class="ms-1"
            :color="hover ? 'deep-orange accent-2' : 'orange'"
            size="15">mdi-arrow-right</v-icon>
          </span>
        </v-hover>            
      </div>      
      <div class="horizontal-scroll scroll-container-for-horizontal-div">
        <div>
          <!-- Skeleton loader -->
          <div v-if="allRegions.length === 0">
            <v-card 
            class="card ma-3 rounded-xl"
            :style="{
              width: '200px',
              height: '255px',  
              }" 
              v-for="n in 8" :key="n">
              <div class="d-flex justify-center align-center flex-column">
                  <v-skeleton-loader type="image" aspect-ratio="0.9" height="max-height" class="mt-4 rounded-lg" style="width: 80%"></v-skeleton-loader>
              </div>         
            </v-card>           
          </div>
          <!-- Data rendered -->
          <v-card
          v-for="(region, index) in allRegions"
            :key="region.name"
            width="200"
            class="card ma-3 rounded-xl"
            @click="goToPokemonRegion(index + 1)"
            >
            <div class="d-flex justify-center align-center" 
            :style="{              
              backgroundColor: getElementColorHex('ground'),
              width: '100%',
              height: '200px',              
            }">
                <div
                :style="{
                    width: '160px',
                    height: '160px',
                    backgroundImage: 'url(' + getElementTypeLogo('ground') + ')',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'contain',
                    position: 'absolute',
                    opacity: '0.1',
                }" />
                <div class="">
                    <v-card-text :style="{backgroundColor: getElementColorHex('ground')}">
                        <div class="d-flex justify-center">
                        <span class="font-weight-bold title d-flex justify-center align-center text-uppercase white--text">
                                {{ region.name }}
                        </span>                  
                        </div>
                    </v-card-text>                                  
                </div>
            </div>
          </v-card>  
  
        </div>
      </div>
    </v-container>
  </template>
  
  <script>
  import pokeApi from '../../plugins/axios';
  export default {
  data() {
    return {
      allRegions: [],      
    };
  },
  created() {
    this.getPokemonData();
  },
  methods: {
    async getPokemonData() {
        try {
          // 640 we encounter a flying pokemon (white color)
          const response = await pokeApi.get('/region');
          this.allRegions = response.data.results;
          console.log(response);
        } catch (error) {
          console.error(error);
        }
      }, 
      goToPokemonRegion(regionId) {
        window.location.href = `/region/${regionId}`;
      },  
    }
  };
  </script>
  
  <style scoped>
  .horizontal-scroll {
  width: 100%;
  overflow-x: auto; /* Habilita la barra de desplazamiento horizontal */
  border: 1px solid transparent;
  white-space: nowrap; /* Evita que el contenido se divida en varias líneas */
  }
  
  .card {
  /* width: 100px;
  height: 100px; */
  display: inline-block; /* Para asegurar que las tarjetas se muestren en línea */
  }
  </style>
  