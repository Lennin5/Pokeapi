<template>
  <div
    v-if="pokemonData"
    class="pokemon-details-page w-100 ma-0 d-flex justify-center align-center"
    :style="detailPageStyle"
  >
    <div
      class="d-flex justify-center align-center cursor-pointer mt-3 ms-3"
      style="position: absolute; top: 0; left: 0; z-index: 5"
      @click="$router.go(-1)"
    >
      <div class="d-flex justify-center align-center">
        <v-icon :style="{ color: pokemonElement === 'flying' ? '#0000008a' : '#ffffff8a' }">
          mdi-chevron-left
        </v-icon>
      </div>
      <div class="d-flex justify-center align-center">
        <span
          class="block text-subtitle-1"
          :style="{ color: pokemonElement === 'flying' ? '#0000008a' : '#ffffff8a' }"
        >
          Back
        </span>
      </div>
    </div>

    <template v-if="typeView === 'pure'">
      <img
        :src="getElementTypeLogo(pokemonElement)"
        style="width: 700px; height: 700px; object-fit: contain; position: absolute; z-index: 0"
        :style="{ opacity: isMdAndUp ? '0.06' : '0.05' }"
      />

      <div
        class="d-flex justify-center align-center"
        :style="{
          position: 'absolute',
          opacity: 1,
          bottom: isMdAndUp ? '20px' : 'inherit',
          top: isMdAndUp ? 'inherit' : '55px',
          left: isMdAndUp ? '30px' : 'inherit',
          right: 'inherit',
          zIndex: 4,
        }"
      >
        <img
          :src="getElementTypeLogo(pokemonElement)"
          style="width: 90px; height: 90px; object-fit: contain"
        />
        <span>
          <h1 class="ms-2" :class="pokemonElement === 'flying' ? 'gray--text' : 'white--text'">
            {{ formatLabel(pokemonElement) }}
          </h1>
        </span>
      </div>
    </template>

    <template v-else>
      <div
        v-for="(element, index) in [pokemonElement, pokemonElement2]"
        :key="element"
        class="d-flex justify-center align-center"
        :style="{
          position: 'absolute',
          opacity: 0.8,
          bottom: isMdAndUp ? '20px' : 'inherit',
          top: isMdAndUp ? 'inherit' : '70px',
          left: index === 0 ? '30px' : 'auto',
          right: index === 1 ? '30px' : 'auto',
          zIndex: 4,
        }"
      >
        <img
          :src="getElementTypeLogo(element)"
          :style="{ width: '90px', height: '90px', objectFit: 'contain', order: index === 0 ? 0 : 1 }"
        />
        <span :style="{ order: index === 0 ? 1 : 0 }">
          <span
            :class="[
              element === 'flying' ? 'gray--text' : 'white--text',
              'font-weight-bold text-subtitle-2 text-sm-h6 text-md-h5 text-lg-h4 text-xl-h4 text-2xl-h3',
              index === 0 ? 'ms-2' : 'me-2',
            ]"
          >
            {{ formatLabel(element) }}
          </span>
        </span>
      </div>

      <div
        v-for="(type, index) in pokemonData.types"
        :key="type.type.name"
        :style="{
          width: '600px',
          height: '600px',
          backgroundImage: 'url(' + getElementTypeLogo(type.type.name) + ')',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          position: 'absolute',
          opacity: isMdAndUp ? '0.05' : '0.03',
          marginLeft: index === 0 ? 'auto' : '0',
          marginRight: index === 0 ? 'auto' : '0',
          right: index === 1 ? '0' : 'auto',
          left: index === 0 ? '0' : 'auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          clipPath:
            index === 0
              ? 'polygon(100% 0, 100% 100%, 50% 100%, 50% 0)'
              : 'polygon(0 0, 50% 0, 50% 100%, 0% 100%)',
          transform: index === 0 ? 'scaleX(1) translateX(-50%)' : 'scaleX(1) translateX(50%)',
        }"
      ></div>
    </template>

    <div
      class="d-flex justify-center align-center"
      style="position: absolute; bottom: 0; left: 0; right: 0; padding-bottom: 20px; z-index: 5"
    >
      <div class="d-flex justify-center align-center pa-3 rounded-pill" style="z-index: 5">
        <div
          v-for="(slide, index) in slides"
          :key="slide.key"
          class="d-flex justify-center align-center"
          style="transition: 0.4s"
        >
          <v-btn
            class="mx-2"
            style="text-decoration: none !important; box-shadow: none"
            rounded
            :style="{
              background:
                pokemonElement === 'flying'
                  ? index === carouselModel
                    ? 'rgba(0, 0, 0, 0.5)'
                    : 'rgba(0, 0, 0, 0.1)'
                  : index === carouselModel
                    ? 'rgba(266, 266, 266, 0.3)'
                    : 'rgba(266, 266, 266, 0.09)',
              transition: '0.4s',
              transform: index === carouselModel ? 'scale(1.2)' : 'scale(1)',
              color:
                pokemonElement === 'flying'
                  ? pokemonElement2 == null
                    ? '#BDBDBD'
                    : '#E5E5E5'
                  : '#fff',
            }"
            @click="carouselModel = index"
          >
            <v-icon
              :color="
                pokemonElement === 'flying'
                  ? pokemonElement2 == null
                    ? '#BDBDBD'
                    : '#E5E5E5'
                  : 'white'
              "
            >
              {{ slide.icon }}
            </v-icon>
            <span v-show="index === carouselModel" style="text-transform: none">
              {{ slide.title }}
            </span>
          </v-btn>
        </div>
      </div>
    </div>

    <v-carousel
      v-model="carouselModel"
      :cycle="false"
      :continuous="true"
      :show-arrows="false"
      :hide-delimiters="true"
      height="100%"
      hide-delimiter-background
      interval="9000"
    >
      <v-carousel-item v-for="slide in slides" :key="slide.key">
        <v-sheet
          color="transparent"
          height="100%"
          tile
          class="d-flex justify-center align-center"
          :dark="pokemonElement !== 'flying'"
          :light="pokemonElement === 'flying'"
        >
          <div
            :class="[
              'w-100',
              'custom-scroll-bar',
              'pokemon-scroll-area',
              { 'pokemon-scroll-area--sprites': slide.key === 'sprites' },
            ]"
          >

            <section
              v-if="slide.key === 'sprites'"
              class="w-100 h-100 d-flex justify-center align-center py-4 py-md-6 mt-6 sprites-section"
            >
              <div
                class="w-100 d-flex flex-column flex-lg-row justify-center align-center sprites-layout"
                style="gap: 24px"
              >
                <v-card flat class="pokemon-glass-card rounded-xl pa-4 pa-md-6 sprite-preview-card">
                  <div class="sprite-stage">
                    <span class="sprite-stage__number">#{{ paddedPokemonId }}</span>
                    <img
                      v-if="selectedSprite"
                      :src="selectedSprite"
                      :alt="selectedSpriteName"
                      class="sprite-stage__image"
                    />
                    <div class="text-subtitle-1 font-weight-bold mt-4 text-center" :class="contentTextClass">
                      {{ selectedSpriteName }}
                    </div>
                    <div class="pokemon-muted text-body-2 mt-1 text-center">
                      {{ pokemonSprites.length }} variantes encontradas en la API
                    </div>
                  </div>
                </v-card>

                <div class="d-flex flex-column" style="gap: 12px; width: min(100%, 760px)">
                  <div class="sprite-picker-title px-1" :class="contentTextClass">
                    {{ pokemonDisplayName.toUpperCase() }}
                  </div>
                  <div class="sprite-selection-scroll custom-scroll-bar">
                    <div class="d-flex flex-wrap justify-center align-stretch" style="gap: 16px">
                      <v-card
                        v-for="sprite in pokemonSprites"
                        :key="sprite.name"
                        flat
                        class="pokemon-inner-card rounded-lg pa-4 d-flex flex-column align-center justify-center sprite-thumb"
                        :style="{
                          border:
                            selectedSprite === sprite.url
                              ? '2px solid rgba(255,255,255,0.35) !important'
                              : '1px solid transparent !important',
                          background:
                            selectedSprite === sprite.url
                              ? 'rgba(255,255,255,0.14) !important'
                              : 'var(--pokemon-chip-bg)',
                          boxShadow:
                            selectedSprite === sprite.url
                              ? '0 0 0 1px rgba(255,255,255,0.12) inset'
                              : 'none',
                        }"
                        @click="selectedSprite = sprite.url"
                      >
                        <img
                          :src="sprite.url"
                          :alt="sprite.name"
                          width="120"
                          height="120"
                          style="object-fit: contain"
                        />
                        <span class="text-caption text-center font-weight-medium mt-2" :class="contentTextClass">
                          {{ sprite.name }}
                        </span>
                      </v-card>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section v-else-if="slide.key === 'overview'" class="w-100 py-4 px-3">
              <div class="overview-grid">
                <div class="overview-left-stack">
                  <v-card flat class="pokemon-glass-card rounded-xl pa-5">
                    <div class="text-overline pokemon-muted">Overview</div>
                    <div
                      class="d-flex flex-column flex-md-row justify-space-between align-start"
                      style="gap: 16px"
                    >
                      <div>
                        <div class="text-h4 font-weight-bold mb-2" :class="contentTextClass">
                          {{ pokemonDisplayName }}
                        </div>
                        <div class="text-subtitle-1 pokemon-muted">
                          #{{ paddedPokemonId }} - {{ pokemonGenus }}
                        </div>
                      </div>
                      <v-chip small pill class="pokemon-chip font-weight-bold">
                        {{ formatLabel(pokemonSpeciesData?.generation?.name || 'unknown') }}
                      </v-chip>
                    </div>

                    <p class="mt-5 mb-0 text-body-1 pokemon-description" :class="contentTextClass">
                      {{ pokemonFlavorText }}
                    </p>
                  </v-card>

                  <v-card flat class="pokemon-glass-card rounded-xl pa-5">
                    <v-row dense>
                      <v-col cols="12" md="4">
                        <div class="text-overline pokemon-muted mb-3">Types</div>
                        <div class="d-flex flex-wrap" style="gap: 12px">
                          <v-chip
                            v-for="type in pokemonTypeBadges"
                            :key="type.raw"
                            small
                            pill
                            class="font-weight-bold"
                            :style="{
                              backgroundColor: getElementColorHex(type.raw),
                              color: type.raw === 'flying' ? '#424242' : '#ffffff',
                            }"
                          >
                            {{ type.label }}
                          </v-chip>
                        </div>
                      </v-col>

                      <v-col cols="12" md="4">
                        <div class="text-overline pokemon-muted mb-3">Abilities</div>
                        <div class="d-flex flex-wrap" style="gap: 12px">
                          <v-chip
                            v-for="ability in pokemonAbilityBadges"
                            :key="ability.raw"
                            small
                            pill
                            class="pokemon-chip font-weight-medium"
                          >
                            {{ ability.label }}<span v-if="ability.hidden"> - Hidden</span>
                          </v-chip>
                        </div>
                      </v-col>

                      <v-col cols="12" md="4">
                        <div class="text-overline pokemon-muted mb-3">Egg Groups</div>
                        <div v-if="pokemonEggGroups.length" class="d-flex flex-wrap" style="gap: 12px">
                          <v-chip
                            v-for="eggGroup in pokemonEggGroups"
                            :key="eggGroup"
                            small
                            pill
                            class="pokemon-chip font-weight-medium"
                          >
                            {{ eggGroup }}
                          </v-chip>
                        </div>
                        <div v-else class="pokemon-muted text-body-2">
                          No hay grupos de huevo disponibles para este pokemon.
                        </div>
                      </v-col>
                    </v-row>
                  </v-card>
                </div>

                <v-card flat class="pokemon-glass-card rounded-xl pa-5 overview-species-card">
                  <div class="text-overline pokemon-muted mb-2">Species Data</div>
                  <div class="d-flex flex-column" style="gap: 0">
                    <div
                      v-for="item in overviewFacts"
                      :key="item.label"
                      class="d-flex justify-space-between align-center pokemon-fact-row"
                    >
                      <span class="pokemon-muted">{{ item.label }}</span>
                      <span class="font-weight-bold text-right" :class="contentTextClass">
                        {{ item.value }}
                      </span>
                    </div>
                  </div>
                </v-card>

                <v-card flat class="pokemon-glass-card rounded-xl pa-5 overview-extra-card">
                  <div class="text-overline pokemon-muted mb-3">Extra Data</div>
                  <v-row dense>
                    <v-col
                      v-for="item in overviewExtraFacts"
                      :key="item.label"
                      cols="12"
                      sm="6"
                      md="4"
                      lg="3"
                    >
                      <div class="pokemon-extra-fact">
                        <div class="pokemon-muted text-caption font-weight-medium text-uppercase">
                          {{ item.label }}
                        </div>
                        <div class="font-weight-bold mt-1" :class="contentTextClass">
                          {{ item.value }}
                        </div>
                      </div>
                    </v-col>
                  </v-row>
                </v-card>
              </div>
            </section>

            <section v-else-if="slide.key === 'stats'" class="w-100 py-4 px-3">
              <div class="stats-grid">
                <v-card flat class="pokemon-glass-card rounded-xl pa-5">
                  <div class="d-flex justify-space-between align-center mb-5" style="gap: 16px">
                    <div>
                      <div class="text-overline pokemon-muted">Base Stats</div>
                      <div class="text-h6 font-weight-bold" :class="contentTextClass">
                        Distribucion de stats
                      </div>
                    </div>
                    <v-chip small pill class="pokemon-chip font-weight-bold">
                      Total {{ pokemonStatTotal }}
                    </v-chip>
                  </div>

                  <div class="d-flex flex-column" style="gap: 18px">
                    <div v-for="stat in normalizedStats" :key="stat.key">
                      <div class="d-flex justify-space-between align-center mb-2">
                        <span class="pokemon-muted font-weight-medium">{{ stat.label }}</span>
                        <span class="font-weight-bold" :class="contentTextClass">{{ stat.value }}</span>
                      </div>
                      <v-progress-linear
                        class="stat-progress-pill"
                        height="14"
                        :background-color="statTrackColor"
                        :color="stat.color"
                        :value="stat.percentage"
                      ></v-progress-linear>
                      <div v-if="stat.effort" class="pokemon-muted text-caption mt-1">
                        EV yield: {{ stat.effort }}
                      </div>
                    </div>
                  </div>
                </v-card>

                <div class="stats-right-stack">
                  <v-card flat class="pokemon-glass-card rounded-xl pa-5">
                    <div class="text-overline pokemon-muted">Power Score</div>
                    <div class="text-h2 font-weight-bold mt-2" :class="contentTextClass">
                      {{ pokemonStatTotal }}
                    </div>
                    <div class="pokemon-muted text-body-2">
                      Suma de todos los stats base reportados por la API.
                    </div>
                  </v-card>

                  <v-card flat class="pokemon-glass-card rounded-xl pa-5">
                    <div class="text-overline pokemon-muted mb-2">Training</div>
                    <div class="d-flex flex-column" style="gap: 0">
                      <div
                        v-for="item in trainingFacts"
                        :key="item.label"
                        class="d-flex justify-space-between align-center pokemon-fact-row"
                      >
                        <span class="pokemon-muted">{{ item.label }}</span>
                        <span class="font-weight-bold text-right" :class="contentTextClass">
                          {{ item.value }}
                        </span>
                      </div>
                    </div>
                  </v-card>
                </div>
              </div>
            </section>

            <section v-else-if="slide.key === 'moves'" class="w-100 py-4 px-3">
              <v-card flat class="pokemon-glass-card rounded-xl pa-5">
                <div
                  class="d-flex flex-column flex-md-row justify-space-between align-start align-md-center mb-5"
                  style="gap: 12px"
                >
                  <div>
                    <div class="text-overline pokemon-muted">Moves</div>
                    <div class="text-h6 font-weight-bold" :class="contentTextClass">
                      {{ pokemonMovesDetailed.length }} movimientos disponibles
                    </div>
                  </div>
                  <div class="pokemon-muted text-body-2">
                    Ordenados por metodo principal de aprendizaje y nivel.
                  </div>
                </div>

                <v-row dense>
                  <v-col
                    v-for="move in pokemonMovesDetailed"
                    :key="move.key"
                    cols="12"
                    sm="6"
                    lg="4"
                    xl="3"
                  >
                    <v-card flat class="pokemon-inner-card rounded-lg pa-4 move-card">
                      <div class="text-subtitle-1 font-weight-bold" :class="contentTextClass">
                        {{ move.name }}
                      </div>
                      <div class="pokemon-muted text-body-2 mt-2">{{ move.versionGroup }}</div>
                      <div class="d-flex flex-wrap mt-3" style="gap: 8px">
                        <v-chip small pill class="pokemon-chip">{{ move.learnMethod }}</v-chip>
                        <v-chip small pill class="pokemon-chip">{{ move.levelLabel }}</v-chip>
                      </div>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card>
            </section>

          </div>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
