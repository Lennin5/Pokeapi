<template>
    <v-container>
      <div class="horizontal-scroll">
        <div>
          <v-card
            elevation="2"
            v-for="n in 50"
            :key="n"
            class="card ma-3 rounded-xl"
          >
          <div class="d-flex justify-center align-center" style="width: 100px; height: 100px;">
            <span>
              {{ n }}
            </span>
          </div>
          </v-card>
        </div>
      </div>
    </v-container>
</template>

<script>
export default {

};
</script>

<style scoped>
.horizontal-scroll {
  width: 100%;
  overflow-x: auto; /* Habilita la barra de desplazamiento horizontal */
  border: 1px solid red;
  white-space: nowrap; /* Evita que el contenido se divida en varias líneas */
}

.card {
  display: inline-block; /* Para asegurar que las tarjetas se muestren en línea */
}
</style>
