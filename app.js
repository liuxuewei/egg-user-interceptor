/* eslint-disable no-empty-function */
'use strict';

class AppBootHook {

  constructor(app) {
    this.app = app;
  }

  async configDidLoad() {
    // 此时 config 文件已经被读取并合并，但是还并未生效
    // 这是应用层修改配置的最后时机
    // 注意：此函数只支持同步调用

    const sessionIdx = this.app.config.coreMiddleware.indexOf('session');
    this.app.config.coreMiddleware.splice(sessionIdx + 1, 0, 'userInterceptor');
    this.app.logger.info('after userInterceptor app.config.middleware', this.app.config.middleware);
    this.app.logger.info('after userInterceptor app.config.coreMiddlewares', this.app.config.coreMiddlewares);
  }

  async didLoad() {
    const userInterceptor = this.app.config.userInterceptor;
    this.app.logger.info('userInterceptor init config', userInterceptor);
  }

  async willReady() {
    // 所有的插件都已启动完毕，但是应用整体还未 ready
    // 可以做一些数据初始化等操作，这些操作成功才会启动应用
  }

  async didReady() {
  }

  async serverDidReady() {
  }
}
module.exports = AppBootHook;
