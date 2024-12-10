import {render} from '../framework/render.js';
import FilterListView from '../view/filter.js';
import {FiltersType} from '../const';

//класс для взаимодействия данных и интерфейса фильтра точек маршрута
export default class FilterPresenter {
  #filterContainer = null;
  #filters = Object.entries(FiltersType).map(([type]) => ({type}));

  constructor({filterContainer}) {
    this.#filterContainer = filterContainer;
  }

  init() {
    render(new FilterListView({filters: this.#filters}), this.#filterContainer);
  }
}
