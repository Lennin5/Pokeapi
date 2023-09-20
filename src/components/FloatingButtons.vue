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
      <v-btn
        fab
        dark
        small
        color="green"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="indigo"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="red"
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>
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
      hover: true,
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
