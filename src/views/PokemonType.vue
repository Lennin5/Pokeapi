<template>
  <div>
    <!-- Floating type pokemons button -->
    <FloatingButtons
      :pokemonType="pokemonType"
    />

    <v-container>
      <v-row justify="center" class="mt-0">
        <v-col cols="12">
          <v-card
              class="mx-auto rounded-xl d-flex align-center justify-center"
              width="fullscreen"
              height="200px"
              :style="{
                background: tab === 0 || tab === 1 ? getElementColorHex(pokemonType)
                : 'linear-gradient(to right, ' + getElementColorHex(pokemonType) + ', ' + getRandomPokemonColorHex() + ')'
                }"
              :theme="pokemonType === 'flying' ? 'light' : 'dark'"
            >
            <div
              :style="{
                marginRight: getMarginToTypeBackground(pokemonType),
                backgroundImage: 'url(' + getElementTypeLogo(pokemonType) + ')',
              }"
              style="
                width: 350px;
                height: 200px;
                border-radius: 0px;
                opacity: 0.1;
                position: absolute;
                background-size: cover;
                background-position: center;"
              >
            </div>
            <div class="d-flex justify-start align-end mb-0 cursor-pointer" style="margin-top: -150px; margin-left: 10px; z-index: 1" @click="$router.go(-1)">
              <div>
                <v-icon
                :style="{color: pokemonType === 'flying' ? '#0000008a' : '#ffffff8a'}"
                >mdi-chevron-left</v-icon>
              </div>
              <div>
                <span class="text-subtitle-2"
                :style="{color: pokemonType === 'flying' ? '#0000008a' : '#ffffff8a'}"
                >Back</span>
              </div>
            </div>
            <v-container class="d-flex justify-center align-center" style="border: 1px solid transparent" width="100%">
              <div class="ml-0" style="border: 1px solid transparent;" >

                <v-card-title class="d-flex align-center" >
                    <v-avatar
                    size="80"
                    style="border-radius: 0px;"
                    >
                    <img
                        alt="type-logo"
                        :src="getElementTypeLogo(pokemonType)"
                    />
                    </v-avatar>
                    <span class="text-h4 font-weight-bold ml-2" style="text-align: center;">
                        {{ pokemonType.toUpperCase() }}
                    </span>
                </v-card-title>
              </div>
              <div style="border: 1px solid transparent; width: 50%">
                <v-container class="d-flex justify-end">
                  <div>
                    <v-tabs
                      v-model="tab"
                      :color="pokemonType === 'flying' ? 'grey-darken-3' : 'white'"
                      bg-color="transparent">
                    <v-tab :value="0" @click="setAllPokemons()">
                      <v-icon class="mr-2">mdi-pokeball</v-icon>
                      <span v-if="pokemonsAll.length === 0">All ...</span>
                      <span v-else>All {{ pokemonsAll.length }}</span>
                    </v-tab>
                    <v-tab :value="1" @click="setPurePokemons()">
                      <v-icon class="mr-2">mdi-star</v-icon>
                      <span v-if="pokemonsPure.length === 0">Pure ...</span>
                      <span v-else>Pure {{ pokemonsPure.length }}</span>
                    </v-tab>
                    <v-tab :value="2" @click="setNotPurePokemons()">
                      <v-icon class="mr-2">mdi-star-off</v-icon>
                      <span v-if="pokemonsNotPure.length === 0">Not Pure ...</span>
                      <span v-else>Not Pure {{ pokemonsNotPure.length }}</span>
                    </v-tab>
                    </v-tabs>
                  </div>
                </v-container>
              </div>
                <v-card-actions>
                </v-card-actions>
            </v-container>
            </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-container>
    <!-- Skeleton loader -->
    <v-row v-if="pokemonsList.length === 0">
      <v-col
      v-for="n in 4"
      :key="n"
      cols="12"
      xs="12"
      sm="6"
      md="4"
      lg="3"
      xl="3"
      class="d-flex justify-center"
      >
        <v-card class="rounded-xl" width="100%" style="height: 355px;">
          <div class="d-flex justify-center">
            <v-skeleton-loader type="image" class="mb-8 mt-4 rounded-xl" style="width: 80%; height: 140px"></v-skeleton-loader>
          </div>
          <div>
            <v-col class="d-flex justify-center" style="margin: 0px; padding: 0px;">
              <v-skeleton-loader type="text" style="width: 20%"></v-skeleton-loader>
            </v-col>
          </div>
          <v-skeleton-loader type="avatar" class="mb-5 mt-1 d-flex justify-center"></v-skeleton-loader>
          <div class="d-flex justify-center">
            <v-skeleton-loader type="image" class="mb-3 mt-0" style="width: 50%; height: 35px; border-radius: 10px"></v-skeleton-loader>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Pokemons list via tabs -->
    <v-window v-model="tab">
      <v-window-item :value="0" class="bg-transparent">
          <PokemonTypeList
            :pokemonsList="pokemonsAll"
            :pokemonType="pokemonType"
          />
      </v-window-item>
      <v-window-item :value="1" class="bg-transparent">
          <PokemonTypeList
              :pokemonsList="pokemonsPure"
              :pokemonType="pokemonType"
            />
      </v-window-item>
      <v-window-item :value="2" class="bg-transparent">
          <PokemonTypeList
              :pokemonsList="pokemonsNotPure"
              :pokemonType="pokemonType"
            />
      </v-window-item>
    </v-window>

    </v-container>

  </div>
