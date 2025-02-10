import AbstractView from '../framework/view/abstract-view.js';

//создать блок общей информации о путешествии
function createTripInfoTemplate() {
  return '<section class="trip-main__trip-info trip-info"></section>';
}

//класс для визуального представления общей информации о путешествии
export default class TripInfoView extends AbstractView {

  get template() {
    return createTripInfoTemplate();
  }
}
