<template>
  <div>
    <v-container>

      <!-- Header of all pokemons getRandomPokemonType() -->
      <v-row justify="center" class="mt-0">
        <v-col cols="12">
          <v-card
            class="mx-auto rounded-xl d-flex align-start justify-center"
            width="fullscreen"
            height="200px"
            :style="{
              background: 'linear-gradient(to right, ' + getRandomPokemonColorHex() + ', ' + getRandomPokemonColorHex() + ')'
              }"
            >           
            <div
                v-for="(item, index) in backgroundTypeList"
                :key="index"
                :style="{
                  backgroundImage: 'url(' + getElementTypeLogo(item.name) + ')',   
                  width: item.width,
                  height: item.height,         
                  margin: item.margin,      
                }"
                style="
                  border-radius: 0px;                                                    
                  opacity: 0.1;
                  position: absolute;
                  background-size: contain;
                  background-position: center;
                  "
              >
            </div>

            <div class="w-100" style="border: 1px solid transparent">
              <div class="d-flex justify-start align-end ms-2 mt-3 white--text" @click="$router.go(-1)">
                <div>
                  <v-icon       
                  style="z-index: 999"
                  class="white--text cursor-pointer"  
                  >mdi-chevron-left</v-icon>                      
                </div>
                <div>
                  <div 
                  style="z-index: 999"
                  class="text-subtitle-2 cursor-pointer"
                  >Back</div>
                </div>
              </div>  
              <div class="d-flex justify-center align-start w-100">
                <v-container class="d-flex flex-column justify-center align-center" style="border: 1px solid transparent" width="100%">
                  <div class="ml-0" style="border: 1px solid transparent;" >               
                    <span class="text-h4 font-weight-bold text-center white--text">
                        All Pokémons
                    </span> 
                  </div>         
                  <!-- Agregamos la paginación -->
                  <div class="d-flex justify-center mt-5" style="z-index: 99;">
                    <v-pagination
                      light
                      v-model="page"
                      :length="totalPages"
                      circle
                      :color="getRandomPokemonColorNormal()"
                    >
                    </v-pagination>
                  </div>                     
                </v-container>
              </div>                
            </div>
            </v-card>
        </v-col>    
      </v-row>  
      <!-- <h1 style="text-align: center;" class="grey--text">All Pokémons</h1> -->            
      <br>
        <v-row>
          <v-col
            v-for="pokemon in paginatedPokemons"
            :key="pokemon.name"
            cols="12"
            xs="12"
            sm="6"
            md="4"
            lg="3"
            xl="3"
            class="d-flex justify-center"
          >
            <v-card width="400" style="border-radius: 20px !important;">
              <div class="d-flex justify-center">
                <v-img :src="pokemon.sprites[index]" max-height="300px" max-width="150" class="">
                </v-img>
              </div>

              <v-card-text>
                  <div class="font-weight-bold ml-0 gray--text d-flex justify-center">
                  <h2>                  
                      {{ pokemon.name[0].toUpperCase() + pokemon.name.slice(1) }}
                  </h2>
                  </div>
                  <div class="font-weight-bold mt-2 grey--text d-flex justify-center">
                  <h4>                  
                      {{ pokemon.element[0].toUpperCase() + pokemon.element.slice(1) }}
                  </h4>
                  </div>              
                  <div class="d-flex justify-center mb-3">
                  <div
                      class="container-element"
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
                  :color="getElementColorNormal(pokemon.element)"
                  class="mt-2"
                  :dark="pokemon.element === 'flying' ? false : true"
                  :lihght="pokemon.element === 'flying' ? true : false">
                      View Details
                          </v-btn>                
                  </div>
              </v-card-text>  

            </v-card>
          </v-col>
        </v-row>      
      </v-container>    
  </div>
</template>

<script>
  import pokeApi from '../plugins/axios';
