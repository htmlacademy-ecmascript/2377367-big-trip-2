import TripCost from '../view/trip-cost.js';
import TripTitle from '../view/trip-title.js';
import TripInfo from '../view/trip-information.js';
import {remove, render, RenderPosition, replace} from '../framework/render.js';
import {DEFAULT_SORT, UpdateType, COUNT_DESTINATIONS_NAMES} from '../const.js';
import {sortPoints} from '../utils/common.js';

export default class HeaderPresenter {
  #headerContainer = null;
  #tripModel = null;
  #tripInfoComponent = null;
  #destinations = null;
  #offers = null;
  #points = null;

  constructor({headerContainer, tripModel}) {
    this.#headerContainer = headerContainer;
    this.#tripModel = tripModel;
    this.#tripModel.addObserver(this.#modelChangeHandler);
  }

  //отобразить шапку сайта
  #renderHeader() {
    this.#destinations = this.#tripModel.destinations;
    this.#offers = this.#tripModel.offers;
    this.#points = this.#tripModel.tripPoints;

    if (this.#points.length) {
      sortPoints(DEFAULT_SORT, this.#points);
      const destinations = this.#getTripTitleInfo();
      const dates = this.#getFirstLastDates();
      const previousTripInfoComponent = this.#tripInfoComponent;
      const newTripInfoComponent = new TripInfo();

      if (!previousTripInfoComponent) {
        render(newTripInfoComponent, this.#headerContainer, RenderPosition.AFTERBEGIN);
      } else {
        replace(newTripInfoComponent, previousTripInfoComponent);
        remove(previousTripInfoComponent);
      }

      render(new TripTitle({destinations, dates}), newTripInfoComponent.element);
      render(new TripCost(this.#calculateTotalPrice()), newTripInfoComponent.element);
      this.#tripInfoComponent = newTripInfoComponent;
      return;
    }

    remove(this.#tripInfoComponent);
    this.#tripInfoComponent = null;
  }

  //получить данные о путешествии для шапки
  #getTripTitleInfo() {
    const destinationsId = this.#points.map(({destination}) => destination);

    const destinationsName = destinationsId.map((id) => {
      const {name} = this.#destinations.find((destination) => destination.id === id);
      return name;
    });

    const uniqueDestinationsName = destinationsName.filter((name, index) => index === 0 || destinationsName[index - 1] !== name);
    const destinationsCount = uniqueDestinationsName.length;

    return {
      firstDestination: uniqueDestinationsName[0],
      secondDestination: (destinationsCount === COUNT_DESTINATIONS_NAMES) ? uniqueDestinationsName[1] : null,
      lastDestination: uniqueDestinationsName[destinationsCount - 1],
      destinationsCount: destinationsCount
    };
  }

  //получить первую и последнюю дату путешествия
  #getFirstLastDates() {
    return {
      firstDate: this.#points[0].dateFrom,
      lastDate: this.#points[this.#points.length - 1].dateTo
    };
  }

  //подсчитать общую стоимость путешествия
  #calculateTotalPrice() {
    return this.#points.reduce((sum, point) => sum + point.basePrice + this.#calculateOffersPrice(point.offers, point.type), 0);
  }

  //подсчитать стоимость дополнительных предложений
  #calculateOffersPrice(selectedOffers, type) {
    const offers = this.#offers.find((item) => item.type === type).offers;
    return offers.reduce((sum, item) => {
      const {id, price} = item;
      if (selectedOffers.includes(id)) {
        sum += price;
      }
      return sum;
    }, 0);
  }

  //обработка изменений модели данных в шапке сайта
  #modelChangeHandler = (updateType) => {
    if (updateType !== UpdateType.ERROR) {
      this.#renderHeader();
    }
  };
}
