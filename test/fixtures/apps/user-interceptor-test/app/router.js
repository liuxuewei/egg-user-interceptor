'use strict';

module.exports = app => {
  const { router, controller } = app;

  router.get('/', controller.home.index);
  router.post('/login', controller.home.login);
  router.get('/customer', controller.home.customer);
};
