import {FilterType} from '../const.js';
import {isFuture, isPast, isPresent} from './date.js';

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isFuture(point.dateFrom)),
  [FilterType.PRESENT]: (points) => points.filter((point) => isPresent(point.dateFrom, point.dateTo)),
  [FilterType.PAST]: (points) => points.filter((point) => isPast(point.dateTo)),
};

//сформировать фильтр по точке маршрута
function generateFilter(points) {
  return Object.entries(filter).map(
    ([filterType, filterPoints]) => ({
      type: filterType,
      count: filterPoints(points).length,
    }),
  );
}

export {generateFilter};
