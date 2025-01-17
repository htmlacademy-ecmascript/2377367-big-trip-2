
import {SortType} from '../const.js';
import {compareDurations, sortByDate} from './date.js';

//получить названия пунктов назначения
const getDestinationNames = (destinations, points = []) => {
  if (points.length > 0) {
    return [...new Set(points.map((point) => destinations.find((item) => point.destination === item.id)).map((item) => item.name))];
  }
  return [...new Set(destinations.map((destination) => destination.name))];
};

const isEscape = (event) => event.key === 'Escape';

//получить стоимость всех точек маршрута с дополнительными предложениями
const getFullPrice = (points, offers) => {
  const baseFullPrice = points.map((point) => point.basePrice).reduce((accumulator, value) => accumulator + value, 0);
  const offersPoints = points.map((point) => point.offers).flat(Infinity);
  const offersPrice = offers.map((offer) => offer.offers).flat().filter((item) => offersPoints.find((offer) => offer === item.id)).map((item) => item.price).reduce((accumulator, value) => accumulator + value, 0);
  return baseFullPrice + offersPrice;
};

//получить элемент по типу
const getElementByType = (elements, type) => elements.find((element) => element.type === type);

//получить элемент по id
function getElementById(elements, itemsId) {
  if (Array.isArray(itemsId)) {
    return elements.filter((element) => itemsId.find((id) => element.id === id));
  }
  return elements.find((element) => element.id === itemsId);
}

//обновление элементов в массиве объектов
function updateItem(items, update) {
  return items.map((item) => item.id === update.id ? update : item);
}

//сортировка точек маршрута
function sortPoints(name, points) {
  switch (name) {
    case SortType.DAY.name:
      points.sort((firstPoint, secondPoint) => sortByDate(firstPoint, secondPoint));
      break;
    case SortType.PRICE.name:
      points.sort((firstPoint, secondPoint) => secondPoint.basePrice - firstPoint.basePrice);
      break;
    case SortType.TIME.name:
      points.sort((firstPoint, secondPoint) => compareDurations(firstPoint, secondPoint));
      break;
  }
}

export {
  getDestinationNames,
  getFullPrice,
  getElementByType,
  getElementById,
  isEscape,
  updateItem,
  sortPoints,
};
