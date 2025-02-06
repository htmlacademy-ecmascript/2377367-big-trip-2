import {render, remove, replace} from '../framework/render.js';
import {EmptyListMessage, InfoMessage, UpdateType, UserAction, DEFAULT_SORT, DEFAULT_FILTER, ModeType, BlockerTimeLimit} from '../const.js';
import SortListView from '../view/sort.js';
import PointListView from '../view/point-list.js';
import MessageView from '../view/message.js';
import PointPresenter from './point-presenter.js';
import {sortPoints} from '../utils/common.js';
import {filterPoints} from '../utils/date.js';
import NewEventButton from '../view/new-event-button.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

//класс для взаимодействия данных и интерфейса списка точек маршрута
export default class TripPresenter {
  #listComponent = null;
  #mainElement = document.querySelector('.trip-main');
  #listContainer = null;
  #tripModel = null;
  #filterModel = null;
  #pointPresenters = new Map();
  #currentSort = DEFAULT_SORT;
  #sortViewComponent = null;
  #infoMessageComponent = null;
  #newEventButtonComponent = null;
  #isLoading = true;
  #loadingComponent = null;
  #errorMessageComponent = null;
  #uiBlocker = null;
  #newPointPresenter = null;

  constructor({container, tripModel, filterModel}) {
    this.#listContainer = container;
    this.#tripModel = tripModel;
    this.#filterModel = filterModel;

    this.#tripModel.addObserver(this.#modelChangeHandler);
    this.#filterModel.addObserver(this.#modelChangeHandler);

    this.#uiBlocker = new UiBlocker({
      lowerLimit: BlockerTimeLimit.LOWER_LIMIT,
      upperLimit: BlockerTimeLimit.UPPER_LIMIT
    });
  }

  init() {
    this.#renderNewEventButton();
    if (this.#isLoading) {
      remove(this.#errorMessageComponent);
      this.#loadingComponent = new MessageView({text: InfoMessage.LOADING});
      render(this.#loadingComponent, this.#listContainer);
      return;
    }

    this.#renderPageMain();
  }

  //отобразить основную область страницы
  #renderPageMain() {
    const filteredPoints = filterPoints(this.#filterModel.filter, this.#tripModel.tripPoints);
    if (!filteredPoints.length) {
      remove(this.#sortViewComponent);
      this.#sortViewComponent = null;
      this.#renderEmptyPointsList();
      return;
    }

    this.#renderPointsList(filteredPoints);
  }

  //отобразить список точек маршрута
  #renderPointsList(filteredPoints) {
    this.#renderSort();

    if (!this.#listComponent) {
      this.#listComponent = new PointListView();
    }

    render(this.#listComponent, this.#listContainer);
    remove(this.#infoMessageComponent);
    this.#infoMessageComponent = null;

    if (filteredPoints) {
      this.#renderTripPoints(filteredPoints);
    }
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
    if (!this.#infoMessageComponent) {
      this.#infoMessageComponent = new MessageView({text: EmptyListMessage[this.#filterModel.filter.toUpperCase()]});
      render(this.#infoMessageComponent, this.#listContainer);
    }
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
        onPointChange: this.#onPointChange,
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

  //отобразить сообщение об ошибке
  #renderErrorMessage() {
    this.#errorMessageComponent = new MessageView({text: InfoMessage.ERROR});
    render(this.#errorMessageComponent, this.#listContainer);
  }

  //отобразить блок сортировки
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

  //обработка изменений модели данных
  #modelChangeHandler = (updateType, id) => {
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
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.init();
        break;
      case UpdateType.ERROR:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        remove(this.#sortViewComponent);
        this.#clearTripPoints();
        this.#renderErrorMessage();
        break;
    }
  };

 //событие добавление/изменение/удаление точки маршрута
 #onPointChange = async (actionType, updateType, newPoint) => {
  this.#uiBlocker.block();
  const currentPointPresenter = this.#pointPresenters.get(newPoint.id);

  switch (actionType) {
    case UserAction.ADD_EVENT:
      this.#newPointPresenter.setSavingMode();
      try {
        await this.#tripModel.addPoint(updateType, newPoint);
        this.#newPointPresenter.destroy();
        this.#newEventButtonComponent.updateElement({isDisabled: false});
      } catch (error) {
        this.#newPointPresenter.setAborting();
      }
      break;
    case UserAction.UPDATE_EVENT:
      currentPointPresenter.setSavingMode();
      try {
        await this.#tripModel.updateTripTripPoint(updateType, newPoint);
      } catch (error) {
        currentPointPresenter.setAborting();
      }
      break;
    case UserAction.DELETE_EVENT:
      currentPointPresenter.setDeletingMode();
      try {
        await this.#tripModel.deletePoint(updateType, newPoint);
      } catch (error) {
        currentPointPresenter.setAborting();
      }
      break;
  }

  this.#uiBlocker.unblock();
};

//событие изменения режима точки маршрута
#onModeChange = (id) => {
  if (this.#newPointPresenter) {
    this.#newPointPresenter.destroy();
    this.#newEventButtonComponent.updateElement({isDisabled: false});
  }

  this.#pointPresenters.forEach((pointPresenter, index) => {
    if (index !== id) {
      pointPresenter.resetView();
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
  this.#newEventButtonComponent.updateElement({isDisabled: true});

  if (this.#newPointPresenter) {
    this.#newPointPresenter.destroy();
  }

  this.#currentSort = DEFAULT_SORT;
  this.#filterModel.setFilter(UpdateType.MINOR, DEFAULT_FILTER);

  if (!this.#listComponent) {
    this.#renderPointsList();
  }

  this.#newPointPresenter = new PointPresenter({
    container: this.#listComponent.element,
    destinations: this.#tripModel.destinations,
    offers: this.#tripModel.offers,
    onPointChange: this.#onPointChange,
    onModeChange: this.#onModeChange,
    onCancelButtonClick: this.#onCancelButtonClick,
    mode: ModeType.NEW
  });

  this.#newPointPresenter.init();
};

//событие клик по кнопке отменить добавление новой точки маршрута
#onCancelButtonClick = () => {
  this.#newEventButtonComponent.updateElement({isDisabled: false});
  const filteredPoints = filterPoints(this.#filterModel.filter, this.#tripModel.tripPoints);

    if (!filteredPoints.length) {
      this.#renderPageMain();
    }
  };
}
