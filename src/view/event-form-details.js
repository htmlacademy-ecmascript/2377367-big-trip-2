import {BLANK_POINT} from '../const.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

//создать элемент списка дополнительных предложений
function createOffersItemTemplate(selectedOffers, offer) {
  const {id, title, price} = offer;
  const isChecked = (selectedOffers.some((offerId) => offerId === id)) ? 'checked' : '';

  return (
    `<div class="event__offer-selector">
    <input class="event__offer-checkbox visually-hidden" value="${id}" id="event-offer-${id}" type="checkbox" name="event-offer-luggage" ${isChecked}>
    <label class="event__offer-label" for="event-offer-${id}">
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </label>
  </div>`
  );
}

//создать блок со списком дополнительных предложений
function createOffersListTemplate(selectedOffers, offers) {
  if (offers.length === 0) {
    return '';
  }

  return (
    `<section class="event__section event__section--offers">
      <h3 class="event__section-title event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${offers.map((offer) => createOffersItemTemplate(selectedOffers, offer)).join('')}
      </div>
    </section>`
  );
}

//создать изображение пункт назначения
function createPicture(pictures) {
  if (pictures.length === 0) {
    return '';
  }

  return (
    `<div class="event__photos-container">
      <div class="event__photos-tape">
        ${pictures.map(({src, description}) => `<img class="event__photo" src="${src}" alt="${description}">`).join('')}
      </div>
    </div>`
  );
}

//создать блок пункта назначения
function createDestination(destination) {
  if (!destination || (!destination.description && destination.pictures.length === 0)) {
    return '';
  }

  return (
    `<section class="event__section event__section--destination">
      <h3 class="event__section-title event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${destination.description}</p>
      ${createPicture(destination.pictures)}
    </section>`
  );
}

//создать блок с основным содержанием формы добавления/редактирования точки маршрута
function createEventFormDetailsTemplate(point, offers, destination) {
  const offersPoint = offers.find((item) => item.type === point.type.toLowerCase()).offers;

  return (
    `<section class="event__details">
      ${createOffersListTemplate(point.offers, offersPoint)}
      ${createDestination(destination)}
    </section>`
  );
}

//класс для визуального представления основного содержания формы добавления/редактирования точки маршрута
export default class EventFormDetails extends AbstractStatefulView {
  #point = null;
  #offers = null;
  #destination = null;
  #onOffersChange = () => {};

  constructor({point = BLANK_POINT, offers, destination, onOffersChange}) {
    super();
    this.#point = point;
    this.#offers = offers;
    this.#destination = destination;
    this.#onOffersChange = onOffersChange;
    this._setState({point, destination});
    this._restoreHandlers();
  }

  get template() {
    return createEventFormDetailsTemplate(this._state.point, this.#offers, this._state.destination);
  }

  _restoreHandlers() {
    if (!this.#isOffersEmpty()) {
      this.element.querySelector('.event__section--offers').addEventListener('change', this.#offersChangeHandler);
    }
  }

  //вернуть исходное состояние
  reset() {
    this.updateElement({point: this.#point, destination: this.#destination});
  }

  //установить новый тип точки маршрута
  setNewType = (newType) => {
    const newPoint = {...this._state.point};
    newPoint.type = newType;
    newPoint.offers = [];
    this.updateElement({point: newPoint});
  };

  //установить новый пункт назначения
  setNewDestination = (newDestination) => {
    this.updateElement({destination: newDestination});
  };

  //если кол-во дополнительных предложений пусто
  #isOffersEmpty() {
    const currentOffers = this.#offers.find((item) => item.type === this._state.point.type.toLowerCase());
    return currentOffers.offers.length === 0;
  }

  //событие изменить выбор дополнительных предложений
  #offersChangeHandler = (event) => {
    if (event.target.tagName === 'INPUT') {
      const newPoint = {...this._state.point};
      if (event.target.checked) {
        newPoint.offers.push(event.target.value);
      } else {
        newPoint.offers = newPoint.offers.filter((item) => item !== event.target.value);
      }
      this._setState({point: newPoint});
      this.#onOffersChange(newPoint.offers);
    }
  };
}
