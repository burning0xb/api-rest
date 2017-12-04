import BaseHandler from './BaseHandler';

/**
 * CartHandler create by burning0xb
 */
export default class UserHandler extends BaseHandler {
    constructor(server) {
      super();
      this.server = server;
    }

    /**
     * [getUserList description]
     * @param  {[type]}  ctx [description]
     * @return {Promise}     [description]
     */
    async getUserList(ctx) {
      const body = ctx.request.body;
      const content = {
        class: 'user',
        func: 'getUserList',
        content: {}
      };
      const server = this.initServer(this.server);
      const res1 = await server.send(content);
      // return res1;


      const content2 = {
        class: 'common',
        func: 'getOrderList',
        content: {}
      };
      const server2 = this.initServer(this.server);
      const res2 = await server2.send(content2, 'order');

      return { res1, res2 };
    }

}
