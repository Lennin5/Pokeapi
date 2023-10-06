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
        <img :src="item.image" alt="Imagen" key="item.image" class="w-100 animate__animated animate__fadeIn" >          
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
  import ImageA from '../assets/img/ImageA.png'
  import ImageB from '../assets/img/ImageB.png'
  import ImageC from '../assets/img/ImageC.png'
export default {
  data() {
    return {
      ImageA: ImageA,
      ImageB: ImageB,
      ImageC: ImageC,      
      items: [
        {
          image: ImageA,
        },
        {
          image: ImageB,
        },
        {
          image: ImageC,
        },
      ],
    };
  },

};
</script>

<style scoped>

</style>
