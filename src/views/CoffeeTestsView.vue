<template>
  <div>
    <v-carousel
      cycle
      vertical
        :show-arrows="false"
        delimiter-icon="mdi-minus"
        hide-delimiter-background      
    >
      <v-carousel-item
        v-for="(item, index) in items"
        :key="index"
      >
        <img :src="item.image" alt="Imagen" />
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
          image: 'https://wallpapers.com/images/hd/blue-aesthetic-moon-df8850p673zj275y.jpg',
        },
        {
          image: 'https://wallpapercave.com/wp/wp2818490.jpg',
        },
        {
          image: 'https://wallpaperaccess.com/full/343619.jpg',
        },
      ],
    };
  },
};
</script>

<style scoped>
/* Estilos personalizados si es necesario */
</style>
