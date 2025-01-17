
import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import duration from 'dayjs/plugin/duration';
import {DateFormat, MILLISECONDS_IN_HOUR, MILLISECONDS_IN_DAY, FilterType} from '../const.js';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(minMax);
dayjs.extend(duration);
dayjs.extend(isBetween);

//получить самую раннюю дату из точек маршрута
const getMinDate = (items) => convertDate(dayjs.min(items.map((item) => dayjs(item.dateFrom))), DateFormat.DAY_MONTH);

//получить самую позднюю дату из точек маршрута
const getMaxDate = (items) => convertDate(dayjs.max(items.map((item) => dayjs(item.dateTo))), DateFormat.DAY_MONTH);

//преобразование даты
function convertDate(date, format) {
  return date ? dayjs(date).format(format) : '';
}

//получить разницу во времени
function getDifferenceInTime(start, end) {
  const difference = dayjs(end).diff(start);

  if (difference < MILLISECONDS_IN_HOUR) {
    return dayjs.duration(difference).format(DateFormat.MINUTES_WITH_POSTFIX);
  }

  if (difference < MILLISECONDS_IN_DAY) {
    return dayjs.duration(difference).format(DateFormat.HOURS_MINUTES_WITH_POSTFIX);
  }

  return dayjs.duration(difference).format(DateFormat.DAY_HOURS_MINUTES_WITH_POSTFIX);
}

//сортировка по дате
const sortByDate = (firstPoint, secondPoint) => dayjs(firstPoint.dateFrom) - dayjs(secondPoint.dateFrom);

//сравнение двух точек по продолжительности
function compareDurations(firstPoint, secondPoint) {
  const firstPointDuration = dayjs.duration(dayjs(firstPoint.dateTo).diff(dayjs(firstPoint.dateFrom))).asMilliseconds();
  const secondPointDuration = dayjs.duration(dayjs(secondPoint.dateTo).diff(dayjs(secondPoint.dateFrom))).asMilliseconds();
  return secondPointDuration - firstPointDuration;
}

//фильтр точек маршрута
function filterPoints(name, points) {
  switch (name) {
    case FilterType.EVERYTHING:
      return points;
    case FilterType.FUTURE:
      return points.filter((item) => dayjs().isBefore(dayjs(item.dateFrom)));
    case FilterType.PRESENT:
      return points.filter((item) => dayjs().isBetween(dayjs(item.dateTo), dayjs(item.dateFrom)));
    case FilterType.PAST:
      return points.filter((item) => dayjs().isAfter(dayjs(item.dateTo)));
  }
}

export {
  convertDate,
  getDifferenceInTime,
  getMinDate,
  getMaxDate,
  sortByDate,
  compareDurations,
  filterPoints,
};
