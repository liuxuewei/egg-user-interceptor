'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hi, ' + this.app.plugins.userInterceptor.name;
  }
  async login() {
    const { ctx } = this;
    const params = ctx.request.body;
    if (params.id) {
      ctx.session.userId = params.id;
    }
    ctx.body = `登录成功${params.id}`;
  }
  async customer() {
    this.ctx.body = 'hi, ' + this.ctx.query.customerId;
  }
}

module.exports = HomeController;
