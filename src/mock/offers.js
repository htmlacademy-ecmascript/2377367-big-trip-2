//список дополнительных предложений
import {getElementByType, getRandomInteger, shuffle, changeLengthRandom} from '../utils/common.js';

const mockOffers = [
  {
    type: 'taxi',
    offers: [
      {
        id: 'of-01',
        title: 'Upgrade to a business class',
        price: getRandomInteger(5, 400)
      },
      {
        id: 'of-02',
        title: 'Choose the radio station',
        price: getRandomInteger(5, 400)
      },
      {
        id: 'of-03',
        title: 'Choose temperature',
        price: getRandomInteger(5, 400)
      }
    ]
  },
  {
    type: 'bus',
    offers: [
      {
        id: 'of-04',
        title: 'Infotainment system',
        price: getRandomInteger(5, 400)
      },
      {
        id: 'of-05',
        title: 'Order meal',
        price: getRandomInteger(5, 400)
      },
      {
        id: 'of-06',
        title: 'Choose seats',
        price: getRandomInteger(5, 400)
      }
    ]
  },
  {
    type: 'train',
    offers: [
      {
        id: 'of-07',
        title: 'Book a taxi at the arrival point',
        price: getRandomInteger(5, 400)
      },
      {
        id: 'of-08',
        title: 'Order a breakfast',
        price: getRandomInteger(5, 400)
      },
      {
        id: 'of-09',
        title: 'Wake up at a certain time',
        price: getRandomInteger(5, 400)
      }
    ]
  },
  {
    type: 'flight',
    offers: [
      {
        id: 'of-10',
        title: 'Choose meal',
        price: getRandomInteger(5, 400)
      },
      {
        id: 'of-11',
        title: 'Choose seats',
        price: 117
      },
      {
        id: 'of-12',
        title: 'Upgrade to comfort class',
        price: getRandomInteger(5, 400)
      },
      {
        id: 'of-13',
        title: 'Upgrade to business class',
        price: getRandomInteger(5, 400)
      },
      {
        id: 'of-14',
        title: 'Add luggage',
        price: getRandomInteger(5, 400)
      },
      {
        id: 'of-15',
        title: 'Business lounge',
        price: getRandomInteger(5, 400)
      }
    ]
  },
  {
    type: 'check-in',
    offers: [
      {
        id: 'of-16',
        title: 'Choose the time of check-in',
        price: getRandomInteger(5, 400)
      },
      {
        id: 'of-17',
        title: 'Choose the time of check-out',
        price: getRandomInteger(5, 400)
      },
      {
        id: 'of-18',
        title: 'Add breakfast',
        price: getRandomInteger(5, 400)
      },
      {
        id: 'of-19',
        title: 'Laundry',
        price: getRandomInteger(5, 400)
      },
      {
        id: 'of-20',
        title: 'Order a meal from the restaurant',
        price: getRandomInteger(5, 400)
      }
    ]
  },
  {
    type: 'sightseeing',
    offers: []
  },
  {
    type: 'ship',
    offers: [
      {
        id: 'of-21',
        title: 'Choose meal',
        price: getRandomInteger(5, 400)
      },
      {
        id: 'of-22',
        title: 'Choose seats',
        price: getRandomInteger(5, 400)
      },
      {
        id: 'of-23',
        title: 'Upgrade to comfort class',
        price: getRandomInteger(5, 400)
      },
      {
        id: 'of-24',
        title: 'Upgrade to business class',
        price: getRandomInteger(5, 400)
      },
    ]
  },
  {
    type: 'drive',
    offers: [
      {
        id: 'of-25',
        title: 'With automatic transmission',
        price: getRandomInteger(5, 400)
      },
      {
        id: 'of-26',
        title: 'With air conditioning',
        price: getRandomInteger(5, 400)
      }
    ]
  },
  {
    type: 'restaurant',
    offers: [
      {
        id: 'of-27',
        title: 'Choose live music',
        price: getRandomInteger(5, 400)
      },
      {
        id: 'of-28',
        title: 'Choose VIP area',
        price: getRandomInteger(5, 400)
      }
    ]
  }
];

function getOffers() {
  return mockOffers;
}

//генерация случайного набора дополнительных предложений
function getRandomOffers(type) {
  const arr = getElementByType(mockOffers, type).offers.map((items) => items.id);
  return changeLengthRandom(shuffle(arr));
}

export {getOffers, getRandomOffers};
