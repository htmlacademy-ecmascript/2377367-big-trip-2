import {RenderPosition, render} from '../framework/render.js';
import InfoView from '../view/information.js';

///класс для взаимодействия данных и интерфейса информации о маршруте
export default class InfoPresenter {
  #infoContainer = null;
  #tripModel = null;

  constructor({infoContainer, tripModel}) {
    this.#infoContainer = infoContainer;
    this.#tripModel = tripModel;
  }

  init() {
    render(new InfoView({
      points: this.#tripModel.points,
      offers: this.#tripModel.offers,
      destinations: this.#tripModel.destinations,
    }), this.#infoContainer, RenderPosition.AFTERBEGIN);
  }
}


