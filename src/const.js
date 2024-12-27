const POINTS_COUNT = 8;

const MILLISECONDS_IN_MINUTE = 60000;

const MILLISECONDS_IN_HOUR = MILLISECONDS_IN_MINUTE * 60;

const MILLISECONDS_IN_DAY = MILLISECONDS_IN_HOUR * 24;

const TIME_ZONE = '+03:00';

const DateFormat = {
  DAY_MONTH: 'D MMM',
  MONTH_DAY: 'MMM DD',
  TIME: 'HH:mm',
  DAY_MONTH_YEAR_TIME: 'DD/MM/YY[&nbsp;]HH:mm',
  MINUTES_WITH_POSTFIX: 'mm[M]',
  HOURS_MINUTES_WITH_POSTFIX: 'HH[H] mm[M]',
  DAY_HOURS_MINUTES_WITH_POSTFIX: 'DD[D] HH[H] mm[M]',
  DATE_PICKER: 'd/m/y H:i',
  DATE_TIME: 'YYYY-MM-DDTHH:mm',
};

const PHOTOS_SRC = 'https://loremflickr.com/248/152?random=';

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const Messages = {
  EVERYTHING: 'Click New Event to create your first point',
  PAST: 'There are no past events now',
  PRESENT: 'There are no present events now',
  FUTURE: 'There are no future events now',
};

const DEFAULT_FILTER = FilterType.EVERYTHING;

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers',
};

const DEFAULT_SORT = SortType.DAY;

const POINTS_TYPE = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const COUNT_DESTINATIONS_NAMES = 3;

const Mode = {
  DEFAULT: 'default',
  EDITING: 'editing',
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
  Mode,
};
