import {render} from '../framework/render.js';
import {DEFAULT_SORT, Messages, SortType} from '../const.js';
import SortListView from '../view/sort.js';
import PointListView from '../view/point-list.js';
import MessageView from '../view/message.js';
import PointPresenter from './point-presenter.js';
import {sortByPrice, updateItem} from '../utils/common.js';
import {sortByTime} from '../utils/date.js';

//класс для взаимодействия данных и интерфейса списка точек маршрута
export default class TripPresenter {
  #points = [];
  #originalPoints = [];
  #offers = [];
  #destinations = [];

  #tripContainer = null;
  #tripModel = null;
  #systemMessageComponent = null;

  #pointListComponent = new PointListView();
  #pointPresenters = new Map();
  #currentSortType = DEFAULT_SORT;

  constructor({tripContainer, tripModel}) {
    this.#tripContainer = tripContainer;
    this.#tripModel = tripModel;
  }

  init() {
    this.#points = [...this.#tripModel.points];
    this.#originalPoints = [...this.#tripModel.points];
    this.#offers = [...this.#tripModel.offers];
    this.#destinations = [...this.#tripModel.destinations];

    this.#renderTrip();
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#pointListComponent.element,
      onPointChange: this.#pointChangeHandle,
      onModeChange: this.#modeChangeHandle,
      offers: this.#offers,
      destinations: this.#destinations
    });

    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #pointChangeHandle = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#originalPoints = updateItem(this.#originalPoints, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #modeChangeHandle = () => {
    this.#pointPresenters.forEach((pointPresenter) => pointPresenter.reset());
  };

  #sortPoints(type) {
    switch (type) {
      case SortType.TIME:
        this.#points.sort(sortByTime);
        break;
      case SortType.PRICE:
        this.#points.sort(sortByPrice);
        break;
      default:
        this.#points = [...this.#originalPoints];
    }

    this.#currentSortType = type;
  }

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #sortTypeChangeHandle = (type) => {
    if (this.#currentSortType === type) {
      return;
    }

    this.#sortPoints(type);
    this.#clearPointList();
    this.#renderPointsList();
  };

  #renderSystemMessage({text}) {
    this.#systemMessageComponent = new MessageView({text});
    render(this.#systemMessageComponent, this.#tripContainer);
  }

  #renderPointsList() {
    render(this.#pointListComponent, this.#tripContainer);

    this.#points.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #renderTrip() {
    if (this.#points.length === 0) {
      this.#renderSystemMessage({text: Messages.EVERYTHING});
      return;
    }

    render(new SortListView({onSortTypeChange: this.#sortTypeChangeHandle}), this.#tripContainer);
    this.#renderPointsList();
  }
}
