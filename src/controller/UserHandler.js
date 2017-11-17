import BaseHandler from './BaseHandler';

/**
 * CartHandler create by burning0xb
 */
export default class UserHandler extends BaseHandler {
    constructor(server) {
      super();
      this.server = server;
    }


    async getUserList(ctx) {
      const body = ctx.request.body;
      return { code: '0000' };
    }

}
