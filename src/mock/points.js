import {POINTS_COUNT,TIME_ZONE} from '../const.js';
import {getRandomArrayElement, getRandomInteger} from '../utils/random.js';
import {getRandomOffers} from './offers.js';

//список точек маршрута
const mockPoints = [
  {
    id: 'p-01',
    basePrice: getRandomInteger(10, 1000),
    dateFrom: `2023-03-18T10:30:00.000${TIME_ZONE}`,
    dateTo: `2023-03-18T11:00:00.000${TIME_ZONE}`,
    destination: 'd-1',
    isFavorite: !!getRandomInteger(0, 1),
    offers: getRandomOffers('taxi'),
    type: 'taxi'
  },
  {
    id: 'p-02',
    basePrice: getRandomInteger(10, 1000),
    dateFrom: `2023-03-18T12:25:00.000${TIME_ZONE}`,
    dateTo: `2023-03-18T13:35:00.000${TIME_ZONE}`,
    destination: 'd-2',
    isFavorite: !!getRandomInteger(0, 1),
    offers: getRandomOffers('flight'),
    type: 'flight'
  },
  {
    id: 'p-03',
    basePrice: getRandomInteger(10, 1000),
    dateFrom: `2023-03-18T14:30:00.000${TIME_ZONE}`,
    dateTo: `2023-03-18T16:05:00.000${TIME_ZONE}`,
    destination: 'd-2',
    isFavorite: !!getRandomInteger(0, 1),
    offers: getRandomOffers('drive'),
    type: 'drive'
  },
  {
    id: 'p-04',
    basePrice: getRandomInteger(10, 1000),
    dateFrom: `2023-03-18T16:20:00.000${TIME_ZONE}`,
    dateTo: `2023-03-18T17:00:00.000${TIME_ZONE}`,
    destination: 'd-2',
    isFavorite: !!getRandomInteger(0, 1),
    offers: getRandomOffers('check-in'),
    type: 'check-in'
  },
  {
    id: 'p-05',
    basePrice: getRandomInteger(10, 1000),
    dateFrom: `2023-03-19T13:00:00.000${TIME_ZONE}`,
    dateTo: `2023-03-19T14:20:00.000${TIME_ZONE}`,
    destination: 'd-2',
    isFavorite: !!getRandomInteger(0, 1),
    offers: getRandomOffers('sightseeing'),
    type: 'sightseeing'
  },
  {
    id: 'p-07',
    basePrice: getRandomInteger(10, 1000),
    dateFrom: `2023-03-19T16:00:00.000${TIME_ZONE}`,
    dateTo: `2023-03-19T17:00:00.000${TIME_ZONE}`,
    destination: 'd-2',
    isFavorite: !!getRandomInteger(0, 1),
    offers: getRandomOffers('drive'),
    type: 'drive'
  },
  {
    id: 'p-08',
    basePrice: getRandomInteger(10, 1000),
    dateFrom: `2023-03-19T18:00:00.000${TIME_ZONE}`,
    dateTo: `2023-03-19T19:00:00.000${TIME_ZONE}`,
    destination: 'd-3',
    isFavorite: !!getRandomInteger(0, 1),
    offers: getRandomOffers('flight'),
    type: 'flight'
  },
  {
    id: 'p-09',
    basePrice: getRandomInteger(10, 1000),
    dateFrom: `2023-03-20T08:25:00.000${TIME_ZONE}`,
    dateTo: `2023-03-20T09:25:00.000${TIME_ZONE}`,
    destination: 'd-3',
    isFavorite: !!getRandomInteger(0, 1),
    offers: getRandomOffers('drive'),
    type: 'drive'
  },
  {
    id: 'p-10',
    basePrice: getRandomInteger(10, 1000),
    dateFrom: `2023-03-20T08:25:00.000${TIME_ZONE}`,
    dateTo: `2023-03-20T09:25:00.000${TIME_ZONE}`,
    destination: 'd-3',
    isFavorite: !!getRandomInteger(0, 1),
    offers: getRandomOffers('sightseeing'),
    type: 'sightseeing'
  },
  {
    id: 'p-11',
    basePrice: getRandomInteger(10, 1000),
    dateFrom: `2024-01-20T08:00:00.000${TIME_ZONE}`,
    dateTo: `2024-01-30T06:25:00.000${TIME_ZONE}`,
    destination: 'd-3',
    isFavorite: !!getRandomInteger(0, 1),
    offers: getRandomOffers('check-in'),
    type: 'check-in',
  },
  {
    id: 'p-12',
    basePrice: getRandomInteger(10, 1000),
    dateFrom: `2024-04-20T08:25:00.000${TIME_ZONE}`,
    dateTo: `2024-04-20T09:25:00.000${TIME_ZONE}`,
    destination: 'd-3',
    isFavorite: !!getRandomInteger(0, 1),
    offers: getRandomOffers('bus'),
    type: 'bus',
  },
];

//генерация случайного набора точек маршрута
function getRandomPoints() {
  const pointsRandom = Array.from({length: 0});

  while (pointsRandom.length < POINTS_COUNT) {
    const item = getRandomArrayElement(mockPoints);

    if (!pointsRandom.includes(item)) {
      pointsRandom.push(item);
    }
  }

  return pointsRandom;
}

export {getRandomPoints};
