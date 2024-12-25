import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import duration from 'dayjs/plugin/duration';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import {DateFormat, MILLISECONDS_IN_HOUR, MILLISECONDS_IN_DAY} from '../const.js';

dayjs.extend(minMax);
dayjs.extend(duration);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

//получить самую раннюю дату из точек маршрута
const getMinDate = (items) => convertDate(dayjs.min(items.map((item) => dayjs(item.dateFrom))), DateFormat.DAY_MONTH);

//получить самую позднюю дату из точек маршрута
const getMaxDate = (items) => convertDate(dayjs.max(items.map((item) => dayjs(item.dateTo))), DateFormat.DAY_MONTH);

//проверка является ли указанная дата будущей по отношению к текущему времени
const isFuture = (date) => date && dayjs().isBefore(date);

//проверка является ли указанная дата прошедшей по отношению к текущему времени
const isPast = (date) => date && dayjs().isAfter(date);

//проверка находится ли текущее время внутри заданного диапазона
const isPresent = (dateFrom, dateTo) => dayjs().isSameOrAfter(dateFrom) && dayjs().isSameOrBefore(dateTo);

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
    return dayjs.duration(difference).format(DateFormat.HOUR_MINUTES_WITH_POSTFIX);
  }

  return dayjs.duration(difference).format(DateFormat.DAY_HOUR_MINUTES_WITH_POSTFIX);
}

//сортировка по времени
const sortByTime = (a, b) => dayjs(b.dateTo).diff(b.dateFrom) - dayjs(a.dateTo).diff(a.dateFrom);

export {
  convertDate,
  getDifferenceInTime,
  getMinDate,
  getMaxDate,
  isFuture,
  isPast,
  isPresent,
  sortByTime,
};