import pokeApi from '../plugins/axios';
import { useRootStore } from '@/assets/store/index';

const STAT_LABELS = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  'special-attack': 'Sp. Attack',
  'special-defense': 'Sp. Defense',
  speed: 'Speed',
};

const MOVE_METHOD_PRIORITY = {
  'level-up': 0,
  machine: 1,
  tutor: 2,
  egg: 3,
};

export default {
  name: 'PokemonDetails',
  data() {
    return {
      carouselModel: 0,
      pokemonData: null,
      pokemonSpeciesData: null,
      pokemonElement: null,
      pokemonElement2: null,
      pokemonId: this.$route.params.id,
      pokemonSprites: [],
      selectedSprite: null,
      rootStore: useRootStore(),
      typeView: 'pure',
      slides: [
        {
          key: 'sprites',
          title: 'Sprites',
          icon: 'mdi-file-image',
        },
        {
          key: 'overview',
          title: 'Overview',
          icon: 'mdi-pokeball',
        },
        {
          key: 'stats',
          title: 'Stats',
          icon: 'mdi-chart-bar',
        },
        {
          key: 'moves',
          title: 'Moves',
          icon: 'mdi-sword-cross',
        },
      ],
    };
  },
  created() {
    this.getPokemonData();
  },
  watch: {
    '$route.params.id'(newId) {
      if (!newId || newId === this.pokemonId) {
        return;
      }

      this.pokemonId = newId;
      this.carouselModel = 0;
      this.getPokemonData();
    },
  },
  methods: {
    async getPokemonData() {
      try {
        this.pokemonData = null;
        this.pokemonSpeciesData = null;
        this.pokemonSprites = [];
        this.selectedSprite = null;

        const [pokemonResult, speciesResult] = await Promise.allSettled([
          pokeApi.get(`/pokemon/${this.pokemonId}`),
          pokeApi.get(`/pokemon-species/${this.pokemonId}`),
        ]);

        if (pokemonResult.status !== 'fulfilled') {
          throw pokemonResult.reason;
        }

        this.pokemonData = pokemonResult.value.data;
        this.pokemonSpeciesData =
          speciesResult.status === 'fulfilled' ? speciesResult.value.data : null;

        this.pokemonElement = this.pokemonData.types[0]?.type?.name || 'normal';
        this.pokemonElement2 = this.pokemonData.types[1]?.type?.name || null;
        this.typeView = this.pokemonElement2 ? 'not-pure' : 'pure';

        this.rootStore.updateNavigationDrawerColor(this.getElementColorNormal(this.pokemonElement));

        this.pokemonSprites = this.buildSpriteGallery(this.pokemonData.sprites);
        this.selectedSprite = this.pokemonSprites[0]?.url || null;
      } catch (error) {
        console.warn(error);
      }
    },
    buildSpriteGallery(sprites) {
      const candidates = [
        { url: sprites?.other?.['official-artwork']?.front_default, name: 'Official Artwork' },
        { url: sprites?.other?.home?.front_default, name: 'Home Front' },
        { url: sprites?.other?.home?.front_shiny, name: 'Home Shiny' },
        { url: sprites?.other?.dream_world?.front_default, name: 'Dream World' },
        { url: sprites?.front_default, name: 'Front Default' },
        { url: sprites?.back_default, name: 'Back Default' },
        { url: sprites?.front_shiny, name: 'Front Shiny' },
        { url: sprites?.back_shiny, name: 'Back Shiny' },
        { url: sprites?.front_female, name: 'Front Female' },
        { url: sprites?.back_female, name: 'Back Female' },
        { url: sprites?.front_shiny_female, name: 'Front Shiny Female' },
        { url: sprites?.back_shiny_female, name: 'Back Shiny Female' },
      ];

      const uniqueSprites = [];
      const seen = new Set();

      candidates.forEach((sprite) => {
        if (!sprite.url || seen.has(sprite.url)) {
          return;
        }

        seen.add(sprite.url);
        uniqueSprites.push(sprite);
      });

      return uniqueSprites;
    },
    formatLabel(value) {
      if (!value) {
        return 'Unknown';
      }

      return value
        .split('-')
        .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1))
        .join(' ');
    },
    formatHeight(value) {
      if (value === null || value === undefined) {
        return 'Unknown';
      }

      return `${(value / 10).toFixed(1)} m`;
    },
    formatWeight(value) {
      if (value === null || value === undefined) {
        return 'Unknown';
      }

      return `${(value / 10).toFixed(1)} kg`;
    },
    formatFlavorText(text) {
      if (!text) {
        return 'No hay descripcion disponible.';
      }

      return text.replace(/\f/g, ' ').replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
    },
    formatGenderRate(rate) {
      if (rate === null || rate === undefined) {
        return 'Unknown';
      }

      if (rate === -1) {
        return 'Genderless';
      }

      const femaleRatio = (rate / 8) * 100;
      const maleRatio = 100 - femaleRatio;
      const ratioFormatter = (value) => (Number.isInteger(value) ? value : value.toFixed(1));

      return `${ratioFormatter(maleRatio)}% male / ${ratioFormatter(femaleRatio)}% female`;
    },
    getEnglishFlavorText() {
      const englishEntry = this.pokemonSpeciesData?.flavor_text_entries?.find(
        (entry) => entry.language.name === 'en'
      );

      return this.formatFlavorText(englishEntry?.flavor_text);
    },
    getEnglishGenus() {
      const englishGenus = this.pokemonSpeciesData?.genera?.find(
        (entry) => entry.language.name === 'en'
      );

      return englishGenus?.genus || 'Unknown species';
    },
    getPrimaryMoveDetail(versionGroupDetails = []) {
      if (!versionGroupDetails.length) {
        return null;
      }

      return (
        versionGroupDetails.find((item) => item.move_learn_method.name === 'level-up') ||
        versionGroupDetails.find((item) => item.move_learn_method.name === 'machine') ||
        versionGroupDetails.find((item) => item.move_learn_method.name === 'tutor') ||
        versionGroupDetails.find((item) => item.move_learn_method.name === 'egg') ||
        versionGroupDetails[0]
      );
    },
    getMoveLevelLabel(method, level) {
      if (method === 'level-up') {
        return `Lvl ${level || 1}`;
      }

      if (method === 'machine') {
        return 'TM / HM';
      }

      if (method === 'tutor') {
        return 'Tutor';
      }

      if (method === 'egg') {
        return 'Egg';
      }

      return 'Special';
    },
    formatBoolean(value) {
      if (value === null || value === undefined) {
        return 'Unknown';
      }

      return value ? 'Yes' : 'No';
    },
    extractResourceId(url) {
      if (!url) {
        return null;
      }

      const chunks = url.split('/').filter(Boolean);
      return chunks[chunks.length - 1] || null;
    },
    getElementTypeLogo(element) {
      return this.$root.getElementTypeLogo(element);
    },
    getElementColorNormal(element) {
      return this.$root.getElementColorNormal(element);
    },
    getElementColorHex(element) {
      return this.$root.getElementColorHex(element);
    },
  },
  computed: {
    currentBreakpoint() {
      return this.$vuetify.breakpoint.name;
    },
    isMdAndUp() {
      return this.$vuetify.breakpoint.mdAndUp;
    },
    isFlyingMono() {
      return this.pokemonElement === 'flying' && !this.pokemonElement2;
    },
    contentTextClass() {
      return this.isFlyingMono ? 'grey--text text--darken-4' : 'white--text';
    },
    statTrackColor() {
      return this.isFlyingMono ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.18)';
    },
    detailPageStyle() {
      const primaryColor = this.getElementColorHex(this.pokemonElement || 'normal');
      const secondaryColor = this.getElementColorHex(
        this.pokemonElement2 || this.pokemonElement || 'normal'
      );
      const red = parseInt(primaryColor.slice(1, 3), 16);
      const green = parseInt(primaryColor.slice(3, 5), 16);
      const blue = parseInt(primaryColor.slice(5, 7), 16);

      return {
        background: this.pokemonElement2
          ? `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`
          : primaryColor,
        '--pokemon-scroll-track':
          this.typeView === 'pure'
            ? this.isFlyingMono
              ? '#E0E0E0'
              : 'rgba(255, 255, 255, 0.14)'
            : 'rgba(255, 255, 255, 0.18)',
        '--pokemon-scroll-thumb':
          this.typeView === 'pure'
            ? this.isFlyingMono
              ? '#BDBDBD'
              : '#F2F2F2'
            : `rgba(${red}, ${green}, ${blue}, 0.55)`,
        '--pokemon-surface-bg': this.isFlyingMono
          ? 'rgba(255, 255, 255, 0.76)'
          : 'rgba(9, 12, 20, 0.16)',
        '--pokemon-surface-border': this.isFlyingMono
          ? 'rgba(0, 0, 0, 0.08)'
          : 'rgba(255, 255, 255, 0.12)',
        '--pokemon-chip-bg': this.isFlyingMono
          ? 'rgba(255, 255, 255, 0.92)'
          : 'rgba(255, 255, 255, 0.1)',
        '--pokemon-chip-active': this.isFlyingMono
          ? 'rgba(255, 255, 255, 1)'
          : 'rgba(255, 255, 255, 0.18)',
        '--pokemon-muted-text': this.isFlyingMono
          ? 'rgba(33, 33, 33, 0.72)'
          : 'rgba(255, 255, 255, 0.76)',
        '--pokemon-text-color': this.isFlyingMono ? '#212121' : '#FFFFFF',
        '--pokemon-card-shadow': this.isFlyingMono
          ? '0 16px 40px rgba(0, 0, 0, 0.08)'
          : '0 20px 50px rgba(0, 0, 0, 0.2)',
      };
    },
    pokemonDisplayName() {
      return this.formatLabel(this.pokemonData?.name || '');
    },
    paddedPokemonId() {
      return String(this.pokemonData?.id || this.pokemonId || '').padStart(3, '0');
    },
    pokemonFlavorText() {
      return this.getEnglishFlavorText();
    },
    pokemonGenus() {
      return this.getEnglishGenus();
    },
    overviewFacts() {
      if (!this.pokemonData) {
        return [];
      }

      return [
        { label: 'Height', value: this.formatHeight(this.pokemonData.height) },
        { label: 'Weight', value: this.formatWeight(this.pokemonData.weight) },
        { label: 'Habitat', value: this.formatLabel(this.pokemonSpeciesData?.habitat?.name) },
        { label: 'Shape', value: this.formatLabel(this.pokemonSpeciesData?.shape?.name) },
        { label: 'Color', value: this.formatLabel(this.pokemonSpeciesData?.color?.name) },
        { label: 'Base Exp', value: this.pokemonData.base_experience ?? 'Unknown' },
      ];
    },
    overviewExtraFacts() {
      const evolutionChainId = this.extractResourceId(this.pokemonSpeciesData?.evolution_chain?.url);

      return [
        { label: 'Capture Rate', value: this.pokemonSpeciesData?.capture_rate ?? 'Unknown' },
        { label: 'Base Happiness', value: this.pokemonSpeciesData?.base_happiness ?? 'Unknown' },
        {
          label: 'Hatch Cycles',
          value: this.pokemonSpeciesData?.hatch_counter ?? 'Unknown',
        },
        { label: 'Forms', value: this.pokemonData?.forms?.length ?? 'Unknown' },
        { label: 'Total Moves', value: this.pokemonData?.moves?.length ?? 'Unknown' },
        {
          label: 'Evolution Chain',
          value: evolutionChainId ? `#${evolutionChainId}` : 'Unknown',
        },
        {
          label: 'Gender Differences',
          value: this.formatBoolean(this.pokemonSpeciesData?.has_gender_differences),
        },
        {
          label: 'Legendary',
          value: this.formatBoolean(this.pokemonSpeciesData?.is_legendary),
        },
        {
          label: 'Mythical',
          value: this.formatBoolean(this.pokemonSpeciesData?.is_mythical),
        },
        {
          label: 'Cry',
          value: this.pokemonData?.cries?.latest ? 'Available' : 'Unknown',
        },
      ];
    },
    trainingFacts() {
      return [
        { label: 'Capture Rate', value: this.pokemonSpeciesData?.capture_rate ?? 'Unknown' },
        { label: 'Base Happiness', value: this.pokemonSpeciesData?.base_happiness ?? 'Unknown' },
        {
          label: 'Growth Rate',
          value: this.formatLabel(this.pokemonSpeciesData?.growth_rate?.name),
        },
        {
          label: 'Gender Rate',
          value: this.formatGenderRate(this.pokemonSpeciesData?.gender_rate),
        },
        {
          label: 'Default Form',
          value: this.pokemonData?.is_default ? 'Yes' : 'Alternate',
        },
      ];
    },
    pokemonTypeBadges() {
      return (this.pokemonData?.types || []).map(({ type }) => ({
        raw: type.name,
        label: this.formatLabel(type.name),
      }));
    },
    pokemonAbilityBadges() {
      return (this.pokemonData?.abilities || []).map(({ ability, is_hidden }) => ({
        raw: ability.name,
        label: this.formatLabel(ability.name),
        hidden: is_hidden,
      }));
    },
    pokemonEggGroups() {
      return (this.pokemonSpeciesData?.egg_groups || []).map((eggGroup) =>
        this.formatLabel(eggGroup.name)
      );
    },
    normalizedStats() {
      return (this.pokemonData?.stats || []).map((stat, index) => ({
        key: stat.stat.name,
        label: STAT_LABELS[stat.stat.name] || this.formatLabel(stat.stat.name),
        value: stat.base_stat,
        effort: stat.effort,
        percentage: Math.min((stat.base_stat / 255) * 100, 100),
        color:
          index % 2 === 0
            ? this.getElementColorNormal(this.pokemonElement || 'normal')
            : this.getElementColorNormal(this.pokemonElement2 || this.pokemonElement || 'normal'),
      }));
    },
    pokemonStatTotal() {
      return this.normalizedStats.reduce((total, stat) => total + stat.value, 0);
    },
    pokemonMovesDetailed() {
      return (this.pokemonData?.moves || [])
        .map(({ move, version_group_details: versionGroupDetails }) => {
          const detail = this.getPrimaryMoveDetail(versionGroupDetails);
          const rawMethod = detail?.move_learn_method?.name || 'unknown';
          const level = detail?.level_learned_at || 0;

          return {
            key: `${move.name}-${rawMethod}-${level}`,
            name: this.formatLabel(move.name),
            rawMethod,
            learnMethod: this.formatLabel(rawMethod),
            level,
            levelLabel: this.getMoveLevelLabel(rawMethod, level),
            versionGroup: this.formatLabel(detail?.version_group?.name || 'unknown'),
          };
        })
        .sort((left, right) => {
          const leftPriority = MOVE_METHOD_PRIORITY[left.rawMethod] ?? 99;
          const rightPriority = MOVE_METHOD_PRIORITY[right.rawMethod] ?? 99;

          if (leftPriority !== rightPriority) {
            return leftPriority - rightPriority;
          }

          if (left.level !== right.level) {
            return left.level - right.level;
          }

          return left.name.localeCompare(right.name);
        });
    },
    selectedSpriteName() {
      return (
        this.pokemonSprites.find((sprite) => sprite.url === this.selectedSprite)?.name || 'Sprite'
      );
    },
  },
};
</script>

