import { DEFAULT_FILTER, FILTERS_TYPE } from '../const.js';
import {createElement} from '../render.js';

//создать элемент списка фильтров
function createFilterItemTemplate(type) {
  const isChecked = DEFAULT_FILTER === type ? 'checked' : '';

  return (
    `<div class="trip-filters__filter">
      <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}" ${isChecked}>
      <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
    </div>`
  );
}

//создать список фильтров
function createFilterListTemplate() {
  return (
    `<form class="trip-filters" action="#" method="get">
      ${FILTERS_TYPE.map((type) => createFilterItemTemplate(type)).join('')}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
}

//класс для взаимодействия с фильтром точек маршрута
export default class FilterView {
  getTemplate() {
    return createFilterListTemplate();
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
