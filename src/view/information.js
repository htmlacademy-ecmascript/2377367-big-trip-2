import AbstractView from '../framework/view/abstract-view.js';
import {getDestinationNames, getFullPrice} from '../utils/common.js';
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

//создать блок с общей информацией о маршруте
function createInfoTemplate(points, offers, destinations) {
  return (
    `<section class="trip-main__trip-info  trip-info">
        <div class="trip-info__main">
          <h1 class="trip-info__title">${createTitle(points, destinations)}</h1>

          <p class="trip-info__dates">${getMinDate(points)}&nbsp;&mdash;&nbsp;${getMaxDate(points)}</p>
        </div>

        <p class="trip-info__cost">
          Total: &euro;&nbsp;<span class="trip-info__cost-value">${getFullPrice(points, offers)}</span>
        </p>
      </section>`
  );
}

//класс для визуального представления информации о маршруте
export default class InfoView extends AbstractView {
  #points = [];
  #offers = [];
  #destinations = [];

  constructor({points, offers, destinations}) {
    super();
    this.#points = points;
    this.#offers = offers;
    this.#destinations = destinations;
  }

  get template() {
    return createInfoTemplate(this.#points, this.#offers, this.#destinations);
  }
}
