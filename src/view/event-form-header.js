import he from 'he';
import {BLANK_POINT, DateFormat, ModeType, POINTS_TYPE, UpdateType, UserAction, CONFIG_DATE_PICKER} from '../const.js';
import {convertDate} from '../utils/date.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const getUpdateType = (point, state) => {
  if (point.dateTo === state.dateTo && point.dateFrom === state.dateFrom && point.basePrice === state.basePrice) {
    return UpdateType.PATCH;
  }
  return UpdateType.MINOR;
};

//создать элемент списка у типа точки маршрута
function createPointTypeTemplate(item) {
  const {type, id} = item;
  const isChecked = (type === item) ? 'checked' : '';
  const itemLower = item.toLowerCase();

  return (
    `<div class="event__type-item">
      <input id="event-type-${itemLower}-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${item}" ${isChecked}>
      <label class="event__type-label  event__type-label--${itemLower}" for="event-type-${itemLower}-${id}">${item}</label>
    </div>`
  );
}

//создать кнопки в форме добавления/редактирования точки маршрута
function createButtonsTemplate(mode, isDeleting) {
  if (mode === ModeType.EDIT) {
    return (
      `<button class="event__reset-btn" type="reset">${(isDeleting) ? 'Deleting...' : 'Delete'}</button>
      <button class="event__rollup-btn" type="button"><span class="visually-hidden">Open event</span></button>`
    );
  }

  return '<button class="event__reset-btn" type="reset">Cancel</button>';
}

//создать блок заголовка формы добавления/редактирования точки маршрута
function createEventFormHeaderTemplate (point, destinations, mode){
  const {id, type, dateFrom, dateTo, basePrice, isSaving, isDeleting} = point;
  const destinationValue = destinations.filter((item) => item.id === point.destination)[0]?.name ?? '';

  return (`
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type event__type-btn" for="event-type-toggle-${id}">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle visually-hidden" id="event-type-toggle-${id}" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${POINTS_TYPE.map((item) => createPointTypeTemplate(item)).join('')}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group event__field-group--destination">
        <label class="event__label event__type-output" for="event-destination-${id}">
        ${type}
        </label>
        <input class="event__input event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${destinationValue}" list="destination-list-${id}">
        <datalist id="destination-list-${id}">
            ${destinations.map(({name}) => `<option value=${name}></option>`).join('')}
        </datalist>
      </div>

    <div class="event__field-group event__field-group--time">
      <label class="visually-hidden" for="event-start-time-${id}">From</label>
      <input class="event__input event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${convertDate(dateFrom, DateFormat.DAY_MONTH_YEAR_TIME)}">
      &mdash;
      <label class="visually-hidden" for="event-end-time-${id}">To</label>
      <input class="event__input event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${convertDate(dateTo, DateFormat.DAY_MONTH_YEAR_TIME)}">
    </div>

    <div class="event__field-group event__field-group--price">
      <label class="event__label" for="event-price-${id}">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input event__input--price" id="event-price-${id}" type="text" name="event-price" value="${he.encode(basePrice.toString())}">
    </div>

    <button class="event__save-btn btn btn--blue" type="submit">${(isSaving) ? 'Saving...' : 'Save'}</button>
      ${createButtonsTemplate(mode, isDeleting)}
    </header>`
  );
}

//класс для визуального представления заголовка формы добавления/редактирования точки маршрута
export default class EventFormHeader extends AbstractStatefulView {
  #point = null;
  #destinations = null;
  #mode = null;
  #datePickerFrom = null;
  #datePickerTo = null;

  #onArrowButtonClick = () => {};
  #onTypeChange = () => {};
  #onDestinationChange = () => {};
  #onButtonDeleteClick = () => {};
  #onSubmit = () => {};

