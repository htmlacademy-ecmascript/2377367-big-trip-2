import {render, RenderPosition} from '../render';
import InfoView from '../view/information';
import FilterView from '../view/filter';
import SortView from '../view/sort';
import PointListView from '../view/point-list';
import PointView from '../view/point';
// import AddPointView from '../view/add-point';
import EditPointView from '../view/edit-point';

export default class TripPresenter {
  pointListView = new PointListView();
  sortListView = new SortView();
  filterListView = new FilterView();

  constructor({infoContainer, filterContainer, tripContainer, tripModel}) {
    this.infoContainer = infoContainer;
    this.filterContainer = filterContainer;
    this.tripContainer = tripContainer;
    this.tripModel = tripModel;
  }

  init() {

    const points = this.tripModel.getPoints();
    const offers = this.tripModel.getOffers();
    const destinations = this.tripModel.getDestinations();
    this.tripPoint = [...points];

    render(new InfoView({
      points: points,
      offers: offers,
      destinations: destinations,
    }), this.infoContainer, RenderPosition.AFTERBEGIN);

    render(this.filterListView, this.filterContainer);
    render(this.sortListView, this.tripContainer);
    render(this.pointListView, this.tripContainer);

    render(new EditPointView({
      point: this.tripPoint[0],
      offers: offers,
      destinations: destinations
    }), this.pointListView.getElement());

    for (let i = 1; i < this.tripPoint.length; i++) {
      render(new PointView({
        point: this.tripPoint[i],
        offers: offers,
        destinations: destinations
      }), this.pointListView.getElement());
    }
  }
}
