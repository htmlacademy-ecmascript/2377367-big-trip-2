import {FiltersType} from '../const.js';
import {isFuture, isPast, isPresent} from './date.js';

const filter = {
  [FiltersType.EVERYTHING]: (points) => points,
  [FiltersType.FUTURE]: (points) => points.filter((point) => isFuture(point.dateFrom)),
  [FiltersType.PRESENT]: (points) => points.filter((point) => isPresent(point.dateFrom, point.dateTo)),
  [FiltersType.PAST]: (points) => points.filter((point) => isPast(point.dateTo)),
};

//сформировать фильтр по точка маршрута
function generateFilter(points) {
  return Object.entries(filter).map(
    ([filterType, filterPoints]) => ({
      type: filterType,
      count: filterPoints(points).length,
    }),
  );
}

export {filter, generateFilter};
