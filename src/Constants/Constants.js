const NO_MARKERS_IN_AREA = 'No markers in area';

const REQUEST_RESPONSES = {
  SUCCESS: 'SUCCESS',
  FAIL: 'FAIL',
  NO_RESPONSE: 'Не удалось получить ответ от сервера. Попробуйте ещё раз',
  UNABLE_TO_PROCESS: 'Не удалось обработать запрос',
};

const VALIDATION_ERRORS = {
  NO_PRICE: 'Не указана цена',
  NO_TITLE: 'Не указан заголовок',
  NO_LOCATION: 'Не указано расположение',
  NO_ADDRESS: 'Не указан адрес',
  SHORT_PRICE: 'Слишком низкая цена',
  SHORT_TITLE: 'Минимальная длина заголовка: 4 символа',
  SHORT_ADDRESS: 'Минимальная длина адреса: 4 символа',
  LONG_PRICE: 'Слишком большая цена',
  LONG_TITLE: 'Максимальная длина заголовка: 100 символов',
  LONG_ADDRESS: 'Максимальная длина адреса: 100 символов',
};

module.exports = {
  REQUEST_RESPONSES,
  NO_MARKERS_IN_AREA,
  VALIDATION_ERRORS,
};
