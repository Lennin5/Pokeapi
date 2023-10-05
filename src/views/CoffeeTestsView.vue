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
      >
        <v-carousel-item
          v-for="(item, i) in items"
          :key="i"
          transition="slide-from-top"
          :src="item.src"
        >
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
}
</script>

<style>
.slide-from-top-enter-active{
  transition: transform 0.5s;
}
.slide-from-top-enter /* .slide-from-top-leave-active en <2.1.8 */ {
  transform: translateY(-100%);
}
</style>
