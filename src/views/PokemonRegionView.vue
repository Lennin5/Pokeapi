<template>
    <div>
        {{ pokemonRegionId }}
    </div>
</template>

<script>
    import pokeApi from '@/plugins/axios';
export default {
    data() {
        return {
            pokemonLocations: [],
            pokemonRegionId: this.$route.params.region,      
        }
    },
    methods: {
        async getLocationsInRegion(){
            const { data, status } = await pokeApi.get(`/region/${this.pokemonRegionId}`);
            if(status==200)
                console.log(data, 'data');
        }
    },

    created() {
        this.getLocationsInRegion();
    }
}
</script>

<style>

</style>