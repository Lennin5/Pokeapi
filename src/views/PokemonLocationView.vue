<template>
  <div>
    <span v-for="pokemon in pokemonsInLocation" :key="pokemon.index">
      {{ pokemon.name }}
    </span>
  </div>
</template>

<script>
    import pokeApi from '@/plugins/axios';
export default {
    data() {
        return {
            pokemonEncounters: [],
            pokemonsInLocation: [],
        }
    },
    
    methods: {
        async getPokemonsByRegion(){
        try {
            const regionNombre = "1";
            // Paso A: Obtener la URL de la región por nombre
            const regionResponse = await pokeApi.get(`/region/${regionNombre}/`);        
            const regionData = regionResponse.data;

            // // Paso B: Obtener las ubicaciones de la región
            const locations = regionData.locations;

            for (const location of locations) {
                const locationResponse = await pokeApi.get('/location/' + location.name);
                const locationData = locationResponse.data;          

                const areas = locationData.areas;
                if(areas.length !== 1){
                    // console.log(locationData.name, areas, 'areas');

                    for (const area of areas) {
                        // get id from url (last element of / on url)
                        var id_area = area.url.split('/').filter(Boolean).pop();

                        const areaResponse = await pokeApi.get('/location-area/' + id_area);
                        const areaData = areaResponse.data;

                        const encounters = areaData.pokemon_encounters;

                        for (const pokemonEncounter of encounters){
                            // if pokemon not exist in array, add it
                            if(!this.pokemonEncounters.includes(pokemonEncounter.pokemon.name)){
                                this.pokemonEncounters.push(pokemonEncounter.pokemon.name);
                                const response = await pokeApi.get(`/pokemon/${pokemonEncounter.pokemon.name}`);
                                const pokemon = response.data;
                                this.pokemonsInLocation.push(pokemon);
                            }
                            
                        }
                    } 
                }            
            }

        } catch (error) {
            console.error('Error al obtener los datos:', error);
        } 
        
        console.log("pokemonsInLocation: ", this.pokemonsInLocation);
        },        
    },

    created() {
        this.getPokemonsByRegion();    
    }    
}
</script>

<style>

</style>