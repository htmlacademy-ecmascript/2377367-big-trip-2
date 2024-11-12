import { getDestinations } from '../mock/destinations';
import { getOffers } from '../mock/offers';
import { getRandomPoints } from '../mock/points';

export default class TripModel {
  #points = [];
  #offers = [];
  #destinations = [];

  //инициализация тестовых данных
  init() {
    this.#points = getRandomPoints();
    this.#offers = getOffers();
    this.#destinations = getDestinations();
  }

  //получить массив точек маршрута
  getPoints() {
    return this.#points;
  }

  //получить массив дополнительных предложений
  getOffers() {
    return this.#offers;
  }

  //получить массив пунктов назначения
  getDestinations() {
    return this.#destinations;
  }
}