<style scoped>
.pokemon-details-page {
  position: relative;
  height: 100vh;
  height: 100dvh;
  max-height: 100vh;
  max-height: 100dvh;
  overflow: hidden;
}

.pokemon-scroll-area {
  width: 90%;
  height: 75%;
  overflow-y: auto;
  overflow-x: hidden;
  padding-top: 0px;
  padding-bottom: 132px;
  padding: 10px 0;
  /* border: 1px solid aqua; */
  transform: translateY(-40px);
}

.pokemon-scroll-area--sprites {
  overflow: hidden;
}

.sprites-section {
  overflow: hidden;
}

.sprites-layout {
  height: 100%;
}

.sprite-selection-scroll {
  max-height: min(56vh, 540px);
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 6px;
}

.pokemon-details-page :deep(.v-carousel),
.pokemon-details-page :deep(.v-window),
.pokemon-details-page :deep(.v-window__container),
.pokemon-details-page :deep(.v-window-item),
.pokemon-details-page :deep(.v-carousel__item) {
  height: 100% !important;
}

.pokemon-details-page :deep(.v-window-item) {
  overflow: hidden;
}

.pokemon-glass-card {
  background: var(--pokemon-surface-bg) !important;
  /* box-shadow: var(--pokemon-card-shadow) !important; */
  backdrop-filter: blur(6px);
}

