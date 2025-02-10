import AbstractView from '../framework/view/abstract-view.js';
import {convertDate} from '../utils/date.js';
import {DateFormat} from '../const.js';

//преобразовать названия пунктов назначения
const getInfoDestinations = ({firstDestination, secondDestination, lastDestination, destinationsCount}) => {
  switch (destinationsCount) {
    case 1:
      lastDestination = '';
      secondDestination = '';
      break;
    case 2:
      secondDestination = '&mdash;';
      break;
    case 3:
      secondDestination = `&mdash; ${secondDestination} &mdash;`;
      break;
    default:
      secondDestination = '&mdash; ... &mdash;';
      break;
  }

  return `${firstDestination} ${secondDestination} ${lastDestination}`;
};

//получить начальную и конечные даты путешествия
const getInfoDates = ({firstDate, lastDate}) => {
  const dateFormat = DateFormat.MONTH_DAY.split(' ').reverse().join(' ');
  return `${convertDate(firstDate, dateFormat)} &mdash; ${convertDate(lastDate, dateFormat)}`;
};

//создать блок заголовка путешествия
function createTripTitleTemplate(destinations, dates) {
  return (
    `<div class="trip-info__main">
      <h1 class="trip-info__title">${getInfoDestinations(destinations)}</h1>
      <p class="trip-info__dates">${getInfoDates(dates)}</p>
    </div>`
  );
}

//класс для визуального представления заголовка путешествия
export default class TripTitleView extends AbstractView {
  #destinations = null;
  #dates = null;

  constructor({destinations, dates}) {
    super();
    this.#destinations = destinations;
    this.#dates = dates;
  }

  get template() {
    return createTripTitleTemplate(this.#destinations, this.#dates);
  }
}
