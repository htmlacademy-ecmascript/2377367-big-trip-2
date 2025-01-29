
import TripCost from '../view/trip-cost.js';
import TripTitle from '../view/trip-title.js';
import TripInfo from '../view/trip-information.js';
import {render, remove, replace, RenderPosition} from '../framework/render.js';
import {DEFAULT_SORT, UpdateType} from '../const.js';
import {sortPoints} from '../utils/common.js';

export default class HeaderPresenter {
  #headerContainer = null;
  #tripModel = null;
  #tripInfoComponent = null;
  #destinations = null;
  #offers = null;

  constructor({headerContainer, tripModel}) {
    this.#headerContainer = headerContainer;
    this.#tripModel = tripModel;
    this.#tripModel.addObserver(this.#modelChangeHandler);
  }

  //обработка изменений данных в шапке сайта
  #modelChangeHandler = (updateType) => {
    if (updateType !== UpdateType.ERROR) {
      this.#renderHeader();
    }
  };

  //отобразить шапку сайта
  #renderHeader() {
    this.#destinations = this.#tripModel.destinations;
    this.#offers = this.#tripModel.offers;
    const points = this.#tripModel.tripPoints;

    if (points.length > 0) {
      sortPoints(DEFAULT_SORT, points);
      const destinations = this.#getTripTitleData(points);
      const dates = this.#getFirstLastDates(points);
      const previousTripInfoComponent = this.#tripInfoComponent;
      const newTripInfoComponent = new TripInfo();

      if (previousTripInfoComponent === null) {
        render(newTripInfoComponent, this.#headerContainer, RenderPosition.AFTERBEGIN);
      } else {
        replace(newTripInfoComponent, previousTripInfoComponent);
        remove(previousTripInfoComponent);
      }

      render(new TripTitle({destinations, dates}), newTripInfoComponent.element);
      render(new TripCost(this.#calculateTotalPrice(points)), newTripInfoComponent.element);
      this.#tripInfoComponent = newTripInfoComponent;
      return;
    }

    remove(this.#tripInfoComponent);
    this.#tripInfoComponent = null;
  }

  //получить данные о путешествии для шапки
  #getTripTitleData(points) {
    const destinationsId = points.map(({destination}) => destination);
    const destinationsCount = new Set(destinationsId);
    const firstDestinationId = destinationsId[0];
    const secondDestinationId = (destinationsCount.size === 3) ? destinationsId[1] : null;
    const lastDestinationId = destinationsId[destinationsId.length - 1];

    return {
      firstDestination: this.#destinations.find((destination) => destination.id === firstDestinationId).name,
      secondDestination: (secondDestinationId) ? this.#destinations.find((destination) => destination.id === secondDestinationId).name : null,
      lastDestination: this.#destinations.find((destination) => destination.id === lastDestinationId).name,
      destinationsCount: destinationsCount.size
    };
  }

  //получить первую и последнюю дату путешествия
  #getFirstLastDates(points) {
    return {
      firstDate: points[0].dateFrom,
      lastDate: points[points.length - 1].dateTo
    };
  }

  //подсчитать общую стоимость путешествия
  #calculateTotalPrice(points) {
    return points.reduce((sum, point) => {
      sum += point.basePrice + this.#calculateOffersPrice(point.offers, point.type);
      return sum;
    }, 0);
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
}
