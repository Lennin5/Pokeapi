<template>
  <div>
    <!-- <h1 class="animate__animated animate__bounce">An animated element</h1> animate__animated animate__fadeOut animate__animated animate__fadeOutBottomRight -->

    <div class="max-circle" id="max-circle" :class="animationClass">
        <div class="min-circle">
        </div>
    </div>   

    <div class="main-container">
      <img :src="Header" class="mt-5" alt="Imagen" key="Header" style="width: 50%" >

  <v-row justify="start" class="ms-10">
    <v-btn @click="carousel=0" retain-focus-on-click depressed plain min-width="50" width="60" :ripple="false">
      <v-icon size="50" :color="carousel === 0 ? 'red' : 'black'">
        mdi-minus
      </v-icon>
    </v-btn>
    <v-btn @click="carousel=1" retain-focus-on-click depressed plain min-width="50" width="60" :ripple="false">
      <v-icon size="50" :color="carousel === 1 ? 'red' : 'black'">
        mdi-minus
      </v-icon>
    </v-btn>
    <v-btn @click="carousel=2" retain-focus-on-click depressed plain min-width="50" width="60" :ripple="false">
      <v-icon size="50" :color="carousel === 2 ? 'red' : 'black'">
        mdi-minus
      </v-icon>
    </v-btn>
  </v-row> 
    </div>     
    <v-carousel
      cycle
      height="590"
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
      animationClass: '',
    };
  },

  methods: {
    goToSlide(index) {
      this.$refs.carousel.goTo(index);
    },
    startDiagonalAnimation() {
      this.animationClass = 'animate-diagonal';
      document.getElementById('max-circle').style.opacity = 0;
      document.getElementById('max-circle').style.transition = 'opacity 0.5s ease-in-out';    
    }    
  },  

  watch: {
    carousel(val) {
      if (val === 1) {
        this.startDiagonalAnimation();
      }
      else if (val === 0 || val === 2) {
        this.animationClass = 'revert-diagonal';
        document.getElementById('max-circle').style.opacity = 1;
        document.getElementById('max-circle').style.transition = 'opacity 0.5s ease-in-out';
      }
    }
  }
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
}

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
    transform: translate(900px, 250px); /* Ajusta las coordenadas según tus necesidades */
  }
}

@keyframes revertDiagonalMove {
  0% {
    transform: translate(900px, 250px); /* Ajusta las coordenadas según tus necesidades */
  }
  100% {
    transform: translate(500, 100);
  }
}
</style>
