import {getDestinations} from '../mock/destinations';
import {getOffers} from '../mock/offers';
import {getRandomPoints} from '../mock/points';

//класс работы с данными
export default class TripModel {
  #points = [];
  #offers = [];
  #destinations = [];


  get points() {
    return this.#points;
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }

  init() {
    this.#points = getRandomPoints();
    this.#offers = getOffers();
    this.#destinations = getDestinations();
  }
}
