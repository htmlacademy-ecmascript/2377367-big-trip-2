import {render, replace, remove} from '../framework/render.js';
import FilterListView from '../view/filter.js';
import {FilterType, UpdateType} from '../const';
import {filterPoints} from '../utils/date.js';

//класс для взаимодействия данных и интерфейса фильтра точек маршрута
export default class FilterPresenter {
  #container = null;
  #tripModel = null;
  #filterModel = null;
  #filterComponent = null;

  constructor({container, filterModel, tripModel}) {
    this.#container = container;
    this.#tripModel = tripModel;
    this.#filterModel = filterModel;

    this.#tripModel.addObserver(this.#modelChangeHandler);
    this.#filterModel.addObserver(this.#modelChangeHandler);
  }

  get filters() {
    return Object.values(FilterType).map((name) => ({
      name: name,
      count: (this.#tripModel.tripPoints) ? filterPoints(name, this.#tripModel.tripPoints).length : 0,
      isChecked: name === this.#filterModel.filter
    }));
  }

  init() {
    const previousFilterComponent = this.#filterComponent;
    const newFilterComponent = new FilterListView({filters: this.filters, onFilterChange: this.#onFilterChange});

    if (previousFilterComponent === null) {
      render(newFilterComponent, this.#container);
    } else {
      replace(newFilterComponent, previousFilterComponent);
      remove(previousFilterComponent);
    }

    this.#filterComponent = newFilterComponent;
  }

  //обработка изменений модели данных
  #modelChangeHandler = () => {
    this.init();
  };

  //событие изменение фильтра точек маршрута
  #onFilterChange = (filterType) => {
    if (this.#filterModel.filter !== filterType) {
      this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
    }
  };
}
