import AbstractView from '../framework/view/abstract-view.js';

//создать блок системного сообщения
function createSystemMessageTemplate(text) {
  return `<p class="trip-events__msg">${text}</p>`;
}

//класс для визуального представления системного сообщения о путешествии
export default class MessageView extends AbstractView {
  #text = null;

  constructor({text}) {
    super();
    this.#text = text;
  }

  get template() {
    return createSystemMessageTemplate(this.#text);
  }
}
