
import AbstractView from '../framework/view/abstract-view.js';

//создать блок формы создания/редактирования точки маршрута
function createEventFormTemplate() {
  return (
    `<li class="trip-events__item">
        <form class="event event--edit" action="#" method="post"></form>
    </li>`
  );
}

//класс для визуального представления формы создания/редактирования точки маршрута
export default class EventForm extends AbstractView {
  #onFormSubmit = null;

  constructor({onFormSubmit}) {
    super();
    this.#onFormSubmit = onFormSubmit;
    this.element.querySelector('.event--edit').addEventListener('submit', this.#eventFormSubmitHandler);
  }

  get template() {
    return createEventFormTemplate();
  }

  //событие закрыть форму
  #eventFormSubmitHandler = (event) => {
    event.preventDefault();
  };
}