</template>

<script>
  import pokeApi from '../plugins/axios';
  import FloatingButtons from '../components/FloatingTypesButton.vue';
  import PokemonTypeList from '../components/PokemonTypeList.vue';
  import { useRootStore } from "@/assets/store/index";

export default {
  data() {
    return {
      tab: 0,
      pokemonType: this.$route.params.type,
      pokemonsList: [],
      pokemonsAll: [],
      pokemonsPure: [],
      pokemonsNotPure: [],
      rootStore: useRootStore(),
    };
  },
  created(){
    window.scrollTo(0, 0);
  },
  beforeMount(){
    this.rootStore.updateNavigationDrawerColor(this.getElementColorNormal(this.pokemonType));
  },
  mounted() {
    this.fetchPokemonsByType();
  },
  components: {
    FloatingButtons,
    PokemonTypeList,
  },
  methods: {
    setAllPokemons() { this.tab = 0; },
    setPurePokemons() { this.tab = 1; },
    setNotPurePokemons() { this.tab = 2; },
    async getPurePokemons(){
      const pokemonsPure = this.pokemonsList.filter(pokemon => pokemon.elements.length === 1);
      const pokemonsNotPure = this.pokemonsList.filter(pokemon => pokemon.elements.length > 1);
      this.pokemonsPure = pokemonsPure;
      this.pokemonsNotPure = pokemonsNotPure;
    },
    async fetchPokemonsByType() {
      try {
        const response = await pokeApi.get('/type/' + this.pokemonType);
        const pokemons = response.data.pokemon;

        const pokemonData = await Promise.all(
        pokemons.map(async (pokemon) => {
          const pokemonResponse = await pokeApi.get(`/pokemon/${pokemon.pokemon.name}`);

          const name = pokemonResponse.data.name;
          const spriteURL = pokemonResponse.data.sprites.front_default;
          const element = pokemonResponse.data.types[0].type.name;
          const elements = pokemonResponse.data.types;
          const abilities = pokemonResponse.data.abilities;

          const id = pokemonResponse.data.id;
          const level = pokemonResponse.data.base_experience;
          const height = pokemonResponse.data.height;

          const sprites = [
            pokemonResponse.data.sprites.front_default,
            pokemonResponse.data.sprites.back_default,
            pokemonResponse.data.sprites.front_shiny,
            pokemonResponse.data.sprites.back_shiny,
          ];
          return {
            name: name,
            spriteURL: spriteURL,
            element: element,
            elements: elements,
            sprites: sprites,
            abilities: abilities,
            id: id,
            level: level,
            height: height,
          };
        })
      );

      const filteredPokemonData = pokemonData.filter(pokemon => pokemon.spriteURL !== null);

      this.pokemonsList = filteredPokemonData;
      this.pokemonsAll = filteredPokemonData;
      this.getPurePokemons();

      } catch (error) {
        console.error('Error al cargar los Pokémon:', error);
      }
    },
    getMarginToTypeBackground(pokemonType) {
      const typeMarginMapping = {
        'normal': '640px', 'fighting': '680px', 'flying': '480px',
        'poison': '615px', 'ground': '700px', 'rock': '500px',
        'bug': '562px', 'ghost': '950px', 'steel': '600px',
        'fire': '510px', 'water': '610px', 'grass': '890px',
        'electric': '635px', 'psychic': '670px', 'ice': '545px',
        'dragon': '830px', 'dark': '580px', 'fairy': '587px',
      };
      return typeMarginMapping[pokemonType] || '0px';
    },
  },
};
</script>
<style scoped>
.bg-transparent {
  background-color: #f2f2f2 !important;
}
</style>
