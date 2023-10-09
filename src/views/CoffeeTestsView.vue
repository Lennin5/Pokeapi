<template>
  <div>
    <!-- <h1 class="animate__animated animate__bounce">An animated element</h1> animate__animated animate__fadeOut animate__animated animate__fadeOutBottomRight -->

    <div class="circle" id="circle" :class="animationClass">
        <div class="min-circle">
        </div>
    </div>   

    <div class="main-container">
      <img :src="Header" class="mt-5" alt="Header Sample" key="Header" style="width: 50%" >

      <v-row justify="start" class="ms-15">
        <div v-for="(carousel_image, index) in carouselImages" 
          :key="carousel_image"
          @click="carousel = index"
          class="pa-1">
            <v-icon            
              size="50"
              :color="index === carousel ? 'red' : 'black'"   
              class="cursor-pointer"
            >
            mdi-minus 
            </v-icon>
        </div>
      </v-row> 
    </div>     
    <v-carousel
      cycle
      height="600"
      vertical
      :show-arrows="false"
      delimiter-icon="mdi-minus"
      hide-delimiters
      hide-delimiter-background
      v-model="carousel"
    >  
      <v-carousel-item
        v-for="(item, index) in carouselImages"
        :key="index"
      >        
        <img :src="item.image" alt="Imagen" key="item.image" class="w-100 animate__animated animate__fadeIn" >          
      </v-carousel-item>
    </v-carousel>
    <div class="text-center next-content-to-carousel" style="">
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
      carouselImages: [
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
      animationClass: '',
    };
  },

  methods: {
    goToSlide(index) {
      this.$refs.carousel.goTo(index);
    },
    circleDiagonalAnimation(type) {
      this.animationClass = type === 'execute' ? 'animate-diagonal' : 'revert-diagonal';
      document.getElementById('circle').style.opacity = type === 'execute' ? 0 : 1;
      document.getElementById('circle').style.transition = 'opacity 0.5s ease-in-out';  
    }
  },

  watch: {
    carousel(val) {
      if (val === 1) {
        this.circleDiagonalAnimation('execute');
      }
      else if (val === 0 || val === 2) {
        this.circleDiagonalAnimation('revert');
      }
    }
  }
};
</script>

<style scoped>

/* Estilos para el circle exterior */
.circle {
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

/* Estilos para el contenido principal (donde se encuentran los limitadores del carrusel) */
.main-container{
  position: absolute;
  z-index: 3;
  width: 100%;
  height: auto;
}

/* Estilos para la animación del círculo */
.animate-diagonal {
  animation: diagonalMove 0.5s ease-in-out;
}

.revert-diagonal {
  animation: revertDiagonalMove 0.5s ease-in-out;
}

@keyframes diagonalMove {
  0% {
    transform: translate(500, 100);
  }
  100% {
    transform: translate(900px, 250px);
  }
}

@keyframes revertDiagonalMove {
  0% {
    transform: translate(900px, 250px);
  }
  100% {
    transform: translate(500, 100);
  }
}

/* Estilos para el contenido que se muestra después del carrusel */
.next-content-to-carousel{
  position: relative;
  z-index: 2;
  background-color: #f8e1ca;
  width: 100%;
  height: 500px;
}
</style>
