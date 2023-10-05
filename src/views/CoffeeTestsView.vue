<template>
    <div style="padding-bottom: 500px; background-color: #f8e1ca;">
      <div class="w-100 pa-5" style="background-color: #000001;">
        <span class="white--text">
          Menu...
        </span>        
      </div>
      <v-carousel
        :show-arrows="false"
        delimiter-icon="mdi-minus"
        hide-delimiter-background
        :style="{backgroundImage: 'url(' + items[0].src + ')'}"
      >
        <v-carousel-item
          v-for="(item, i) in items"
          :key="i"
          transition="slide-fade"
        >
          <!-- Imagen actual -->
          <img :src="item.src" class="current-image" alt="Current Image" />
          <!-- Imagen que aparecerá con transición -->
          <img :src="nextItem(i).src" class="next-image" alt="Next Image" />
        </v-carousel-item>
      </v-carousel>    
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        items: [
          {
            src: 'https://wallpapers.com/images/hd/blue-aesthetic-moon-df8850p673zj275y.jpg',
          },
          {
            src: 'https://wallpapercave.com/wp/wp2818490.jpg',
          },
          {
            src: 'https://wallpaperaccess.com/full/343619.jpg',
          },
        ],
      }
    },
    methods: {
      nextItem(index) {
        // Devuelve la siguiente imagen en el carrusel
        const nextIndex = (index + 1) % this.items.length;
        return this.items[nextIndex];
      },
    },
  }
  </script>
  
  <style scoped>
  /* Estilo para la transición "slide-fade" que combina slide-from-top y fade: */
  .slide-fade-enter-active {
    transition: transform 0.5s, opacity 0.7s;
  }
  .slide-fade-enter {    
    transform: translateY(-100%);
    opacity: 0;
  }
  </style>
  