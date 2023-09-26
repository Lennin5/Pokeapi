
import Vue from 'vue';

import FireTypeLogo from '@/assets/img/types/fire.svg';
import GrassTypeLogo from '@/assets/img/types/grass.svg';
import WaterTypeLogo from '@/assets/img/types/water.svg';
import BugTypeLogo from '@/assets/img/types/bug.svg';
import NormalTypeLogo from '@/assets/img/types/normal.svg';
import PoisonTypeLogo from '@/assets/img/types/poison.svg';
import ElectricTypeLogo from '@/assets/img/types/electric.svg';
import GroundTypeLogo from '@/assets/img/types/ground.svg';
import FairyTypeLogo from '@/assets/img/types/fairy.svg';
import FightingTypeLogo from '@/assets/img/types/fighting.svg';
import PsychicTypeLogo from '@/assets/img/types/psychic.svg';
import RockTypeLogo from '@/assets/img/types/rock.svg';
import SteelTypeLogo from '@/assets/img/types/steel.svg';
import IceTypeLogo from '@/assets/img/types/ice.svg';
import GhostTypeLogo from '@/assets/img/types/ghost.svg';
import DragonTypeLogo from '@/assets/img/types/dragon.svg';
import DarkTypeLogo from '@/assets/img/types/dark.svg';
import FlyingTypeLogo from '@/assets/img/types/flying.svg';

Vue.prototype.getElementTypeLogo = (element) => {
  switch (element) {
    case 'grass':
      return GrassTypeLogo;
    case 'fire':
      return FireTypeLogo;
    case 'water':
      return WaterTypeLogo;
    case 'bug':
      return BugTypeLogo;
    case 'normal':
      return NormalTypeLogo;
    case 'poison':
      return PoisonTypeLogo;
    case 'electric':
      return ElectricTypeLogo;
    case 'ground':
      return GroundTypeLogo;
    case 'fairy':
      return FairyTypeLogo;
    case 'fighting':
      return FightingTypeLogo;
    case 'rock':
      return RockTypeLogo;
    case 'psychic':
      return PsychicTypeLogo;
    case 'ghost':
      return GhostTypeLogo;
    case 'ice':
      return IceTypeLogo;
    case 'dragon':
      return DragonTypeLogo;
    case 'dark':
      return DarkTypeLogo;
    case 'steel':
      return SteelTypeLogo;
    case 'flying':
      return FlyingTypeLogo;
    default:
      return NormalTypeLogo
  }  
}

Vue.prototype.getElementColorNormal = (element) => {
  switch (element) {
    case 'grass':
      return 'teal lighten-2';
    case 'fire':
      return 'red darken-1';
    case 'water':
      return 'light-blue lighten-2';
    case 'bug':
      return 'green accent-4';
    case 'normal':
      return 'orange';
    case 'poison':
      return 'deep-purple accent-2';
    case 'electric':
      return 'yellow darken-2';
    case 'ground':
      return 'brown darken-2';
    case 'fairy':
      return 'pink lighten-2';
    case 'fighting':
      return 'deep-orange lighten-2';
    case 'rock':
      return 'grey darken-1';
    case 'psychic':
      return 'pink darken-1';
    case 'ghost':
      return 'purple lighten-1';
    case 'ice':
      return 'cyan lighten-3';
    case 'dragon':
      return 'indigo darken-1';
    case 'dark':
      return 'grey darken-3';
    case 'steel':
      return 'blue-grey darken-1';
    case 'flying':
      return 'white';
    default:
      return 'orange';  
  }
}

Vue.prototype.getElementColorHex = (element) => {
  switch (element) {
    case 'grass':
      return '#4DB6AC';
    case 'fire':
      return '#E53935';
    case 'water':
      return '#4FC3F7';
    case 'bug':
      return '#00C853';
    case 'normal':
      return '#FF9800';
    case 'poison':
      return '#7C4DFF';
    case 'electric':
      return '#FBC02D';
    case 'ground':
      return '#5D4037';
    case 'fairy':
      return '#F06292';
    case 'fighting':
      return '#FF8A65';
    case 'rock':
      return '#757575';
    case 'psychic':
      return '#D81B60';
    case 'ghost':
      return '#AB47BC';
    case 'ice':
      return '#80DEEA';
    case 'dragon':
      return '#3949AB';
    case 'dark':
      return '#424242';
    case 'steel':
      return '#546E7A';
    case 'flying':
      return '#fff';
    default:
      return '#FF9800';
  }
};

Vue.prototype.getRandomPokemonType = () => {
  const elementTypes = [
    'normal',
    'fighting',
    'flying',
    'poison',
    'ground',
    'rock',
    'bug',
    'ghost',
    'steel',
    'fire',
    'water',
    'grass',
    'electric',
    'psychic',
    'ice',
    'dragon',
    'dark',
    'fairy'
  ];

  const randomType = Math.floor(Math.random() * elementTypes.length);
  return elementTypes[randomType];
} 

Vue.prototype.getRandomPokemonColorNormal = () => {
  const colors = [
    'teal lighten-2',
    'red darken-1',
    'light-blue lighten-2',
    'green accent-4',
    'orange',
    'deep-purple accent-2',
    'yellow darken-2',
    'brown darken-2',
    'pink lighten-2',
    'deep-orange lighten-2',
    'grey darken-1',
    'pink darken-1',
    'purple lighten-1',
    'cyan lighten-3',
    'indigo darken-1',
    'grey darken-3',
    'blue-grey darken-1'
  ];

  const randomColor = Math.floor(Math.random() * colors.length);
  return colors[randomColor];
}  

Vue.prototype.getRandomPokemonColorHex = () => {
  const colors = [
    '#4DB6AC',
    '#E53935',
    '#4FC3F7',
    '#00C853',
    '#FF9800',
    '#7C4DFF',
    '#FBC02D',
    '#5D4037',
    '#F06292',
    '#FF8A65',
    '#757575',
    '#D81B60',
    '#AB47BC',
    '#80DEEA',
    '#3949AB',
    '#424242',
    '#546E7A'
  ];

  const randomColor = Math.floor(Math.random() * colors.length);
  return colors[randomColor];
}
export default new Vue();
