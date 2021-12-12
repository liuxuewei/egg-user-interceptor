'use strict';

/**
 * egg-user-interceptor default config
 * @member Config#userInterceptor
 * @property {String} SOME_KEY - some description
 */
exports.userInterceptor = {
  whiteList: [ '/', /\/login/i, /\/public/ ],
};
