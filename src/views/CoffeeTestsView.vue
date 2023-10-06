<template>
  <div style="border: 1px solid red">
    <!-- <h1 class="animate__animated animate__bounce">An animated element</h1> -->
    <div class="contenedor">
        <div class="circulo">
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
/* Estilos para el contenedor exterior */
.contenedor {
  z-index: 1;
    position: absolute;
    width: 1200px; /* Ancho del contenedor */
    height: 1200px; /* Altura del contenedor */
    background-color: #fff; /* Color de fondo rojo */
    border-radius: 50%; /* Hace que el contenedor exterior sea un círculo */
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: -700px;
}

/* Estilos para el círculo interior */
.circulo {
    width: 50%; /* Ancho del círculo interior en relación al contenedor */
    height: 50%; /* Altura del círculo interior en relación al contenedor */
    background-color: rgb(145, 145, 145); /* Color de fondo azul */
    border-radius: 50%; /* Hace que el círculo interior sea un círculo */
}
</style>
