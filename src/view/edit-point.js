import {DateFormat, POINTS_TYPE} from '../const.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {capitalize, getElementById, getElementByType} from '../utils/common.js';
import {convertDate} from '../utils/date.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

//создать элемент списка для типов точек маршрута
function createTypeTemplate(type, checkedType, id) {
  const isChecked = checkedType === type ? 'checked' : '';

  return (
    `<div class="event__type-item">
      <input id="event-type-${type}-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${isChecked}>
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-${id}">${capitalize(type)}</label>
    </div>`
  );
}

//создать элемент для списка дополнительных предложений
function createOfferTemplate(offer, checkedOffersId) {
  const {id, title, price} = offer;
  const isChecked = checkedOffersId.has(id) ? 'checked' : '';

  return (
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id=${id} type="checkbox" name=${id} ${isChecked}>
      <label class="event__offer-label" for=${id}>
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>`
  );
}

//создать блок для списка дополнительных предложений
function createOfferListTemplate({offers}, checkedOffersId) {
  if (offers.length !== 0) {
    return (
      `<section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
          ${offers.map((offer) => createOfferTemplate(offer, checkedOffersId)).join('')}
        </div>
      </section>`
    );
  }

  return '';
}

//создать список фотографий для описания точки маршрута
function createPhotoContainerTemplate(pictures) {
  if (pictures.length > 0) {
    return (
      `<div class="event__photos-container">
        <div class="event__photos-tape">
          ${pictures.map(({src, description}) => `<img class="event__photo" src=${src} alt=${description}>`).join('')}
        </div>
      </div>`
    );
  }

  return '';
}

//создать блок с описанием точки маршрута
function createDestinationTemplate(destination) {
  const {description, pictures} = destination || {};

  if (description.length > 0 || pictures.length > 0) {
    return (
      `<section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${description}</p>

        ${createPhotoContainerTemplate(pictures)}
      </section>`
    );
  }

  return '';
}

//создать форму редактирования точек маршрута
function createEditPointTemplate(point, offers, destinations) {
  const {id, type, dateFrom, dateTo, basePrice, offers: checkedOffersId, destination: pointDestination} = point;
  const filteredOfferByType = getElementByType(offers, type);
  const filteredDestinationById = getElementById(destinations, pointDestination);
  const {name} = filteredDestinationById;

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${POINTS_TYPE.map((item) => createTypeTemplate(item, type, id)).join('')}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-${id}">
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value='${name}' list="destination-list-${id}">
            <datalist id="destination-list-${id}">
              ${destinations.map((item) => `<option value=${item.name}></option>`)}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-${id}">From</label>
            <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value=${convertDate(dateFrom, DateFormat.DAY_MONTH_YEAR_TIME)}>
            &mdash;
            <label class="visually-hidden" for="event-end-time-${id}">To</label>
            <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value=${convertDate(dateTo, DateFormat.DAY_MONTH_YEAR_TIME)}>
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-${id}">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" value=${basePrice}>
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          ${createOfferListTemplate(filteredOfferByType, checkedOffersId)}
          ${createDestinationTemplate(filteredDestinationById)}
        </section>
      </form>
    </li>`
  );
}

//класс для визуального представления формой редактирования точек маршрута
export default class PointEditView extends AbstractStatefulView {
  #offers = [];
  #destinations = [];
  #datePickerFrom = null;
  #datePickerTo = null;

  #onFormSubmit = () => {};
  #onButtonRollupClick = () => {};

  #configDatePicker = {
    enableTime: true,
    'time_24hr': true,
    dateFormat: DateFormat.DATE_PICKER
  };

  constructor({point, offers, destinations, onFormSubmit, onButtonRollupClick}) {
    super();
    this.#offers = offers;
    this.#destinations = destinations;
    this.#onFormSubmit = onFormSubmit;
    this.#onButtonRollupClick = onButtonRollupClick;

    this._setState(PointEditView.parsePointToState(point));
    this._restoreHandlers();

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#buttonRollupClickHandler);
    this.element.querySelector('.event--edit').addEventListener('submit', this.#formSubmitHandler);
  }

  get template() {
    return createEditPointTemplate(this._state, this.#offers, this.#destinations);
  }

  reset(point) {
    this.updateElement(PointEditView.parsePointToState(point));
  }

  removeElement() {
    super.removeElement();

    if (this.#datePickerFrom) {
      this.#datePickerFrom.destroy();
      this.#datePickerFrom = null;
    }

    if (this.#datePickerTo) {
      this.#datePickerTo.destroy();
      this.#datePickerTo = null;
    }
  }

  _restoreHandlers() {
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#buttonRollupClickHandler);
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__available-offers')?.addEventListener('change', this.#offerChangeHandler);
    this.element.querySelector('.event__field-group--price').addEventListener('input', this.#priceChangeHandler);

    this.#setDatePickerFrom();
    this.#setDatePickerTo();
  }

  #formSubmitHandler = (event) => {
    event.preventDefault();
    this.#onFormSubmit(PointEditView.parseStateToPoint(this._state));
  };

  #buttonRollupClickHandler = (event) => {
    event.preventDefault();
    this.#onButtonRollupClick();
  };

  #typeChangeHandler = (event) => {
    event.preventDefault();

    this.updateElement({
      type: event.target.value
    });
  };

  #destinationChangeHandler = (event) => {
    this.updateElement({
      destination: this.#destinations.find((destination) => destination.name === event.target.value).id,
    });
  };

  #offerChangeHandler = (event) => {
    const offers = this._state.offers;
    const offerId = event.target.name;

    if (offers.has(offerId)) {
      offers.delete(offerId);
    } else {
      offers.add(offerId);
    }

    this._setState({offers: offers});
  };

  #priceChangeHandler = (event) => {
    event.preventDefault();

    this._setState({
      basePrice: event.target.value,
    });
  };

  #setDatePickerFrom() {
    if (this._state.dateFrom) {
      this.#datePickerFrom = flatpickr(
        this.element.querySelector('input[name="event-start-time"]'),
        {
          ...this.#configDatePicker,
          defaultDate: this._state.dateFrom,
          maxDate: this._state.dateTo,
          onChange: this.#dateFromChangeHandler,
        },
      );
    }
  }

  #dateFromChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate.toISOString(),
    });
  };

  #setDatePickerTo() {
    if (this._state.dateTo) {
      this.#datePickerTo = flatpickr(
        this.element.querySelector('input[name="event-end-time"]'),
        {
          ...this.#configDatePicker,
          defaultDate: this._state.dateTo,
          minDate: this._state.dateFrom,
          onChange: this.#dateToChangeHandler,
        },
      );
    }
  }

  #dateToChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate.toISOString(),
    });
  };

  static parsePointToState(point) {
    const state = {...point};

    state.offers = new Set(state.offers);

    return state;
  }

  static parseStateToPoint(state) {
    const point = {...state};

    point.offers = Array.from(point.offers);

    return point;
  }
}