  constructor({point = BLANK_POINT, destinations = [], mode, onTypeChange, onDestinationChange, onSubmit, onButtonDeleteClick, onArrowButtonClick}) {
    super();
    this.#point = point;
    this.#destinations = destinations;
    this.#mode = mode;
    this._setState({
      ...point,
      isSaving: false,
      isDeleting: false
    });
    this.#onTypeChange = onTypeChange;
    this.#onDestinationChange = onDestinationChange;
    this.#onSubmit = onSubmit;
    this.#onButtonDeleteClick = onButtonDeleteClick;
    this.#onArrowButtonClick = onArrowButtonClick;
    this._setState(point);
    this._restoreHandlers();
  }

  get template() {
    return createEventFormHeaderTemplate(this._state, this.#destinations, this.#mode);
  }

  _restoreHandlers() {
    this.element.querySelector('.event__type-group').addEventListener('change', this.#pointTypeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__save-btn').addEventListener('click', this.#buttonSaveClickHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceChangeHandler);

    if (this.#mode === ModeType.EDIT) {
      this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#buttonResetClickHandler);
      this.element.querySelector('.event__reset-btn').addEventListener('click', this.#buttonDeleteClickHandler);
    } else {
      this.element.querySelector('.event__reset-btn').addEventListener('click', this.#buttonResetClickHandler);
    }

    this.#setDatePickerFrom();
    this.#setDatePickerTo();
  }

  //вернуть исходное состояние
  reset() {
    this.updateElement(this.#point);
  }

  //установить новые дополнительные предложения
  setNewOffers(newOffers) {
    this._setState({offers: newOffers});
  }

  //установить дату и время начала точки маршрута
  #setDatePickerFrom() {
    this.#datePickerFrom = flatpickr(
      this.element.querySelector('.event__input--time[name="event-start-time"]'),
      {
        ...CONFIG_DATE_PICKER,
        defaultDate: this._state.dateFrom,
        maxDate: this._state.dateTo,
        onChange: this.#dateFromChangeHandler,
      },
    );
  }

  //установить дату и время окончания точки маршрута
  #setDatePickerTo() {
    this.#datePickerTo = flatpickr(
      this.element.querySelector('.event__input--time[name="event-end-time"]'),
      {
        ...CONFIG_DATE_PICKER,
        defaultDate: this._state.dateTo,
        minDate: this._state.dateFrom,
        onChange: this.#dateToChangeHandler,
      },
    );
  }

  //событие изменение даты и время начала точки маршрута
  #dateFromChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate.toISOString(),
    });
  };

  //событие изменение даты и время окончания точки маршрута
  #dateToChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate.toISOString(),
    });
  };

  //изменить тип точки маршрута
  #pointTypeChangeHandler = (event) => {
    event.preventDefault();
    if (event.target.tagName === 'INPUT') {
      this.updateElement({type: event.target.value.toLowerCase()});
      this.#onTypeChange(event.target.value);
    }
  };

  //событие изменение пункта назначения точки маршрута
  #destinationChangeHandler = (event) => {
    event.preventDefault();
    if (event.target.tagName === 'INPUT') {
      const newDestination = this.#destinations.find((destination) => destination.name === event.target.value);
      if (newDestination) {
        this.updateElement({destination: newDestination.id});
        this.#onDestinationChange(newDestination);
      }
    }
  };

  //событие изменение стоимости
  #priceChangeHandler = (event) => {
    event.preventDefault();
    this._setState({basePrice: event.target.value});
  };

  //событие клик по кнопке сохранить
  #buttonSaveClickHandler = (event) => {
    event.preventDefault();
    const actionType = (this.#mode === ModeType.EDIT) ? UserAction.UPDATE_EVENT : UserAction.ADD_EVENT;
    const updateType = getUpdateType(this.#point, this._state);
    delete this._state.isDeleting;
    delete this._state.isSaving;
    this.#onSubmit(actionType, updateType, this._state);
  };

  //событие клик по кнопке закрыть
  #buttonResetClickHandler = (event) => {
    event.preventDefault();
    this.#onArrowButtonClick();
  };

  //событие клик по кнопке удалить
  #buttonDeleteClickHandler = (event) => {
    event.preventDefault();
    this.#onButtonDeleteClick(this._state);
  };
}
