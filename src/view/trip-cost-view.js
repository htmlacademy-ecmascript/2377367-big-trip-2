import AbstractView from '../framework/view/abstract-view.js';

//создать блок общей стоимости путешествия
function createTotalCostTemplate(cost) {
  return `<p class="trip-info__cost">Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span></p>`;
}

//класс для визуального представления общей стоимости путешествия
export default class TripCostView extends AbstractView {
  #cost = null;

  constructor(cost) {
    super();
    this.#cost = cost;
  }

  get template() {
    return createTotalCostTemplate(this.#cost);
  }
}
