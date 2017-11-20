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
      const res = await server.send(content);
      return res;
    }

    /**
     * [saveWechatUser 保存微信用户]
     * @method saveWechatUser
     * @param  {[type]}       body [description]
     * @return {Promise}           [description]
     */
    async saveWechatUser(body) {
      const content = {
        class: 'user',
        func: 'saveWechatUser',
        content: body
      };
      const server = this.initServer(this.server);
      const res = await server.send(content);
    }

    /**
     * [unsubscribe 取消关注]
     * @method unsubscribe
     * @param  {[type]}    body [description]
     * @return {Promise}        [description]
     */
    async unsubscribe(body) {
      const content = {
        class: 'user',
        func: 'unsubscribe',
        content: body
      };
      const server = this.initServer(this.server);
      const res = await server.send(content);
    }

}
