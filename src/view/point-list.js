import {createElement} from '../render.js';

//Шаблон списка для точек маршрута
function createPointListViewTemplate() {
  return '<ul class="trip-events__list"></ul>';
}

//Класс для взаимодействия со списком точек маршрута
export default class PointListView {
  getTemplate() {
    return createPointListViewTemplate();
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
