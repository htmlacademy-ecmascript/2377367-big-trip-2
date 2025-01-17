const POINTS_COUNT = 8;

const MILLISECONDS_IN_MINUTE = 60000;

const MILLISECONDS_IN_HOUR = MILLISECONDS_IN_MINUTE * 60;

const MILLISECONDS_IN_DAY = MILLISECONDS_IN_HOUR * 24;

const TIME_ZONE = '+03:00';

const DateFormat = {
  DAY_MONTH: 'D MMM',
  MONTH_DAY: 'MMM DD',
  TIME: 'HH:mm',
  DAY_MONTH_YEAR_TIME: 'DD/MM/YY HH:mm',
  MINUTES_WITH_POSTFIX: 'mm[M]',
  HOURS_MINUTES_WITH_POSTFIX: 'HH[H] mm[M]',
  DAY_HOURS_MINUTES_WITH_POSTFIX: 'DD[D] HH[H] mm[M]',
  DATE_PICKER: 'd/m/y H:i',
  DATE_TIME: 'YYYY-MM-DDTHH:mm',
};

const PHOTOS_SRC = 'https://loremflickr.com/248/152?random=';

const FilterType = {
  EVERYTHING: 'EVERYTHING',
  FUTURE: 'FUTURE',
  PRESENT: 'PRESENT',
  PAST: 'PAST',
};

const Messages = {
  EVERYTHING: 'Click New Event to create your first point',
  PAST: 'There are no past events now',
  PRESENT: 'There are no present events now',
  FUTURE: 'There are no future events now',
};

const DEFAULT_FILTER = FilterType.EVERYTHING;

const SortType = {
  DAY: {name: 'day', isDisabled: false},
  EVENT: {name: 'event', isDisabled: true},
  TIME: {name: 'time', isDisabled: false},
  PRICE: {name: 'price', isDisabled: false},
  OFFER: {name: 'offer', isDisabled: true}
};

const DEFAULT_SORT = SortType.DAY.name;

const POINTS_TYPE = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];

const COUNT_DESTINATIONS_NAMES = 3;

const ModeType = {
  DEFAULT: 'DEFAULT',
  EDIT: 'EDIT',
  NEW: 'NEW',
};

const UserAction = {
  UPDATE_EVENT: 'UPDATE_EVENT',
  ADD_EVENT: 'ADD_EVENT',
  DELETE_EVENT: 'DELETE_EVENT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

const BLANK_POINT = {
  'id': 0,
  'type': POINTS_TYPE[5].toLowerCase(),
  'destination': '',
  'dateFrom': '',
  'dateTo': '',
  'basePrice': 0,
  'offers': [],
  'isFavorite': false,
};

const CONFIG_DATE_PICKER = {
  enableTime: true,
  'time_24hr': true,
  dateFormat: DateFormat.DATE_PICKER,
};

export {
  POINTS_COUNT,
  MILLISECONDS_IN_MINUTE,
  MILLISECONDS_IN_HOUR,
  MILLISECONDS_IN_DAY,
  TIME_ZONE,
  DateFormat,
  PHOTOS_SRC,
  FilterType,
  DEFAULT_FILTER,
  SortType,
  DEFAULT_SORT,
  POINTS_TYPE,
  COUNT_DESTINATIONS_NAMES,
  Messages,
  ModeType,
  UserAction,
  UpdateType,
  BLANK_POINT,
  CONFIG_DATE_PICKER,
};
