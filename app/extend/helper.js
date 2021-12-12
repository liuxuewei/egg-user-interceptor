'use strict';

const moment = require('moment');

module.exports = {
  json(obj) {
    return JSON.stringify(obj);
  },
  time(value, format) {
    return value ? moment(value).format(format || 'YYYY-MM-DD HH:mm:ss') : moment().format(format || 'YYYY-MM-DD HH:mm:ss');
  },
  date(value, format) {
    return value ? moment(value).format(format || 'YYYY-MM-DD') : moment().format(format || 'YYYY-MM-DD');
  },
};
