<template>
    <v-row>      
    <v-col
        v-for="(pokemon) in pokemonsList"
        :key="pokemon.name"
        cols="12"
        xs="12"
        sm="6"
        md="4"
        lg="3"
        xl="3"
        class="d-flex justify-center"
    >
        <!-- Data rendered -->
        <v-card
          width="100%"
          class="card rounded-xl">
          <div class="d-flex justify-center align-center" 
          :style="{
            background: pokemon.element !== pokemonType ?
            'linear-gradient(to right, ' + getElementColorHex(pokemonType) + ', ' + getElementColorHex(pokemon.element) + ')'
            : getElementColorHex(pokemon.element),
            width: '100%',
            height: '170px',              
          }"
          @mouseover="setElementOpacity(pokemon.name, 0.3)"
          @mouseout="setElementOpacity(pokemon.name, 0.1)">
          <!-- <div
          :id="'pokemon_card_' + pokemon.name"
            :style="{
              width: '150px',
              height: '150px',
              backgroundImage: 'url(' + getElementTypeLogo(pokemonType) + ')',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              position: 'absolute',
              opacity: '0.1',
              marginTop: '40px',
              marginLeft: pokemon.element !== pokemonType ? '-250px' : '-10',
            }" />
          <div
          v-if="pokemon.element !== pokemonType"
          :id="'pokemon_card_' + pokemon.name"
            :style="{
              width: '150px',
              height: '150px',
              backgroundImage: 'url(' + getElementTypeLogo(pokemon.element) + ')',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              position: 'absolute',
              opacity: '0.1',
              marginTop: '40px',
              right: '0',
            }" /> -->
            <div
    :id="'pokemon_card_' + pokemon.name"
    :style="{
      width: '150px',
      height: '150px',
      backgroundImage: 'url(' + getElementTypeLogo(pokemonType) + ')',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      position: 'absolute',
      opacity: '0.1',
      marginTop: '40px',
      marginLeft: pokemon.element !== pokemonType ? '-265px' : '0', /* Mostrar lado izquierdo */
      clipPath: pokemon.element !== pokemonType && 'polygon(100% 0, 100% 100%, 50% 100%, 50% 0)', /* Mostrar lado derecho */
    }"
  ></div>            
  <div
    v-if="pokemon.element !== pokemonType"
    :id="'pokemon_card_' + pokemon.name"
    :style="{
      width: '150px',
      height: '150px',
      backgroundImage: 'url(' + getElementTypeLogo(pokemon.element) + ')',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      position: 'absolute',
      opacity: '0.1',
      marginTop: '40px',
      marginRight: pokemon.element !== pokemonType ? '-60px' : '-10',
      right: '0',
      clipPath: 'polygon(0 0, 60% 0, 60% 100%, 0% 100%)', /* Cambiado el clipPath */
    }"
  />            

          <div class="">
            <v-img :src="pokemon.sprites[0]" max-height="300px" max-width="150" class="" :id="'pokemon_image_'+pokemon.name"></v-img>
            <div class="font-weight-bold d-flex justify-center"
            :class="pokemon.element === 'flying' ? 'gray--text' : 'white--text'">
              <h2>
                {{ pokemon.name[0].toUpperCase() + pokemon.name.slice(1) }}
              </h2>                
            </div>
          </div>
          </div>        
            <v-card-text 
                :style="{
                    background: pokemon.element !== pokemonType ?
                    'linear-gradient(to right, ' + getElementColorHex(pokemonType) + ', ' + getElementColorHex(pokemon.element) + ')'
                    : getElementColorHex(pokemon.element)}">

            <div class="d-flex justify-center" style="background-color: transparent;">
                <div
                    class="container-element"
                    :style="{                
                    backgroundColor: getElementColorHex(pokemonType),
                    boxShadow: pokemonType === 'flying' ? '0px 0px 2px 0px #343838' : 'none',
                    }"
                >
                    <div
                    class="element-icon"
                    :style="{
                        backgroundImage: 'url(' + getElementTypeLogo(pokemonType) + ')',
                    }"
                    />
                </div>
                <div
                    v-if="pokemon.element !== pokemonType"
                    class="container-element ms-1"
                    :style="{                  
                    backgroundColor: getElementColorHex(pokemon.element),
                    boxShadow: pokemon.element === 'flying' ? '0px 0px 2px 0px #343838' : 'none',
                    }"
                >
                    <div
                    class="element-icon"
                    :style="{
                        backgroundImage: 'url(' + getElementTypeLogo(pokemon.element) + ')',
                    }"
                    />
                </div>
            </div>     
                         
              <div class="d-flex justify-center pb-2">
                <v-btn
                  :to="{ path: '/details', query: { pokemonObject: pokemon, spritesObject: Object.values(pokemon.sprites) } }"
                  :style="{background: pokemon.element !== pokemonType ?
                    'linear-gradient(to right, ' + getElementColorHex(pokemonType) + ', ' + getElementColorHex(pokemon.element) + ')'
                    : getElementColorHex(pokemon.element)}"
                  class="mt-2 rounded-lg"
                  :dark="pokemon.element === 'flying' ? false : true"
                  :light="pokemon.element === 'flying' ? true : false">
                      View Details
                </v-btn>                
              </div>
            </v-card-text>  
        </v-card>      
        <!-- <v-card width="400" style="border-radius: 20px !important;"
        >
        <div class="d-flex justify-center">
            <v-img :src="pokemon.spriteURL || pokemon.sprites[index]
            " max-height="300px" max-width="150" class="">
            </v-img>
        </div>
        <v-card-text>
            <div class="font-weight-bold ml-0 gray--text d-flex justify-center">
            <h2>                  
                {{ pokemon.name[0].toUpperCase() + pokemon.name.slice(1) }}
            </h2>
            </div>
            <div class="font-weight-bold mt-2 gray--text d-flex justify-center" >
            <h4>                  
                {{ pokemonType[0].toUpperCase() + pokemonType.slice(1) }}
                    {{ pokemonType !== pokemon.element ? ' / ' + pokemon.element[0].toUpperCase() + pokemon.element.slice(1) : '' }}
            </h4>
            </div>              
            <div class="d-flex justify-center mb-3">
            <div
                class="container-element"
                :style="{                
                backgroundColor: getElementColorHex(pokemonType),
                boxShadow: pokemonType === 'flying' ? '0px 0px 2px 0px #343838' : 'none',
                }"
            >
                <div
                class="element-icon"
                :style="{
                    backgroundImage: 'url(' + getElementTypeLogo(pokemonType) + ')',
                }"
                />
            </div>
            <div
                v-if="pokemon.element !== pokemonType"
                class="container-element ms-1"
                :style="{                  
                backgroundColor: getElementColorHex(pokemon.element),
                boxShadow: pokemon.element === 'flying' ? '0px 0px 2px 0px #343838' : 'none',
                }"
            >
                <div
                class="element-icon"
                :style="{
                    backgroundImage: 'url(' + getElementTypeLogo(pokemon.element) + ')',
                }"
                />
            </div>
            </div>
            <div class="d-flex justify-center pb-4">
            <v-btn
            :to="{ path: '/details', query: { pokemonObject: pokemon, spritesObject: Object.values(pokemon.sprites) } }"
            :color="getElementColorNormal(pokemonType)"
            :style="{background: pokemon.element !== pokemonType ? 'linear-gradient(to right, ' + getElementColorHex(pokemonType) + ', ' + getElementColorHex(pokemon.element) + ')' : 'none' }"
            class="mt-2"
            :dark="pokemonType === 'flying' ? false : true"
            :lihght="pokemonType === 'flying' ? true : false">
                View Details
                    </v-btn>                
            </div>
        </v-card-text>

        </v-card> -->
    </v-col>
    </v-row>      
</template>

<script>
export default {
    props: {
        pokemonsList: {
            type: Array,
            required: true,
        },
        pokemonType: {
            type: String,
            required: true,
        },
    },
}
</script>

<style scoped> 
</style>