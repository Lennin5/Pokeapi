<template>
  <div class="fab-container">
    <transition name="slide-y-reverse">
      <div v-if="fab" class="scroll-container-for-vertical-pokemon-types">
        <div
          v-for="(pokemon, key) in pokemonTypes"
          :key="key">
          <div
            v-if="pokemon.name !== 'shadow' && pokemon.name !== 'unknown'"
            class="container-element-floating-button mt-0 mb-2 ms-1 me-1"
            style="cursor: pointer;"
            :style="{
              backgroundColor: getElementColorHex(pokemon.name),
              boxShadow: pokemon.name === 'flying' ? '0px 0px 2px 0px #343838' : 'none',
            }"
            @click="goToPokemonType(pokemon.name)"
          >
            <div
              class="element-icon-floating-button"
              :style="{
                backgroundImage: 'url(' + getElementTypeLogo(pokemon.name) + ')',
              }"
            />
          </div>
        </div>
      </div>
    </transition>

    <v-btn
      :color="getElementColorNormal(pokemonType)"
      icon
      size="56"
      @click="fab = !fab"
    >
      <v-icon v-if="fab" :color="pokemonType === 'flying' ? 'black' : 'white'">
        mdi-close
      </v-icon>
      <div v-else class="container-element">
        <div
          class="element-icon"
          :style="{
            backgroundImage: 'url(' + getElementTypeLogo(pokemonType) + ')',
          }"
        />
      </div>
    </v-btn>
  </div>
</template>

<script>
import pokeApi from '../plugins/axios';
export default {
  props: {
    pokemonType: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    fab: false,
    pokemonTypes: [],
  }),
  methods: {
    async getPokemonTypes() {
      try {
        const response = await pokeApi.get('/type');
        this.pokemonTypes = response.data.results;
      } catch (error) {
        console.log(error);
      }
    },
    goToPokemonType(pokemonType) {
      window.location.href = `/type/${pokemonType}`;
    },
  },
  created() {
    this.getPokemonTypes();
  },
};
</script>

<style>
.fab-container {
  position: fixed;
  bottom: 10px;
  right: 10px;
  z-index: 99;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.scroll-container-for-vertical-pokemon-types {
  overflow-y: scroll;
  height: 400px;
  border-radius: 0px;
  background-color: transparent;
  margin-bottom: 8px;
}

.slide-y-reverse-enter-active,
.slide-y-reverse-leave-active {
  transition: all 0.3s ease;
}
.slide-y-reverse-enter-from,
.slide-y-reverse-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
