import {updateItem} from '../utils/common.js';
import Observable from '../framework/observable.js';
import {getDestinations} from '../mock/destinations.js';
import {getOffers} from '../mock/offers.js';
import {getRandomPoints} from '../mock/points.js';

//класс для представления данных о путешествии
export default class TripModel extends Observable {
  #tripPoints = getRandomPoints();
  #offers = getOffers();
  #destinations = getDestinations();

  get tripPoints() {
    return this.#tripPoints;
  }

  set tripPoints(points) {
    this.#tripPoints = [...points];
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

  //получить данные о точке маршрута по её идентификатору
  getContentById(id) {
    const point = this.#tripPoints.find((item) => item.id === id);
    const destination = this.#destinations.find((item) => item.id === point.destination);
    const offers = this.#offers.find((item) => item.type === point.type.toLocaleLowerCase());
    return {
      point: point ?? {},
      destination: destination ?? {},
      offers: offers.offers ?? {}
    };
  }

  //обновить точку маршрута
  updatePoint(updateType, updatedPoint) {
    this.#tripPoints = updateItem(this.#tripPoints, updatedPoint);
    this._notify(updateType, updatedPoint.id);
  }

  //добавить точку маршрута
  addPoint(updateType, newPoint) {
    this.#tripPoints.push(newPoint);
    this._notify(updateType);
  }

  //удалить точку маршрута
  deletePoint(updateType, point) {
    this.#tripPoints = this.#tripPoints.filter((item) => item.id !== point.id);
    this._notify(updateType);
  }
}
