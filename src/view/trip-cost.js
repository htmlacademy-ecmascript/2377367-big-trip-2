import AbstractView from '../framework/view/abstract-view.js';
import {getFullPrice} from '../utils/common.js';

//создать блок общей стоимости путешествия
function createTotalCostTemplate(points, offers) {
  return `<p class="trip-info__cost">Total: &euro;&nbsp;<span class="trip-info__cost-value">${getFullPrice(points, offers)}</span></p>`;
}

//класс для визуального представления общей стоимости путешествия
export default class TripCost extends AbstractView {
  #points = [];
  #offers = [];

  constructor({points, offers}) {
    super();
    this.#points = points;
    this.#offers = offers;
  }

  get template() {
    return createTotalCostTemplate(this.#points, this.#offers);
  }
}
