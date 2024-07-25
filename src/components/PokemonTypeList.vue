<template>
    <v-row class="ma-1">      
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
          class="card rounded-xl"
          :style="{
            background: pokemon.elements.length === 1 ?
            getElementColorHex(pokemonType)
            : 'linear-gradient(to bottom right, ' + getElementColorHex(pokemonType) + ', ' + getElementColorHex(secondaryElementName(pokemon)) + ' 90% )',
          }"

          >
          <div class="d-flex justify-center align-center" 
          :style="{
            width: '100%',
            height: '170px',              
          }"
          @mouseover="setElementOpacity(pokemon.name, 0.3)"
          @mouseout="setElementOpacity(pokemon.name, 0.1)">
            <div
                :class="'pokemon_card_' + pokemon.name"
                :style="{
                    width: pokemon.elements.length > 1 ? '240px' : '200px',
                    height: pokemon.elements.length > 1 ? '240px' : '200px',
                    backgroundImage: 'url(' + getElementTypeLogo(pokemonType) + ')',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    position: 'absolute',
                    opacity: '0.06',
                    marginTop: pokemon.elements.length > 1 ? '0' : '130px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    top: pokemon.elements.length > 1 ? '0' : 'inherit',
                    left: pokemon.elements.length > 1 ? '0' : 'inherit',
                    clipPath: pokemon.elements.length > 1 && 'polygon(100% 0, 100% 100%, 50% 100%, 50% 0)', /* Mostrar lado derecho */                    
                    transform: pokemon.elements.length > 1 && 'scaleX(1) translateX(-50%)', /* Escalar y ajustar la posición de la imagen */
                }"
            />          
            <div
                v-if="pokemon.elements.length > 1"
                :class="'pokemon_card_' + pokemon.name"
                :style="{
                    width: '240px',
                    height: '240px',
                    backgroundImage: 'url(' + getElementTypeLogo(secondaryElementName(pokemon)) + ')',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    position: 'absolute',
                    opacity: '0.06',
                    bottom: '0',            
                    right: '0',
                    clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0% 100%)', /* Cambiado el clipPath */
                    transform: 'scaleX(1) translateX(50%)', /* Escalar y ajustar la posición de la imagen */
                }"
            />            
            <div class="">
                <v-img :src="pokemon.sprites[0]" max-height="300px" max-width="150" class="" :class="'pokemon_image_'+pokemon.name"></v-img>
                <div class="font-weight-bold d-flex justify-center"
                :class="pokemon.element === 'flying' ? 'black--text' : 'white--text'">
                <h2>
                    {{ pokemon.name[0].toUpperCase() + pokemon.name.slice(1) }}
                    <!-- {{ pokemon.element  }} -->
                </h2>                
                </div>
            </div>
          </div>        
            <v-card-text>
            <div class="font-weight-bold mt-0 d-flex justify-center" 
            :style="{
                color: pokemonType === 'flying' ? 
                    pokemon.element === 'flying' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(266, 266, 266, 0.8)'
                    : 'rgba(266, 266, 266, 0.5)'
            }">
                <h4>                  
                    {{ pokemonType[0].toUpperCase() + pokemonType.slice(1) }}
                        {{ pokemon.elements.length > 1 ? ' / ' + (secondaryElementName(pokemon))[0].toUpperCase() + (secondaryElementName(pokemon)).slice(1) : '' }}
                </h4>
            </div> 
            <div class="d-flex justify-center" style="background-color: transparent;">
                <div
                    class="container-element elevation-2"
                    :style="{            
                    backgroundColor: getElementColorHex(pokemonType),
                    boxShadow: pokemonType === 'flying' ? '0px 0px 2px 0px #343838' : 'none',
                    zIndex: '1',
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
                    v-if="pokemon.elements.length > 1"
                    class="container-element elevation-2 ms-1"
                    :style="{                
                    backgroundColor: getElementColorHex(secondaryElementName(pokemon)),
                    boxShadow: pokemon.element === 'flying' ? '0px 0px 2px 0px #343838' : 'none',
                    zIndex: '1',
                    // border: '1px solid #dbdbdb',
                    }"
                >
                    <div
                    class="element-icon"
                    :style="{
                        backgroundImage: 'url(' + getElementTypeLogo(secondaryElementName(pokemon)) + ')',
                    }"                    
                    />
                </div>
            </div>     
                         
              <div class="d-flex justify-center pb-2">
                <!-- <v-btn
                  :to="{ path: '/details', query: { pokemonObject: pokemon, spritesObject: Object.values(pokemon.sprites) } }"
                  :style="{background: pokemon.elements.length > 1 ?
                    'linear-gradient(to right, ' + getElementColorHex(pokemonType) + ', ' + getElementColorHex(pokemon.element) + ')'
                    : getElementColorHex(pokemon.element)}"
                  class="mt-5 mb-5 rounded-lg"
                  :dark="pokemon.element === 'flying' ? false : true"
                  :light="pokemon.element === 'flying' ? true : false">
                      View Details
                </v-btn>                 -->

                <v-btn
                    :to="{ path: '/pokemon/' + pokemon.id }"
                    :style="{
                        background: pokemon.elements.length === 1 ?
                            getElementColorHex(pokemonType)
                            : 'linear-gradient(to right, ' + getElementColorHex(pokemonType) + ', ' + getElementColorHex(secondaryElementName(pokemon)) + ' 90%)',  
                        opacity: '1',
                        shadowColor: 'rgba(266, 266, 266, 0.2)',
                        
                    }"
                    class="my-5 rounded-lg"
                    :dark="pokemon.element === 'flying' ? false : true"
                    :light="pokemon.element === 'flying' ? true : false"                    
                >
                    View Details
                </v-btn>

                <!-- <v-btn                    
                    :to="{ path: '/pokemon/' + pokemon.id }"
                    :style="{
                        background: pokemon.element === 'flying' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(266, 266, 266, 0.2)',
                        opacity: '1',
                        boxShadow: 'none',
                        border: '1px solid rgba(266, 266, 266, 0.1)',
                    }"
                    class="my-5 rounded-lg"
                    :dark="pokemon.element === 'flying' ? false : true"
                    :light="pokemon.element === 'flying' ? true : false"                    
                >
                    View Details
                </v-btn>                 -->

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
    },

    methods: {
        // Función para obtener el segundo elemento del pokemon, (recordemos que el índice 0 del primer elemento no siempre es el elemento actual del tipo en el que nos encontramos)
        secondaryElementName(pokemon) {            
            return pokemon.elements[0].type.name === this.pokemonType ? pokemon.elements[1].type.name : pokemon.elements[0].type.name;
        },
    }
}
</script>

<style scoped> 
</style>