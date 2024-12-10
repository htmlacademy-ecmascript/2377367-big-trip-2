import TripPresenter from './presenter/trip-presenter.js';
import TripModel from './model/trip-model.js';
import InfoPresenter from './presenter/information-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';

const infoContainer = document.querySelector('.trip-main');
const filterContainer = document.querySelector('.trip-controls__filters');
const tripContainer = document.querySelector('.trip-events');

const tripModel = new TripModel();
tripModel.init();

const infoPresenter = new InfoPresenter({infoContainer, tripModel});

const filterPresenter = new FilterPresenter({filterContainer, tripModel});

const tripPresenter = new TripPresenter({tripContainer, tripModel});

infoPresenter.init();
filterPresenter.init();
tripPresenter.init();
