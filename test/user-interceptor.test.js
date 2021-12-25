'use strict';

const mock = require('egg-mock');

describe('test/user-interceptor.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/user-interceptor-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, userInterceptor')
      .expect(200);
  });
  it('should GET /customer', () => {
    return app.httpRequest()
      .get('/customer?customerId=1234')
      .expect({ code: 403, message: '没有登录' })
      .expect(200);
  });
  it('should GET /login', () => {
    app.mockCsrf(); // mock添加csrftoken
    return app.httpRequest()
      .post('/login')
      .send({
        id: 'mayue',
      })
      .expect('登录成功mayue')
      .expect(200);
  });
  it('should GET /customer', () => {
    app.mockContext({ // mock添加session
      userId: 'mayue',
    });
    return app.httpRequest()
      .get('/customer?customerId=1234')
      .expect('hi, 1234')
      .expect(200);
  });
  it('should GET /customer', () => {
    app.mockContext({
      userId: 'liuxuewei',
    });
    return app.httpRequest()
      .get('/customer?customerId=1234')
      .expect({ code: 403, message: '没有权限访问该客户' })
      .expect(200);
  });
});
