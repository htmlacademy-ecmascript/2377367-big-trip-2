import ApiService from '../framework/api-service.js';
import {ApiMethod} from '../const.js';

//класс для взаимодействия с сервером через api
export default class TripApiService extends ApiService {

  get tripPoints() {
    return this._load({url: 'points'}).then(ApiService.parseResponse);
  }

  get destinations() {
    return this._load({url: 'destinations'}).then(ApiService.parseResponse);
  }

  get offers() {
    return this._load({url: 'offers'}).then(ApiService.parseResponse);
  }

  //обновить точку маршрута
  async updatePoint(point) {
    const response = await this._load({
      url: `points/${point.id}`,
      method: ApiMethod.PUT,
      body: JSON.stringify(this.#adaptPointToServer(point)),
      headers: new Headers({'content-type': 'application/json'})
    });
    return await ApiService.parseResponse(response);
  }

  //добавить точку маршрута
  async addPoint(point) {
    const response = await this._load({
      url: 'points',
      method: ApiMethod.POST,
      body: JSON.stringify(this.#adaptPointToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'})
    });
    return await ApiService.parseResponse(response);
  }

  //удалить точку маршрута
  async deletePoint(point) {
    return await this._load({
      url: `points/${point.id}`,
      method: ApiMethod.DELETE
    });
  }

  //преобразование формата точки маршрута для сервера
  #adaptPointToServer(point) {
    const newPoint = {
      ...point,
      'base_price': parseInt(point.basePrice, 10),
      'date_to': point.dateTo,
      'date_from': point.dateFrom,
      'is_favorite': point.isFavorite
    };

    delete newPoint.basePrice;
    delete newPoint.dateTo;
    delete newPoint.dateFrom;
    delete newPoint.isFavorite;

    return newPoint;
  }
}
