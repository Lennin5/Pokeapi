<template>
  <div class="fab-container">
    <v-speed-dial
      v-model="fab"
      :top="top"
      :bottom="bottom"
      :right="right"
      :left="left"
      :direction="direction"
      :open-on-hover="hover"
      :transition="transition"
    >
      <template v-slot:activator>

        <v-btn
          v-model="fab"
          :color="getElementColorNormal(pokemonType)"
          dark
          fab
        >
          <v-icon v-if="fab"
            :color="pokemonType === 'flying' ? 'black' : 'white'"          >
            mdi-close
          </v-icon>
          <div
            v-else
            class="container-element"
          >
            <div
              class="element-icon"
              :style="{
                  backgroundImage: 'url(' + getElementTypeLogo(pokemonType) + ')',
              }"
              />
          </div>          
        </v-btn>
      </template>
        <div style="overflow-y: auto; height: 400px; border-radius: 20px;"
        :style="{backgroundColor: 'transparent'}">
          <v-btn
      :key="key"
      v-for="(n, key) in 16"
        fab
        dark
        small
        color="red"
      >
        <v-icon>mdi-pokeball</v-icon>
      </v-btn>
        </div>      


    </v-speed-dial>  
  </div>
</template>

<script>
export default {
  props: {
      pokemonType: {
          type: String,
          required: true,
      },
  },  
  data: () => ({
      direction: 'top',
      fab: false,
      fling: false,
      hover: false,
      tabs: null,
      top: false,
      right: true,
      bottom: true,
      left: false,
      transition: 'slide-y-reverse-transition',
    }),
};
</script>

<style>
  .fab-container {
    position: fixed;
    bottom: 10px;
    right: 5px;
    z-index: 99;
  }

  .container-element {
      width: 50px;
      height: 50px;
      padding: 10px;
      border-radius: 50px;
  }
  .element-icon {
    height: 50px;
    background-size: contain;
    background-repeat: no-repeat;
  } 
</style>
