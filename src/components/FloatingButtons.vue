<template>
    <div class="floating-buttons">
      <!-- Botón A -->
      <v-btn
        fab
        large
        color="primary"
        class="ma-2"
        @click="handleButtonClick('A')"
      >
        A
      </v-btn>
  
      <!-- Botón B -->
      <v-btn
        fab
        large
        color="primary"
        class="ma-2"
        @click="handleButtonClick('B')"
      >
        B
      </v-btn>
  
      <!-- Botón C -->
      <v-btn
        fab
        large
        color="primary"
        class="ma-2"
        @click="handleButtonClick('C')"
      >
        C
      </v-btn>

        <!-- Botón D -->
        <v-btn
        fab
        large
        color="primary"
        class="ma-2"
        @click="handleButtonClick('D')"
        >
        D
        </v-btn>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      handleButtonClick(buttonText) {
        // Aquí puedes manejar la lógica cuando se hace clic en uno de los botones.
        // Por ejemplo, puedes mostrar un mensaje o realizar una acción específica.
        console.log(`Botón ${buttonText} clickeado.`);
      },
    },
  };
  </script>
  
  <style>
  .floating-buttons {
    position: fixed;
    top: 250px; /* Ajusta la posición vertical según tus necesidades */
    right: 16px; /* Ajusta la posición horizontal según tus necesidades */
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 999; /* Asegura que los botones estén sobre otros elementos */
  }
  </style>
  