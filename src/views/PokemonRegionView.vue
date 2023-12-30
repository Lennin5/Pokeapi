<template>        
    <div>
        <!-- {{ pokemonRegionId }} -->
        <UnderConstructionView />
    </div>    
</template>

<script>
    import pokeApi from '@/plugins/axios';
    import UnderConstructionView from '@/views/UnderConstructionView.vue';
export default {
    data() {
        return {
            pokemonLocations: [],
            pokemonRegionId: this.$route.params.region,                  
        }
    },
    components: {
        UnderConstructionView
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