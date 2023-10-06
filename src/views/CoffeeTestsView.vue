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
        :style="{background: 'url(' + items[currentImage].image + ')'}"      
        @change="updateCurrentImage"  
      >
        <v-carousel-item
          v-for="(item, i) in items"
          :key="i"
          transition="slide-fade"          
        >
          <!-- Imagen actual -->
          <img :src="item?.image" class="current-image" alt="Current Image" />
          <!-- Imagen que aparecerá con transición -->
          <img :src="nextItem(i).image" class="next-image" alt="Next Image" />
        </v-carousel-item>
      </v-carousel>    
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        currentImage: 0,
        items: [
          {
            image: 'https://wallpapers.com/images/hd/blue-aesthetic-moon-df8850p673zj275y.jpg',
          },
          {
            image: 'https://wallpapercave.com/wp/wp2818490.jpg',
          },
          {
            image: 'https://wallpaperaccess.com/full/343619.jpg',
          },
        ]
      }
    },
    created(){
        this.currentImage = 0;
    },
    methods: {
      nextItem(index) {   
        // setTimeout(() => {
        // Devuelve la siguiente imagen en el carrusel
        const nextIndex = (index + 1) % this.items.length;                
        return this.items[nextIndex];              
        // }, 100);    
      },
      updateCurrentImage(newIndex) {
        console.log(newIndex);
        // Actualiza el valor de currentImage cuando cambia la imagen en el carrusel
        this.currentImage = newIndex -1;
      }
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
  