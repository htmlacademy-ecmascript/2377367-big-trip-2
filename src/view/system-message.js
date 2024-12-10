import {SystemMessages} from '../const';
import AbstractView from '../framework/view/abstract-view';

//создать элемент системного сообщения
function createSystemMessageTemplate(filterType) {
  const message = SystemMessages[filterType];
  return `<p class="trip-events__msg">${message}</p>`;
}

//класс для визуального представления системного сообщения о путешествии
export default class SystemMessageView extends AbstractView {
  #filterType = null;

  constructor({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createSystemMessageTemplate(this.#filterType);
  }
}
