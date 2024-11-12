
import {createElement} from '../render.js';

//создать список точек маршрута
function createPointListTemplate() {
  return '<ul class="trip-events__list"></ul>';
}

//класс для взаимодействия со списком точек маршрута
export default class PointListView {
  getTemplate() {
    return createPointListTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
