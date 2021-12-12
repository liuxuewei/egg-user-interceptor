'use strict';
const is = require('is-type-of');
const checkInWhiteList = (path, whiteListConfig) => {
  whiteListConfig = whiteListConfig || [];
  let inWhiteList = false;
  for (const whiteListItem of whiteListConfig) {
    if (is.string(whiteListItem)) {
      inWhiteList = path === whiteListItem;
    } else if (is.regExp(whiteListItem)) {
      inWhiteList = whiteListItem.test(path);
    }
    if (inWhiteList) {
      break;
    }
  }
  return inWhiteList;
};

module.exports = (config, app) => {
  return async (ctx, next) => {
    ctx.logger.info('[user interceptor] ', ctx.host);
    const userInterceptorConifg = app.config.userInterceptor || {};
    const whiteList = userInterceptorConifg.whiteList || [];
    const isInWhiteList = checkInWhiteList(ctx.path, whiteList);
    console.log(config, 'whiteList', whiteList, isInWhiteList);

    const userId = ctx.userId || null;
    ctx.logger.info('ctx.user is', userId);
    if (!userId) {
      if (isInWhiteList) {
        ctx.logger.info('visit don‘t need login whiteList url');
        return await next();
      }
      ctx.body = {
        code: 403,
        message: '没有登录',
      };
      return;
    }
    const permission = await ctx.checkHasCustomerPermission(ctx);
    console.log('checkHasCustomerPermission', permission);
    if (!permission) {
      ctx.body = {
        code: 403,
        message: '没有权限访问该客户',
      };
      return;
    }

    await next();
  };
};
