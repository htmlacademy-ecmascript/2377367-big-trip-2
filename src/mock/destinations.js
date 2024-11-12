//список пунктов назначения
const mockDestinations = [
  {
    id: 'd-1',
    description: 'Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.',
    name: 'Amsterdam',
    pictures: [
      {
        src: 'https://22.objects.htmlacademy.pro/static/destinations/1.jpg',
        description: 'Amsterdam beautiful place'
      },
      {
        src: 'https://22.objects.htmlacademy.pro/static/destinations/10.jpg',
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
        src: 'https://22.objects.htmlacademy.pro/static/destinations/6.jpg',
        description: 'Chamonix parliament building'
      },
      {
        src: 'https://22.objects.htmlacademy.pro/static/destinations/5.jpg',
        description: 'Chamonix old city'
      },
      {
        src: 'https://22.objects.htmlacademy.pro/static/destinations/13.jpg',
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
