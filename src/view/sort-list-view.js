import {SortType} from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';

//создать элемент списка сортировки точек маршрута
function createSortItemTemplate(name, isDisabled, currentSort) {
  const isChecked = (name === currentSort) ? 'checked' : '';
  isDisabled = (isDisabled) ? 'disabled' : '';

  return (
    `<div class="trip-sort__item trip-sort__item--${name}">
      <input id="sort-${name}" class="trip-sort__input visually-hidden" type="radio" name="trip-sort" value="${name}" ${isChecked} ${isDisabled}>
      <label class="trip-sort__btn" for="sort-${name}">${name}</label>
    </div>`
  );
}

//создать список сортировки точек маршрута
function createSortListTemplate(currentSort) {
  const sortTemplate = Object.values(SortType).map(({name, isDisabled}) => createSortItemTemplate(name, isDisabled, currentSort)).join('');
  return (
    `<form class="trip-events__trip-sort trip-sort" action="#" method="get">
      ${sortTemplate}
    </form>`
  );
}

//класс для визуального представления сортировки точек маршрута
export default class SortListView extends AbstractView {
  #currentSort = null;
  #onSortChange = () => {};

  constructor({onSortChange, currentSort}) {
    super();
    this.#onSortChange = onSortChange;
    this.#currentSort = currentSort;

    this.element.addEventListener('change', this.#sortChangeHandler);
  }

  get template() {
    return createSortListTemplate(this.#currentSort);
  }

  //событие изменения сортировки
  #sortChangeHandler = (event) => {
    event.preventDefault();
    if (event.target.tagName === 'INPUT') {
      this.#onSortChange(event.target.value);
    }
  };
}
