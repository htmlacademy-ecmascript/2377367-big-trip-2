import TripModel from './model/trip-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import TripPresenter from './presenter/trip-presenter.js';

const filterContainer = document.querySelector('.trip-controls__filters');
const tripContainer = document.querySelector('.trip-events');

const tripModel = new TripModel();
const filterModel = new FilterModel();

const filterPresenter = new FilterPresenter({container: filterContainer, filterModel, tripModel});
const tripPresenter = new TripPresenter({container: tripContainer, tripModel, filterModel});

filterPresenter.init();
tripPresenter.init();
