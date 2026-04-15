<template>
    <v-container>
      <div class="d-flex justify-space-between align-center">
        <h1 class="orange--text ml-4" >
        <v-icon color="orange" size="35">mdi-checkbox-multiple-blank</v-icon>
        All Types</h1>

        <v-hover v-slot="{ isHovering, props }" class="d-flex justify-center align-center">
          <span v-bind="props" class="me-5 cursor-pointer" @click="$router.push('/type')"
          :class="isHovering ? 'text-decoration-underline' : ''"
          :style="{ color: isHovering ? '#FF5722' : '#FF9800' }">
            View all
            <v-icon
            class="ms-1"
            :color="isHovering ? 'deep-orange-accent-2' : 'orange'"
            size="15">mdi-arrow-right</v-icon>
          </span>
        </v-hover>
      </div>
      <div class="horizontal-scroll scroll-container-for-horizontal-div">
        <div>
          <!-- Skeleton loader -->
          <div v-if="allTypes.length === 0">
            <v-card
            class="card ma-3 rounded-xl"
            :style="{
              width: '200px',
              height: '255px',
              }"
              v-for="n in 8" :key="n">
              <div class="d-flex justify-center align-center flex-column">
                  <v-skeleton-loader type="image" height="max-height" class="mt-4 rounded-lg" style="width: 80%"></v-skeleton-loader>
              </div>
            </v-card>
          </div>
          <!-- Data rendered -->
          <v-card
          v-for="(type) in allTypes"
            :key="type.name"
            width="200"
            class="card ma-3 rounded-xl"
            @click="goToPokemonType(type.name)"
            @mouseover="setElementTypeOpacity(type.name, 0.3)"
            @mouseout="setElementTypeOpacity(type.name, 0.1)">
            <div class="d-flex justify-center align-center"
            :style="{
              backgroundColor: getElementColorHex(type.name),
              width: '100%',
              height: '200px',
            }">
                <div
                :id="'type_card_' + type.name"
                :style="{
                    width: '160px',
                    height: '160px',
                    backgroundImage: 'url(' + getElementTypeLogo(type.name) + ')',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'contain',
                    position: 'absolute',
                    opacity: '0.1',
                }" />
                <div class="">
                    <v-card-text :style="{backgroundColor: getElementColorHex(type.name)}">
                        <div class="d-flex justify-center">
                        <span class="font-weight-bold text-h6 d-flex justify-center align-center text-uppercase"
                            :class="type.name === 'flying' ? 'gray--text' : 'white--text'">
                                {{ type.name[0].toUpperCase() + type.name.slice(1) }}
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
      allTypes: [],
    };
  },
  created() {
    this.getPokemonData();
  },
  methods: {
    async getPokemonData() {
        try {
          const response = await pokeApi.get('/type');
          this.allTypes = response.data.results;
          this.allTypes.sort(() => Math.random() - 0.5);
        } catch (error) {
          console.error(error);
        }
      },
      goToPokemonType(pokemonType) {
        window.location.href = `/type/${pokemonType}`;
      },
      setElementTypeOpacity(pokemonType, opacity) {
        const typeCard = document.getElementById(`type_card_${pokemonType}`);
        if (typeCard) {
            typeCard.style.opacity = opacity;
            typeCard.style.transform = opacity === 0.3 ? 'scale(1.1)' : 'scale(1)';
            typeCard.style.transition = 'all 0.3s ease-in-out';
        }
      },
    }
  };
  </script>

  <style scoped>
  .horizontal-scroll {
  width: 100%;
  overflow-x: auto;
  border: 1px solid transparent;
  white-space: nowrap;
  }

  .card {
  display: inline-block;
  }
  </style>
