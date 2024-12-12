import {render} from '../framework/render.js';
import FilterListView from '../view/filter.js';
import {generateFilter} from '../utils/filter.js';

//класс для взаимодействия данных и интерфейса фильтра точек маршрута
export default class FilterPresenter {
  #filterContainer = null;
  #filters = [];

  constructor({filterContainer, points}) {
    this.#filterContainer = filterContainer;
    this.#filters = generateFilter(points);
  }

  init() {
    render(new FilterListView({filters: this.#filters}), this.#filterContainer);
  }
}
