<template>
    <div class="floating-buttons" 
    style="border: 1px solid red">

    <!-- <div class="containerr" style="border: 1px solid blue"> -->
      <!-- Botón A -->
      <v-btn
        :key="key"
        v-for="(n, key) in 20"
        fab
        small
        color="primary"
        class="ma-2"
        @click="handleButtonClick(n)"
      >
        {{ n }}
      </v-btn>

    </div>


    <!-- </div> -->
  </template>
  
  <script>
  import pokeApi from '../plugins/axios';
  export default {
    created() {
      this.getPokemonTypes()
    },
    methods: {
      handleButtonClick(buttonText) {
        // Aquí puedes manejar la lógica cuando se hace clic en uno de los botones.
        // Por ejemplo, puedes mostrar un mensaje o realizar una acción específica.
        console.log(`Botón ${buttonText} clickeado.`);
      },
      async getPokemonTypes(){
        try {
          const response = await pokeApi.get('/type');
          console.log(response, 'pokemonsTypes');          
        } catch (error) {
          console.log(error, 'error');
        }
      }
    },
  };
  </script>
  
  <style>
  .floating-buttons {    
    position: fixed;
    background-color: black;
    width: 100%;
    bottom: 0px;
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    z-index: 999;
  }
  .containerr{
    height: 100px;
    display: flex;
    flex-direction: row;
  }
  </style>
  