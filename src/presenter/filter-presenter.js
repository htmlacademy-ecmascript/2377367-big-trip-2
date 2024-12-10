import {render} from '../framework/render.js';
import FilterListView from '../view/filter.js';
import {generateFilter} from '../utils/filter';

//класс для взаимодействия данных и интерфейса фильтра точек маршрута
export default class FilterPresenter {
  #filterContainer = null;
  #tripModel = null;
  #filters = [];

  constructor({filterContainer, tripModel}) {
    this.#filterContainer = filterContainer;
    this.#tripModel = tripModel;
    this.#filters = generateFilter(tripModel.points);
  }

  init() {
    render(new FilterListView({filters: this.#filters}), this.#filterContainer);
  }
}
