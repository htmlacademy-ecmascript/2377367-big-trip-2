import {PHOTOS_SRC} from '../const.js';

//список пунктов назначения
const mockDestinations = [
  {
    id: 'd-1',
    description: 'Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.',
    name: 'Amsterdam',
    pictures: [
      {
        src: `${PHOTOS_SRC}1`,
        description: 'Amsterdam beautiful place'
      },
      {
        src: `${PHOTOS_SRC}2`,
        description: 'Amsterdam old city'
      }
    ]
  },
  {
    id: 'd-2',
    description: 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Chamonix',
    pictures: [
      {
        src: `${PHOTOS_SRC}3`,
        description: 'Chamonix parliament building'
      },
      {
        src: `${PHOTOS_SRC}4`,
        description: 'Chamonix old city'
      },
      {
        src: `${PHOTOS_SRC}5`,
        description: 'Chamonix beautiful place'
      }
    ]
  },
  {
    id: 'd-3',
    description: 'Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.',
    name: 'Geneva',
    pictures: []
  },
];

function getDestinations() {
  return mockDestinations;
}

export {getDestinations};
