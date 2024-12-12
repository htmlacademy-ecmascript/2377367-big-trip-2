
import {DEFAULT_FILTER} from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';

//создать элемент списка фильтров
function createFilterItemTemplate(filter) {
  const {type, count} = filter;
  const isChecked = DEFAULT_FILTER === type ? 'checked' : '';
  const isDisabled = count === 0 ? 'disabled' : '';

  return (
    `<div class="trip-filters__filter">
      <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}" ${isChecked} ${isDisabled}>
      <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
    </div>`
  );
}

//создать список фильтров
function createFiltersTemplate(filters) {
  const filtersTemplate = filters.map((filter) => createFilterItemTemplate(filter)).join('');

  return (
    `<form class="trip-filters" action="#" method="get">
      ${filtersTemplate}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
}

//класс для визуального представления фильтра точек маршрута
export default class FilterListView extends AbstractView {
  #filters = [];

  constructor({filters}) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFiltersTemplate(this.#filters);
  }
}