.pokemon-inner-card {
  background: var(--pokemon-chip-bg) !important;
  border: 1px solid var(--pokemon-surface-border) !important;
  box-shadow: none !important;
  backdrop-filter: blur(6px);
}

.pokemon-muted {
  color: var(--pokemon-muted-text) !important;
}

.pokemon-chip {
  background: var(--pokemon-chip-bg) !important;
  color: var(--pokemon-text-color) !important;
  border: 1px solid var(--pokemon-surface-border) !important;
}

.pokemon-description {
  max-width: 70ch;
  line-height: 1.7;
}

.overview-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.8fr) minmax(300px, 1fr);
  gap: 18px;
  align-items: start;
}

.overview-left-stack {
  display: grid;
  gap: 18px;
  min-width: 0;
}

.overview-species-card,
.overview-extra-card {
  min-width: 0;
}

.overview-extra-card {
  grid-column: 1 / -1;
}

.stats-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.8fr) minmax(300px, 1fr);
  gap: 18px;
  align-items: start;
}

.stats-right-stack {
  display: grid;
  gap: 18px;
  min-width: 0;
}

.pokemon-fact-row {
  gap: 16px;
  padding: 12px 0;
  border-bottom: 1px solid var(--pokemon-surface-border);
}

.pokemon-fact-row:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.sprite-preview-card {
  width: min(100%, 420px);
}

