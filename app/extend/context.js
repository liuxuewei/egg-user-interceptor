'use strict';

module.exports = {
  get user() {
    const user = this.session;
    // const userId = this.userId;
    // const user = await ctx.service.usersService.queryUserInfoById(userId);
    return user;
  },

  get userId() {
    const userId = this.session.userId || null;
    return userId;
  },

  get checkHasCustomerPermission() {
    return async (ctx, customerId) => {
      customerId = customerId || ctx.query.customerId;
      if (!customerId) { // 访问非客户信息
        return true;
      }
      const customer = {
        id: customerId,
        creatorId: 'mayue',
      };
      const hasLevelPermission = ctx.userId && (ctx.userId === 'admin' || `${customer.creatorId}` === `${ctx.userId}`);
      console.log('checkHasCustomerPermission, customerId: ' + customerId + ' userId: ' + ctx.userId);
      if (!hasLevelPermission) {
        return false;
      }
      return true;
    };
  },
};
