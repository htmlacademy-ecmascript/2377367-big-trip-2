import {RenderPosition, render} from '../framework/render';
import InfoView from '../view/information';

///класс для взаимодействия данных и интерфейса информациии о маршруте
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


