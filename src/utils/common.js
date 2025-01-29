import {SortType} from '../const.js';
import {compareDurations, sortByDate} from './date.js';

const isEscape = (event) => event.key === 'Escape';

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
  getElementById,
  isEscape,
  updateItem,
  sortPoints,
};
