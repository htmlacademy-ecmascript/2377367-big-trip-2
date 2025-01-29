import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

//создать кнопку добавления новой точки маршрута
function createButtonTemplate({isDisabled}) {
  return `<button class="trip-main__event-add-btn btn btn--big btn--yellow" type="button" ${(isDisabled) ? 'disabled' : ''}>New event</button>`;
}

//класс для визуального представления кнопки добавления новой точки маршрута
export default class NewEventButton extends AbstractStatefulView {
  #onNewEventButtonClick = () => {};

  constructor({onNewEventButtonClick}) {
    super();
    this.#onNewEventButtonClick = onNewEventButtonClick;
    this._setState({isDisabled: false});
    this._restoreHandlers();
  }

  get template() {
    return createButtonTemplate(this._state);
  }

  _restoreHandlers() {
    this.element.addEventListener('click', this.#newEventButtonClickHandler);
  }

  //событие открыть форму добавления новой точки маршрута
  #newEventButtonClickHandler = (event) => {
    event.preventDefault();
    this.#onNewEventButtonClick();
  };
}
