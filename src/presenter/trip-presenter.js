import {render, remove, RenderPosition, replace} from '../framework/render.js';
import {Messages, UpdateType, UserAction, DEFAULT_SORT, DEFAULT_FILTER, ModeType} from '../const.js';
import SortListView from '../view/sort.js';
import PointListView from '../view/point-list.js';
import MessageView from '../view/message.js';
import PointPresenter from './point-presenter.js';
import {sortPoints} from '../utils/common.js';
import {filterPoints} from '../utils/date.js';
import TripCost from '../view/trip-cost.js';
import TripTitle from '../view/trip-title.js';
import TripInfo from '../view/trip-information.js';
import NewEventButton from '../view/new-event-button.js';

//класс для взаимодействия данных и интерфейса списка точек маршрута
export default class TripPresenter {
  #listComponent = new PointListView();
  #tripInfoComponent = null;
  #mainElement = document.querySelector('.trip-main');
  #listContainer = null;
  #tripModel = null;
  #filterModel = null;
  #pointPresenters = new Map();
  #currentSort = DEFAULT_SORT;
  #sortViewComponent = null;
  #infoMessageComponent = null;
  #newEventButtonComponent = null;

  constructor({container, tripModel, filterModel}) {
    this.#listContainer = container;
    this.#tripModel = tripModel;
    this.#filterModel = filterModel;

    this.#tripModel.addObserver(this.#handleModelChange);
    this.#filterModel.addObserver(this.#handleModelChange);
  }

  init() {
    this.#renderPageHeader();
    this.#renderPageMain();

  }

  //отобразить шапки страницы
  #renderPageHeader() {
    this.#renderTripInfo();
    this.#renderNewEventButton();
  }

  //отобразить основную область страницы
  #renderPageMain() {
    const filteredPoints = filterPoints(this.#filterModel.filter, this.#tripModel.tripPoints);

    if (filteredPoints.length === 0) {
      remove(this.#sortViewComponent);
      this.#sortViewComponent = null;
      this.#renderEmptyPointsList();
      return;
    }

    remove(this.#infoMessageComponent);
    this.#renderSort();
    this.#renderTripPoints(filteredPoints);
    render(this.#listComponent, this.#listContainer);
  }

  //отобразить информацию о путешествии
  #renderTripInfo() {
    const previousTripInfoComponent = this.#tripInfoComponent;
    this.#tripInfoComponent = new TripInfo();

    if (previousTripInfoComponent === null) {
      render(this.#tripInfoComponent, this.#mainElement, RenderPosition.AFTERBEGIN);
    } else {
      replace(this.#tripInfoComponent, previousTripInfoComponent);
      remove(previousTripInfoComponent);
    }

    render(new TripTitle({
      points: this.#tripModel.tripPoints,
      destinations: this.#tripModel.destinations
    }), this.#tripInfoComponent.element);

    render(new TripCost({
      points: this.#tripModel.tripPoints,
      offers: this.#tripModel.offers
    }), this.#tripInfoComponent.element);

  }

  //отобразить кнопку добавить новую точку маршрута
  #renderNewEventButton() {
    if (this.#newEventButtonComponent === null) {
      this.#newEventButtonComponent = new NewEventButton({onNewEventButtonClick: this.#onNewEventButtonClick});
      render(this.#newEventButtonComponent, this.#mainElement);
    }
  }

  //отобразить компонент без точек маршрута
  #renderEmptyPointsList() {
    this.#infoMessageComponent = new MessageView({text: Messages[this.#filterModel.filter.toUpperCase()]});
    render(this.#infoMessageComponent, this.#listContainer);
  }

  //отобразить точки маршрута
  #renderTripPoints(filteredPoints) {
    sortPoints(this.#currentSort, filteredPoints);
    filteredPoints.forEach((point) => {
      const content = this.#tripModel.getContentById(point.id);
      const pointPresenter = new PointPresenter({
        container: this.#listComponent.element,
        destinations: this.#tripModel.destinations,
        offers: this.#tripModel.offers,
        onDataChange: this.#onDataChange,
        onModeChange: this.#onModeChange,
        mode: ModeType.DEFAULT
      });
      pointPresenter.init(content);
      this.#pointPresenters.set(content.point.id, pointPresenter);
    });
  }

  //очистить все точки маршрута и их презентеры
  #clearTripPoints() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  //событие добавление/изменение/удаление точки маршрута
  #onDataChange = (actionType, updateType, newPoint) => {
    switch (actionType) {
      case UserAction.ADD_EVENT:
        this.#tripModel.addPoint(updateType, newPoint);
        break;
      case UserAction.UPDATE_EVENT:
        this.#tripModel.updatePoint(updateType, newPoint);
        break;
      case UserAction.DELETE_EVENT:
        this.#tripModel.deletePoint(updateType, newPoint);
        break;
    }
  };

  //обновить представления списка точек маршрута в случае изменения модели данных
  #handleModelChange = (updateType, id) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(id).init(this.#tripModel.getContentById(id));
        break;
      case UpdateType.MINOR:
        this.#clearTripPoints();
        this.#renderPageMain();
        break;
      case UpdateType.MAJOR:
        this.#clearTripPoints();
        this.#currentSort = DEFAULT_SORT;
        this.init();
        break;
    }

  };

  //создать блок сортировки
  #renderSort = () => {
    const previousSortViewComponent = this.#sortViewComponent;
    const newSortViewComponent = new SortListView({
      onSortChange: this.#onSortChange,
      currentSort: this.#currentSort
    });

    if (previousSortViewComponent === null) {
      render(newSortViewComponent, this.#listContainer);
    } else {
      replace(newSortViewComponent, previousSortViewComponent);
      remove(previousSortViewComponent);
    }

    this.#sortViewComponent = newSortViewComponent;
  };

  //событие изменения режима точки маршрута
  #onModeChange = (id) => {
    this.#pointPresenters.forEach((tripPoint, index) => {
      if (index !== id) {
        tripPoint.resetView();
      }
    });
  };

  //событие изменение сортировки точек маршрута
  #onSortChange = (name) => {
    if (this.#currentSort !== name) {
      this.#currentSort = name;
      this.#clearTripPoints();
      this.#renderPageMain();
    }
  };

  //событие клик по кнопке создать новую точку маршрута
  #onNewEventButtonClick = () => {
    const pointPresenter = new PointPresenter({
      container: this.#listComponent.element,
      destinations: this.#tripModel.destinations,
      offers: this.#tripModel.offers,
      onDataChange: this.#onDataChange,
      onModeChange: this.#onModeChange,
      mode: ModeType.NEW,
    });

    this.#currentSort = DEFAULT_SORT;
    this.#filterModel.setFilter(UpdateType.MINOR, DEFAULT_FILTER);

    pointPresenter.init();
  };
}
