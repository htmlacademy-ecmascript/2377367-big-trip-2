
import { Mode } from '../const.js';
import { remove, render, replace } from '../framework/render.js';
import { isEscape } from '../utils/common.js';
import PointEditView from '../view/edit-point.js';
import PointView from '../view/point.js';

export default class PointPresenter {
  #pointListContainer = null;
  #pointComponent = null;
  #pointEditComponent = null;

  #pointChangeHandle = () => {};
  #modeChangeHandle = () => {};

  #point = null;
  #offers = [];
  #destinations = [];
  #mode = Mode.DEFAULT;

  constructor({pointListContainer, onPointChange, onModeChange, offers, destinations}) {
    this.#pointListContainer = pointListContainer;
    this.#pointChangeHandle = onPointChange;
    this.#modeChangeHandle = onModeChange;
    this.#offers = offers;
    this.#destinations = destinations;
  }

  init (point) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new PointView({
      point: this.#point,
      offers: this.#offers,
      destinations: this.#destinations,
      onFavoriteClick: this.#onFavoriteClick,
      onEditClick: this.#onEditClick,
    });

    this.#pointEditComponent = new PointEditView({
      point: this.#point,
      offers: this.#offers,
      destinations: this.#destinations,
      onButtonRollupClick: this.#hidePointEdit,
      onFormSubmit: this.#onFormSubmit,
    });

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#pointListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
      return;
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointEditComponent, prevPointEditComponent);
      return;
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  reset() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToPoint();
    }
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  #replacePointToForm() {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#modeChangeHandle();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToPoint() {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #escKeyDownHandler = (event) => {
    if (isEscape(event)) {
      event.preventDefault();
      this.#replaceFormToPoint();
    }
  };

  #onFormSubmit = (point) => {
    this.#pointChangeHandle(point);
    this.#replaceFormToPoint();
  };

  #hidePointEdit = () => {
    this.#replaceFormToPoint();
  };

  #onEditClick = () => {
    this.#replacePointToForm();
  };

  #onFavoriteClick = () => {
    this.#pointChangeHandle({...this.#point, isFavorite: !this.#point.isFavorite});
  };
}
