import requireLogin from '../../config/requireLogin.json';

export default class BaseRouter {

  constructor() {
    this.whiteList = [];
    requireLogin.map((key) => {
      this.whiteList.push(`/api${key}`);
    });
  }

  requireLogin(ctx) {
    console.log(ctx.request.body);
    if (ctx.request.body.device === 'IOS') {
      return true;
    }
    if (!ctx.session.user && !ctx.session.admin_user && this.whiteList.includes(ctx.url)) {
      console.log(`${ctx.url} is require login`);
      ctx.body = {
        code: '10000',
        err: 'requireLogin'
      }
      return false;
    }
    return true;
  }

}
