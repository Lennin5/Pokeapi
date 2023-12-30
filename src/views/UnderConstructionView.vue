<template>
    <div class="under-construction-bg">
        <v-img
        contain
        max-height="150"
        max-width="150"
        :src="Ditto"
        ></v-img>       
        <p class="under-construction-text">uNder ConStrUctiÓn!</p> 
        <v-btn
        outlined
        rounded
        color="#f0d2ff"
        @click="$router.push('/')"
        >Back to home</v-btn>                
    </div>
</template>

<script>
    import UnderConstructionBg from "@/assets/img/under-construction.png";
    import Ditto from "@/assets/img/ditto.png";
    import { useRootStore } from "@/assets/store/index";
export default {
    data() {
        return {
            pokemonLocations: [],
            pokemonRegionId: this.$route.params.region,      
            rootStore: useRootStore(),
            UnderConstructionBg,
            Ditto
        }
    },
    beforeMount(){
        this.rootStore.updateNavigationDrawerColor('#b954ba');
    },   
}
</script>

<style>
.under-construction-bg {
    background-color: #c57ce7;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
}
.under-construction-text {
    font-size: 2rem;
    font-weight: bold;
    color: #f0d2ff;
    text-decoration: dashed;
}
</style>