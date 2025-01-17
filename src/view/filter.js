import AbstractView from '../framework/view/abstract-view.js';

//создать элемент списка фильтров
function createFilterItemTemplate({name, count, isChecked}) {
  isChecked = (isChecked === true) ? 'checked' : '';
  const isDisabled = (count === 0) ? 'disabled' : '';

  return (
    `<div class="trip-filters__filter">
      <input id="filter-${name}" class="trip-filters__filter-input visually-hidden" type="radio" name="trip-filter" value="${name}" ${isChecked} ${isDisabled}>
      <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
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
  #filters = null;
  #onFilterChange = () => {};

  constructor({filters, onFilterChange}) {
    super();
    this.#filters = filters;
    this.#onFilterChange = onFilterChange;
    this.element.addEventListener('change', this.#filterChangeHandler);
  }

  get template() {
    return createFiltersTemplate(this.#filters);
  }

  //событие изменение фильтра
  #filterChangeHandler = (event) => {
    event.preventDefault();

    if (event.target.tagName === 'INPUT') {
      this.#onFilterChange(event.target.value);
    }
  };
}
