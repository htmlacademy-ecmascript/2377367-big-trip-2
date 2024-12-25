import {SortType, DEFAULT_SORT} from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';

//создать элемент списка сортировки точек маршрута
function createSortItemTemplate(type) {
  const isChecked = DEFAULT_SORT === type ? 'checked' : '';
  const isDisabled = type === SortType.EVENT || type === SortType.OFFERS ? 'disabled' : '';

  return (
    `<div class="trip-sort__item  trip-sort__item--${type}">
      <input id="sort-${type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="${type}" ${isChecked} ${isDisabled}>
      <label class="trip-sort__btn" for="sort-${type}">${type}</label>
    </div>`
  );
}

//создать список сортировки точек маршрута
function createSortListTemplate() {
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${Object.values(SortType).map((item) => createSortItemTemplate(item)).join('')}
    </form>`
  );
}

//класс для визуального представления сортировки точек маршрута
export default class SortListView extends AbstractView {
  #onSortTypeChange = () => {};

  constructor({onSortTypeChange}) {
    super();

    this.#onSortTypeChange = onSortTypeChange;

    this.element.addEventListener('change', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortListTemplate();
  }

  #sortTypeChangeHandler = (event) => {
    event.preventDefault();
    this.#onSortTypeChange(event.target.value);
  };
}
