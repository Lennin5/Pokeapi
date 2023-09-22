<template>
    <v-row>      
    <v-col
        v-for="(pokemon, index) in pokemonsList"
        :key="pokemon.name"
        cols="12"
        xs="12"
        sm="6"
        md="4"
        lg="3"
        xl="3"
        class="d-flex justify-center"
    >
        <v-card width="400" style="border-radius: 20px !important;"
        :style="{background: pokemon.element !== pokemonType ? 'linear-gradient(to right, ' + getElementColorHex(pokemonType) + ', ' + getElementColorHex(pokemon.element) + ')' : getElementColorHex(pokemonType) }">
        <div class="d-flex justify-center">
            <v-img :src="pokemon.spriteURL || pokemon.sprites[index]
            " max-height="300px" max-width="150" class="">
            </v-img>
        </div>
        <v-card-text>
            <div class="font-weight-bold ml-0 white--text d-flex justify-center">
            <h2>                  
                {{ pokemon.name[0].toUpperCase() + pokemon.name.slice(1) }}
            </h2>
            </div>
            <div class="font-weight-bold mt-2 white--text d-flex justify-center" style="opacity: 0.4;">
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
}
</script>

<style scoped> 
</style>