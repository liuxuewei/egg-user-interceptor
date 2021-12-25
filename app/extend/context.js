'use strict';
const queryCustomerById = customerId => {
  return { // mock数据
    customerId,
    contactId: 'mayue',
  };
};
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
      const customerInfo = queryCustomerById(customerId);
      // 当前登录人是管理员，或者是该客户的关联联系人才有权限
      const hasLevelPermission = ctx.userId &&
      (ctx.userId === 'admin' || `${ctx.userId}` === `${customerInfo.contactId}`);
      console.log('checkHasCustomerPermission, customerId: ' + customerId + ' userId: ' + ctx.userId);
      if (!hasLevelPermission) {
        return false;
      }
      return true;
    };
  },
};
