
import AbstractView from '../framework/view/abstract-view.js';
import {getDestinationNames} from '../utils/common.js';
import {getMaxDate, getMinDate} from '../utils/date.js';
import {COUNT_DESTINATIONS_NAMES} from '../const.js';

//создать заголовок из списка пунктов назначения
function createTitle(points, destinations) {
  const filterPointsByNames = getDestinationNames(destinations, points);

  if (filterPointsByNames.length > COUNT_DESTINATIONS_NAMES) {
    return `${filterPointsByNames.at(0)} &mdash;...&mdash; ${filterPointsByNames.at(-1)}`;
  }

  return filterPointsByNames.join(' &mdash; ');
}

//создать блок заголовка путешествия
function createTripTitleTemplate(points, destinations) {
  return (
    `<div class="trip-info__main">
      <h1 class="trip-info__title">${createTitle(points, destinations)}</h1>
      <p class="trip-info__dates">${getMinDate(points)}&nbsp;&mdash;&nbsp;${getMaxDate(points)}</p>
    </div>`
  );
}

//класс для визуального представления заголовка путешествия
export default class TripTitle extends AbstractView {
  #points = [];
  #destinations = [];

  constructor({points, destinations}) {
    super();
    this.#points = points;
    this.#destinations = destinations;
  }

  get template() {
    return createTripTitleTemplate(this.#points, this.#destinations);
  }
}
