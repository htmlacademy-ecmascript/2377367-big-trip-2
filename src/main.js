import TripModel from './model/trip-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import TripPresenter from './presenter/trip-presenter.js';
import TripApiService from './service/trip-api-service.js';
import {AUTHORIZATION_STRING, BASE_URL} from './const.js';
import HeaderPresenter from './presenter/header-presenter.js';

const filterContainer = document.querySelector('.trip-controls__filters');
const tripContainer = document.querySelector('.trip-events');
const headerContainer = document.querySelector('.trip-main');

const tripApiService = new TripApiService(BASE_URL, AUTHORIZATION_STRING);
const tripModel = new TripModel({apiService: tripApiService});
const filterModel = new FilterModel();

new HeaderPresenter({headerContainer, tripModel});
const filterPresenter = new FilterPresenter({container: filterContainer, filterModel, tripModel});
const tripPresenter = new TripPresenter({container: tripContainer, tripModel, filterModel, headerContainer});

tripModel.init();
filterPresenter.init();
tripPresenter.init();
