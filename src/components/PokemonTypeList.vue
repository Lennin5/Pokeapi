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
            <div
                :class="'pokemon_card_' + pokemon.name"
                :style="{
                    width: pokemon.element !== pokemonType ? '240px' : '200px',
                    height: pokemon.element !== pokemonType ? '240px' : '200px',
                    backgroundImage: 'url(' + getElementTypeLogo(pokemonType) + ')',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    position: 'absolute',
                    opacity: '0.1',
                    marginTop: pokemon.element !== pokemonType ? '0' : '130px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    top: pokemon.element !== pokemonType ? '0' : 'inherit',
                    left: pokemon.element !== pokemonType ? '0' : 'inherit',
                    clipPath: pokemon.element !== pokemonType && 'polygon(100% 0, 100% 100%, 50% 100%, 50% 0)', /* Mostrar lado derecho */                    
                    transform: pokemon.element !== pokemonType && 'scaleX(1) translateX(-50%)', /* Escalar y ajustar la posición de la imagen */
                }"
            />          
            <div
                v-if="pokemon.element !== pokemonType"
                :class="'pokemon_card_' + pokemon.name"
                :style="{
                    width: '240px',
                    height: '240px',
                    backgroundImage: 'url(' + getElementTypeLogo(pokemon.element) + ')',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    position: 'absolute',
                    opacity: '0.1',
                    bottom: '0',            
                    right: '0',
                    clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0% 100%)', /* Cambiado el clipPath */
                    transform: 'scaleX(1) translateX(50%)', /* Escalar y ajustar la posición de la imagen */
                }"
            />            
          <div class="">
            <v-img :src="pokemon.sprites[0]" max-height="300px" max-width="150" class="" :class="'pokemon_image_'+pokemon.name"></v-img>
            <div class="font-weight-bold d-flex justify-center"
            :class="pokemon.element === 'flying' ? 'gray--text' : 'white--text'">
              <h2>
                {{ pokemon.name[0].toUpperCase() + pokemon.name.slice(1) }}
                <!-- {{ pokemon.id  }} -->
              </h2>                
            </div>
          </div>
          </div>        
            <v-card-text 
                :style="{
                    background: pokemon.element !== pokemonType ?
                    'linear-gradient(to right, ' + getElementColorHex(pokemonType) + ', ' + getElementColorHex(pokemon.element) + ')'
                    : getElementColorHex(pokemon.element)}">
            <div class="font-weight-bold mt-0 d-flex justify-center" style="color: #f2f2f2bc">
                <h4>                  
                    {{ pokemonType[0].toUpperCase() + pokemonType.slice(1) }}
                        {{ pokemonType !== pokemon.element ? ' / ' + pokemon.element[0].toUpperCase() + pokemon.element.slice(1) : '' }}
                </h4>
            </div> 
            <div class="d-flex justify-center" style="background-color: transparent;">
                <div
                    class="container-element elevation-2"
                    :style="{            
                    zIndex: '99',    
                    backgroundColor: getElementColorHex(pokemonType),
                    boxShadow: pokemonType === 'flying' ? '0px 0px 2px 0px #343838' : 'none',
                    // border: '1px solid #dbdbdb',
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
                    class="container-element elevation-2 ms-1"
                    :style="{       
                    zIndex: '99',            
                    backgroundColor: getElementColorHex(pokemon.element),
                    boxShadow: pokemon.element === 'flying' ? '0px 0px 2px 0px #343838' : 'none',
                    // border: '1px solid #dbdbdb',
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
                  class="mt-5 mb-5 rounded-lg"
                  :dark="pokemon.element === 'flying' ? false : true"
                  :light="pokemon.element === 'flying' ? true : false">
                      View Details
                </v-btn>                
              </div>
            </v-card-text>  
        </v-card>      
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
    }
}
</script>

<style scoped> 
</style>