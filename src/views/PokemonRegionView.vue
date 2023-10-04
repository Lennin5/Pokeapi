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
            pokemonRegionId: this.$route.params.region,      
        }
    },
    methods: {
        async getLocationsInRegion(){
            const response = await pokeApi.get(`/region/${this.pokemonRegionId}`);
            console.log(response, 'response');
        }
    },

    created() {
        this.getLocationsInRegion();
    }
}
</script>

<style>

</style>