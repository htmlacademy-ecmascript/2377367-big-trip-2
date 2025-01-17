import AbstractView from '../framework/view/abstract-view.js';

//создать кнопку добавления новой точки маршрута
function createButtonTemplate() {
  return '<button class="trip-main__event-add-btn btn btn--big btn--yellow" type="button">New event</button>';
}

//класс для визуального представления кнопки добавления новой точки маршрута
export default class NewEventButton extends AbstractView {
  #onNewEventButtonClick = () => {};

  constructor({onNewEventButtonClick}) {
    super();
    this.#onNewEventButtonClick = onNewEventButtonClick;
    this.element.addEventListener('click', this.#newEventButtonClickHandler);
  }

  get template() {
    return createButtonTemplate();
  }

  //событие открыть форму добавления новой точки маршрута
  #newEventButtonClickHandler = (event) => {
    event.preventDefault();
    this.#onNewEventButtonClick();
  };
}