.sprite-stage {
  position: relative;
  width: 100%;
  min-height: 360px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.sprite-stage__number {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 16px 20px 0;
  color: var(--pokemon-text-color);
  opacity: 0.14;
  font-size: clamp(72px, 9vw, 124px);
  font-weight: 800;
  letter-spacing: 0.04em;
  line-height: 1;
  white-space: nowrap;
  pointer-events: none;
  user-select: none;
  z-index: 0;
}

.sprite-picker-title {
  font-size: clamp(32px, 4vw, 52px);
  font-weight: 800;
  letter-spacing: 0.06em;
  line-height: 1;
  opacity: 0.20;
  text-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
  margin-left: 20px;
}

.sprite-stage__image {
  width: min(280px, 70vw);
  max-height: 280px;
  margin-top: 24px;
  object-fit: contain;
  position: relative;
  z-index: 1;
}

.sprite-thumb {
  min-width: 148px;
  cursor: pointer;
  transition: transform 0.25s ease, background 0.25s ease, border-color 0.25s ease;
}

.sprite-thumb:hover {
  transform: translateY(-4px);
}

.move-card {
  min-height: 150px;
}

.pokemon-extra-fact {
  background: var(--pokemon-chip-bg);
  border: 1px solid var(--pokemon-surface-border);
  border-radius: 12px;
  min-height: 76px;
  padding: 12px;
}

.stat-progress-pill {
  border-radius: 999px !important;
  overflow: hidden;
  clip-path: inset(0 round 999px);
}

.stat-progress-pill :deep(.v-progress-linear__background),
.stat-progress-pill :deep(.v-progress-linear__buffer),
.stat-progress-pill :deep(.v-progress-linear__determinate) {
  border-radius: 0 !important;
}

.custom-scroll-bar::-webkit-scrollbar {
  width: 13px;
  background-color: transparent;
}

.custom-scroll-bar::-webkit-scrollbar-track {
  border-radius: 35px;
  background-color: var(--pokemon-scroll-track) !important;
}

.custom-scroll-bar::-webkit-scrollbar-thumb {
  border-radius: 35px;
  background-color: var(--pokemon-scroll-thumb) !important;
}

.custom-scroll-bar::-webkit-scrollbar-thumb:hover {
  background-color: var(--pokemon-scroll-thumb) !important;
}

@media screen and (max-width: 1263px) {
  .pokemon-scroll-area {
    width: 92%;
  }

  .overview-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .stats-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .overview-extra-card {
    grid-column: auto;
  }
}

@media screen and (max-width: 959px) {
  .pokemon-scroll-area {
    padding-top: 112px;
    padding-bottom: 136px;
  }

  .sprite-selection-scroll {
    max-height: min(44vh, 420px);
  }

  .sprite-picker-title {
    font-size: clamp(24px, 6vw, 36px);
  }

  .sprite-stage {
    min-height: 280px;
  }

  .sprite-thumb {
    min-width: 132px;
  }
}
</style>
