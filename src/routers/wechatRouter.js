import { wechatAuth } from '../../auth';
import { appid, redirect_uri } from '../../security.json';
import { ParseMessage, EventHandler } from '../../util/wechat'


function wechatRouter(router) {

  const eventHandler = new EventHandler(global.MQ);
  const parseMessage = new ParseMessage();

  router.get('/', (ctx, next) => {
    const echostr = ctx.query.echostr;
    if (wechatAuth(ctx)) {
      console.log('wechat join success!');
      ctx.body = echostr;
    } else {
      console.log('invalid request');
      ctx.body = 'invalid request';
    }
  })

  router.post('/security', async (ctx, next) => {
    const data = await parseMessage.convertPost(ctx.req);
    const res = await parseMessage.parseXml(data);
    eventHandler.msgHandler(res.xml, ctx);
  })

}

export default wechatRouter;
