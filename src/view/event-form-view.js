import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

//создать блок формы создания/редактирования точки маршрута
function createEventFormTemplate({isDisabled}) {
  return (
    `<li class="trip-events__item">
        <form class="event event--edit" action="#" method="post" ${(isDisabled) ? 'disabled' : ''}></form>
    </li>`
  );
}

//класс для визуального представления формы создания/редактирования точки маршрута
export default class EventFormView extends AbstractStatefulView {

  constructor() {
    super();
    this._restoreHandlers();
    this._setState({isDisabled: false});
  }

  get template() {
    return createEventFormTemplate(this._state);
  }

  _restoreHandlers() {
    return undefined;
  }

}
