<template>
  <div>
    <!-- <h1 class="animate__animated animate__bounce">An animated element</h1> animate__animated animate__fadeOut animate__animated animate__fadeOutBottomRight -->

    <div class="max-circle 
    animate__animated animate__backOutRight
    animate__animated animate__backOutDown
    ">
        <div class="min-circle">
        </div>
    </div>   
    <div class="main-container">
      <img :src="Header" alt="Imagen" key="Header" style="width: 50%; border: 1px solid greenyellow" >

      <v-row justify="start" class="ms-16">
        <v-icon size="50" @click="carousel=0">
          mdi-minus
        </v-icon>
        <v-icon size="50" @click="carousel=1">
          mdi-minus
        </v-icon>
        <v-icon size="50" @click="carousel=2">
          mdi-minus
        </v-icon>
      </v-row>   
    </div>     
    <v-carousel
      cycle
      height="550"
      vertical
      :show-arrows="false"
      delimiter-icon="mdi-minus"
      hide-delimiter-background
      hide-delimiters
      v-model="carousel"
    >  
      <v-carousel-item
        v-for="(item, index) in items"
        :key="index"
      >        
        <img :src="item.image" alt="Imagen" key="item.image" class="w-100 animate__animated animate__fadeIn" >          
      </v-carousel-item>
    </v-carousel>
    <div class="text-center next-content-to-carousel" style="border: 1px solid blue">
      <span>Contenido siguiente...</span>  
    </div>
  </div>
</template>

<script>
  import ImageA from '../assets/img/ImageA.png'
  import ImageB from '../assets/img/ImageB.png'
  import ImageC from '../assets/img/ImageC.png'
  import Header from '../assets/img/Header.png'
export default {
  data() {
    return {
      ImageA: ImageA,
      ImageB: ImageB,
      ImageC: ImageC,
      Header,
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
      carousel: 0,
    };
  },

  methods: {
    goToSlide(index) {
      this.$refs.carousel.goTo(index);
    },
  },  
};
</script>

<style scoped>
/* Estilos para el max-circle exterior */
.max-circle {
  z-index: 1;
    position: absolute;
    width: 2550px;
    height: 2550px;
    background-color: #f6f6f6;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: -1500px;
    margin-top: -200px
}

/* Estilos para el círculo interior */
.min-circle {
    width: 60%;
    height: 60%;
    background-color: #e1e0e0;
    border-radius: 100%;
}

.next-content-to-carousel{
  position: relative;
  z-index: 2;
  background-color: #f8e1ca;
  width: 100%;
  height: 500px;
}

.main-container{
  position: absolute;
  z-index: 3;
  width: 100%;
  height: auto;
  border: 1px solid red;
}
</style>
