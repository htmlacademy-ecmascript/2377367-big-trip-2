import {render, RenderPosition} from '../render';
import InfoView from '../view/information';
import FilterView from '../view/filter';
import SortView from '../view/sort';
import PointListView from '../view/point-list';
import PointView from '../view/point';
import FormAddView from '../view/form-add';
import FormEditView from '../view/form-edit';

const COUNT_POINTS = 3;

export default class PointPresenter {
  pointListComponent = new PointListView();

  constructor({header, controls, main}) {
    this.header = header;
    this.controls = controls;
    this.main = main;
  }

  //инициализация презентера
  init() {
    render(new InfoView(), this.header, RenderPosition.AFTERBEGIN);
    render(new FilterView(), this.controls);
    render(new SortView(), this.main);
    render(this.pointListComponent, this.main);
    render(new FormEditView(), this.pointListComponent.getElement());

    for (let i = 0; i < COUNT_POINTS; i++) {
      render(new PointView(), this.pointListComponent.getElement());
    }

    render(new FormAddView(), this.pointListComponent.getElement());
  }
}
