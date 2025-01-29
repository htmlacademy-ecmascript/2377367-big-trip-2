import {UpdateType, UserAction, ModeType, BLANK_POINT} from '../const.js';
import {remove, render, replace, RenderPosition} from '../framework/render.js';
import {isEscape} from '../utils/common.js';
import PointView from '../view/point.js';
import EventForm from '../view/event-form.js';
import EventFormHeader from '../view/event-form-header.js';
import EventFormDetails from '../view/event-form-details.js';

//класс для взаимодействия данных и интерфейса точки маршрута
export default class PointPresenter {
  #content = null;
  #destinations = null;
  #offers = null;
  #pointListContainer = null;
  #pointComponent = null;
  #eventFormComponent = null;
  #eventFormElement = null;
  #formDetails = null;
  #formHeader = null;
  #mode = null;

  #onModeChange = () => {};
  #onDataChange = () => {};
  #onCancelButtonClick = () => {};

  constructor({container, destinations, offers, onDataChange, onModeChange, onCancelButtonClick, mode}) {
    this.#pointListContainer = container;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#onDataChange = onDataChange;
    this.#onModeChange = onModeChange;
    this.#onCancelButtonClick = onCancelButtonClick;
    this.#mode = mode;
  }

  init(content) {
    if (this.#mode === ModeType.NEW) {
      this.#content = {
        point: BLANK_POINT,
        destination: null,
        offers: null,
      };
      this.#renderEventForm();
      document.addEventListener('keydown', this.#escKeyDownHandler);
      render(this.#eventFormComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);
      return;
    }

    this.#content = content;
    const previousTripPoint = this.#pointComponent;
    const previousEventForm = this.#eventFormComponent;
    this.#renderTripPoint();
    this.#renderEventForm();

    if (previousEventForm === null || previousTripPoint === null) {
      render(this.#pointComponent, this.#pointListContainer);
    } else {
      if (this.#pointListContainer.contains(previousTripPoint.element)) {
        replace(this.#pointComponent, previousTripPoint);
      }

      if (this.#pointListContainer.contains(previousEventForm.element)) {
        replace(this.#pointComponent, previousEventForm);
      }

      remove(previousTripPoint);
      remove(previousEventForm);
    }
  }

  resetView = () => {
    if (this.#mode !== ModeType.DEFAULT) {
      this.#closeForm();
    }
  };

  destroy() {
    remove(this.#pointComponent);
    remove(this.#eventFormComponent);
  }

  setSavingMode() {
    if (this.#mode !== ModeType.DEFAULT) {
      this.#formHeader.updateElement({
        isSaving: true
      });
      this.#eventFormComponent.updateElement({
        isDisabled: true
      });
      this.#eventFormElement = this.#eventFormComponent.element.querySelector('form');
      render(this.#formHeader, this.#eventFormElement);
      render(this.#formDetails, this.#eventFormElement);
    }
  }

  setDeletingMode() {
    if (this.#mode !== ModeType.DEFAULT) {
      this.#eventFormComponent.updateElement({
        isDisabled: true
      });
      this.#eventFormElement = this.#eventFormComponent.element.querySelector('form');
      render(this.#formHeader, this.#eventFormElement);
      render(this.#formDetails, this.#eventFormElement);
      this.#formHeader.updateElement({
        isDeleting: true
      });
    }
  }

  setAborting() {
    const resetFormElement = () => {
      this.#eventFormComponent.updateElement({
        isDisabled: false
      });
      this.#eventFormElement = this.#eventFormComponent.element.querySelector('form');
      render(this.#formHeader, this.#eventFormElement);
      render(this.#formDetails, this.#eventFormElement);
      this.#formHeader.updateElement({
        isDeleting: false,
        isSaving: false
      });
    };

    if (this.#mode !== ModeType.DEFAULT) {
      this.#eventFormComponent.shake(resetFormElement);
      return;
    }

    this.#pointComponent.shake();
  }

  //отобразить точку маршрута
  #renderTripPoint() {
    this.#pointComponent = new PointView({
      point: this.#content.point,
      destination: this.#content.destination,
      offers: this.#content.offers,
      onArrowButtonClick: this.#onArrowButtonClick,
      onFavoriteClick: this.#onFavoriteClick
    });
  }

  //событие клик по кнопке открытия формы редактирования точки маршрута
  #onArrowButtonClick = () => {
    this.#replacePointToForm();
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  //закрыть форму редактирования точки маршрута
  #closeForm = () => {
    if (this.#mode === ModeType.NEW) {
      remove(this.#eventFormComponent);
      this.#onCancelButtonClick();
    } else {
      this.#replaceFormToPoint();
      this.#formHeader.resetState();
      this.#formDetails.resetState();
    }

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  //отобразить форму добавления/редактирования точки маршрута
  #renderEventForm() {
    this.#eventFormComponent = new EventForm();
    this.#eventFormElement = this.#eventFormComponent.element.querySelector('form');
    this.#formHeader = new EventFormHeader({
      point: this.#content.point,
      destinations: this.#destinations,
      onTypeChange: this.#onTypeChange,
      onDestinationChange: this.#onDestinationChange,
      onSubmit: this.#onFormSubmit,
      onButtonDeleteClick: this.#onButtonDeleteClick,
      onArrowButtonClick: this.#closeForm,
      mode: (this.#mode === ModeType.DEFAULT) ? ModeType.EDIT : this.#mode
    });

    this.#formDetails = new EventFormDetails({
      point: this.#content.point,
      offers: this.#offers,
      destination: this.#content.destination,
      onOffersChange: this.#onOffersChange
    });

    render(this.#formHeader, this.#eventFormElement);
    render(this.#formDetails, this.#eventFormElement);
  }

  //изменить форму добавления/редактирования на точку маршрута
  #replaceFormToPoint() {
    this.#mode = ModeType.DEFAULT;
    replace(this.#pointComponent, this.#eventFormComponent);
  }

  //изменить точку маршрута на форму добавления/редактирования
  #replacePointToForm() {
    this.#mode = ModeType.EDIT;
    this.#onModeChange(this.#content.point.id);
    replace(this.#eventFormComponent, this.#pointComponent);
  }

  //событие нажать кнопку esc
  #escKeyDownHandler = (event) => {
    if (isEscape(event)) {
      event.preventDefault();
      this.#closeForm();
    }
  };

  //событие клик по кнопке избранное
  #onFavoriteClick = (actionType, updateType) => {
    const newPoint = {...this.#content.point};
    newPoint.isFavorite = !this.#content.point.isFavorite;
    this.#onDataChange(actionType, updateType, newPoint);
  };

  //событие изменить тип точки маршрута
  #onTypeChange = (newType) => {
    this.#formDetails.setNewType(newType);
  };

  //событие изменить пункт назначения точки маршрута
  #onDestinationChange = (newDestination) => {
    this.#formDetails.setNewDestination(newDestination);
  };

  //событие изменить дополнительные предложения точки маршрута
  #onOffersChange = (newOffers) => {
    this.#formHeader.setNewOffers(newOffers);
  };

  //событие клик по кнопке удаления формы редактирования точки маршрута
  #onButtonDeleteClick = (point) => {
    this.#onDataChange(UserAction.DELETE_EVENT, UpdateType.MINOR, point);
  };

  //событие сохранить форму добавления/изменения точки маршрута
  #onFormSubmit = (actionType, updateType, newPoint) => {
    this.#onDataChange(actionType, updateType, newPoint);
  };
}
