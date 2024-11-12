import TripPresenter from './presenter/trip-presenter.js';
import TripModel from './model/trip-model.js';

const infoContainer = document.querySelector('.trip-main');
const filterContainer = document.querySelector('.trip-controls__filters');
const tripContainer = document.querySelector('.trip-events');

const tripModel = new TripModel();

tripModel.init();

const tripPresenter = new TripPresenter({
  infoContainer: infoContainer,
  filterContainer: filterContainer,
  tripContainer: tripContainer,
  tripModel
});

tripPresenter.init();
