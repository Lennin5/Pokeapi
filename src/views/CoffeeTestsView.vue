<template>
  <div>
    <!-- <h1 class="animate__animated animate__bounce">An animated element</h1> -->
    <v-carousel
      cycle
      vertical
      :show-arrows="false"
      delimiter-icon="mdi-minus"
      hide-delimiter-background
      :interval="5000"
    >
      <v-carousel-item
        v-for="(item, index) in items"
        :key="index"
      >
        <img :src="item.image" alt="Imagen" key="item.image" class="animate__animated animate__fadeIn">          
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

</style>
