<template>
  <div style="border: 1px solid red;">
    <!-- <h1 class="animate__animated animate__bounce">An animated element</h1> animate__animated animate__fadeOut animate__animated animate__fadeOutBottomRight -->
    <div class="max-circle">
        <div class="min-circle">
            <!-- Contenido dentro del círculo si es necesario -->
        </div>
    </div>    
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
    <div class="text-center next-content-to-carousel" style="border: 1px solid blue">
      <span>Contenido siguiente...</span>
    </div>
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
/* Estilos para el max-circle exterior */
.max-circle {
  z-index: 1;
    position: absolute;
    width: 1200px;
    height: 1200px;
    background-color: #fff;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: -700px;
}

/* Estilos para el círculo interior */
.min-circle {
    width: 50%;
    height: 50%;
    background-color: rgb(145, 145, 145);
    border-radius: 50%;
}

.next-content-to-carousel{
  position: relative;
  z-index: 2;
  background-color: #fff;
  width: 100%;
  height: 500px;
}
</style>
