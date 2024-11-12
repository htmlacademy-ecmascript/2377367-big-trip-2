const POINTS_COUNT = 8;

const MILLISECONDS_IN_MINUTE = 60000;

const MILLISECONDS_IN_HOUR = MILLISECONDS_IN_MINUTE * 60;

const MILLISECONDS_IN_DAY = MILLISECONDS_IN_HOUR * 24;

const DateFormat = {
  DAY_MONTH: 'D MMM',
  MONTH_DAY: 'MMM DD',
  HOUR_MINUTES: 'HH:mm',
  DAY_MONTH_YEAR_TIME: 'DD/MM/YY[&nbsp;]HH:mm',
  MINUTES_WITH_POSTFIX: 'mm[M]',
  HOUR_MINUTES_WITH_POSTFIX: 'HH[H] mm[M]',
  DAY_HOUR_MINUTES_WITH_POSTFIX: 'DD[D] HH[H] mm[M]'
};

const FILTERS_TYPE = ['everything', 'future', 'present', 'past'];

const DEFAULT_FILTER = FILTERS_TYPE[0];

const SORT_TYPE = ['day', 'event', 'time', 'price', 'offers'];

const DEFAULT_SORT = SORT_TYPE[0];

const POINTS_TYPE = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const COUNT_DESTINATIONS_NAMES = 3;

export {
  POINTS_COUNT,
  MILLISECONDS_IN_MINUTE,
  MILLISECONDS_IN_HOUR,
  MILLISECONDS_IN_DAY,
  DateFormat,
  FILTERS_TYPE,
  DEFAULT_FILTER,
  SORT_TYPE,
  DEFAULT_SORT,
  POINTS_TYPE,
  COUNT_DESTINATIONS_NAMES
};
