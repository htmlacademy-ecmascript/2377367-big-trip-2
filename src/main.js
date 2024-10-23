import PointPresenter from './presenter/point-presenter.js';
const pageHeader = document.querySelector('.page-header');
const tripMain = pageHeader.querySelector('.trip-main');
const tripControls = pageHeader.querySelector('.trip-controls__filters');
const pageMain = document.querySelector('.page-main');
const tripEvents = pageMain.querySelector('.trip-events');

const pointPresenter = new PointPresenter({
  header: tripMain,
  controls: tripControls,
  main: tripEvents
});

pointPresenter.init();