export default {
  data() {
    return {
      pokemonType: 'normal',
      pokemons: [],
      index: 0,
      page: 1, // Página inicial
      pokemonsLimit: 500, // 200 pokemons / 1292 en total
      pokemonsPerPage: 100, // 50 pokemons por página    
      backgroundTypeList: [
        {
          name: 'normal',
          width: '450px',
          height: '350px',
          margin: '-70px 0px 0px 0px',
        },
        {
          name: 'dragon',
          width: '350px',
          height: '170px',
          margin: '90px 0px 0px 1050px',
        },
        {
          name: 'ground',
          width: '350px',
          height: '200px',
          margin: '80px 1000px 0px 0px',
        },
        {
          name: 'dark',
          width: '350px',
          height: '190px',
          margin: '-120px 900px 0px 0px',
        },
        {
          name: 'rock',
          width: '250px',
          height: '190px',
          margin: '-80px 0px 0px 950px',
        },
        {
          name: 'grass',
          width: '350px',
          height: '150px',
          margin: '110px 600px 0px 0px',
        },
        {
          name: 'fire',
          width: '350px',
          height: '200px',
          margin: '80px 0px 0px 700px',
        },
        {
          name: 'electric',
          width: '250px',
          height: '150px',
          margin: '-20px 450px 0px 0px',          
        },
        {
          name: 'poison',
          width: '350px',
          height: '150px',
          margin: '-70px 0px 0px 530px',
        },
        {
          name: 'water',
          width: '350px',
          height: '50px',
          margin: '60px 1090px 0px 0px',
        },
        {
          name: 'psychic',
          width: '350px',
          height: '90px',
          margin: '100px 0px 0px 435px',
        },
        {
          name: 'steel',
          width: '350px',
          height: '70px',
          margin: '40px 650px 0px 0px',
        },
        {
          name: 'bug',
          width: '350px',
          height: '50px',
          margin: '90px 780px 0px 0px',          
        },
        {
          name: 'fighting',
          width: '350px',
          height: '40px',
          margin: '150px 355px 0px 0px',
        },
        {
          name: 'ghost',
          width: '350px',
          height: '45px',
          margin: '100px 0px 0px 870px',
        },
        {
          name: 'fairy',
          width: '350px',
          height: '40px',
          margin: '100px 0px 0px 595px',
        },
      ]
    };
  },
  async created() {
    this.getPokemonData();

    // this.areaDeCirculo();
    // this.numeroParOImpar();
    // this.calcularSumaDeArray();
  },  
  methods: {
    async getPokemonData() {
      try {
        // 640 we encounter a flying pokemon (white color)
        const response = await pokeApi.get(`/pokemon/?offset=0&limit=${this.pokemonsLimit}`);
        const pokemons = response.data.results;

        const pokemonData = await Promise.all(
          pokemons.map(async (pokemon) => {
            const pokemonResponse = await pokeApi.get(`/pokemon/${pokemon.name}`);
            const spriteURL = pokemonResponse.data.sprites.front_default;
            const element = pokemonResponse.data.types[0].type.name;
            const abilities = pokemonResponse.data.abilities;

            const id = pokemonResponse.data.id;
            const level = pokemonResponse.data.base_experience;
            const height = pokemonResponse.data.height;
            
            const sprites = [
              pokemonResponse.data.sprites.front_default,
              pokemonResponse.data.sprites.back_default,
              pokemonResponse.data.sprites.front_shiny,
              pokemonResponse.data.sprites.back_shiny,
            ];
            return {
              name: pokemon.name,
              spriteURL: spriteURL,
              element: element,
              sprites: sprites,
              abilities: abilities,
              id: id,
              level: level,
              height: height,
            };
          })
        );

        this.pokemons = pokemonData;
      } catch (error) {
        console.error(error);
      }
    }, 
    
    areaDeCirculo(){
        // Formula para calcular el área de un círculo: A = π * r2

        // Radio del círculo
        let radio = 5;

        // Valor de PI
        let PI = 3.1416;

        // Área del círculo
        var area = PI * (radio * radio);

        // Impresión del área del círculo
        console.log("El área del círculo es: " + area);
    },

    numeroParOImpar(){
        // Número a evaluar (Ejemplo: 11 Numeo impar, 10 Número par)
        var numero = 11;

        // Evaluación del número basandose en el residuo de la división entre 2
        if(numero % 2 == 0){
            console.log("El número " + numero + " es par");
        }else{
            console.log("El número " + numero + " es impar");
        }
    },

    calcularSumaDeArray(){
        // Array de números
        let numeros = [10, 20, 30, 40, 50];

        // Variable para almacenar la suma de los números
        let suma = 0;

        // Ciclo para recorrer el array de números
        for(let i = 0; i < numeros.length; i++){
            // Sumar los números usando la variable suma y el arreglo de números
            suma += numeros[i];
        }

        // Imprimir la suma de los números
        console.log("La suma de los números es: " + suma);
    }    
  },
  computed: {
    totalPages() {
      // 100 is the number of pokemons per page
      return Math.ceil(this.pokemons.length / this.pokemonsPerPage);
    },

    paginatedPokemons() {
      const startIndex = (this.page - 1) * this.pokemonsPerPage;
      const endIndex = startIndex + this.pokemonsPerPage;
      return this.pokemons.slice(startIndex, endIndex);
    }
  }  
}
</script>

<style>

</style>