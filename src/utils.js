
import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import duration from 'dayjs/plugin/duration';
import {DateFormat, MILLISECONDS_IN_HOUR, MILLISECONDS_IN_DAY} from './const';

dayjs.extend(minMax);
dayjs.extend(duration);

//получить случайный элемент массива
function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

//получить случайное целочисленное число
function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//преобразование даты
function convertDate(date, format) {
  return date ? dayjs(date).format(format) : '';
}

//получить разницу во времени
function getDifferenceInTime(start, end) {
  const difference = dayjs(end).diff(start);
  if (difference < MILLISECONDS_IN_HOUR) {
    return dayjs.duration(difference).format(DateFormat.MINUTES_WITH_POSTFIX);
  } else if (difference < MILLISECONDS_IN_DAY) {
    return dayjs.duration(difference).format(DateFormat.HOUR_MINUTES_WITH_POSTFIX);
  }
  return dayjs.duration(difference).format(DateFormat.DAY_HOUR_MINUTES_WITH_POSTFIX);
}

//получить названия пунктов назначения
const getDestinationNames = (destinations, points = []) => {
  if (points.length > 0) {
    return [...new Set(points.map((point) => destinations.find((item) => point.destination === item.id)).map((item) => item.name))];
  }

  return [...new Set(destinations.map((destination) => destination.name))];
};

//получить самую ранюю дату из точек маршрута
const getMinDate = (items) => convertDate(dayjs.min(items.map((item) => dayjs(item.dateFrom))), DateFormat.DAY_MONTH);

//получить самую порзднюю дату из точек маршрута
const getMaxDate = (items) => convertDate(dayjs.max(items.map((item) => dayjs(item.dateTo))), DateFormat.DAY_MONTH);

//преобразовать строку, чтобы начиналась с заглавной буквы
const capitalize = (item) => item.charAt(0).toUpperCase() + item.substring(1);

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

//перемешать массив
function shuffle(items) {
  for (let i = items.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [items[i], items[randomIndex]] = [items[randomIndex], items[i]];
  }
  return items;
}

//изменить размер массива
function changeLengthRandom(items) {
  const max = getRandomInteger(0, items.length - 1);
  return items.slice(0, max);
}

export {
  getRandomArrayElement,
  getRandomInteger,
  convertDate,
  getDifferenceInTime,
  getDestinationNames,
  getMinDate,
  getMaxDate,
  capitalize,
  getFullPrice,
  getElementByType,
  getElementById,
  shuffle,
  changeLengthRandom
};
