import { SUBSCRIBE, UNSUBSCRIBE, SCAN, LOCATION, CLICK, VIEW, TEXT } from './constant';
import { Message } from '../../wechat/reply';
import { UserHandler } from '../../src/controller';
import moment from 'moment';

const message = new Message();

export default class EventHandler {

  constructor(MQ) {
    this.userHandler = new UserHandler(MQ);
  }

  async msgHandler(xml, ctx) {
    const event = xml.Event ? xml.Event[0] : '';
    const msgType = xml.MsgType ? xml.MsgType[0] : '';
    let eventKey = xml.EventKey ? xml.EventKey[0] : '';
    // 关注事件
    if (event === SUBSCRIBE) {
      console.log(`${xml.FromUserName[0]}用户关注, 关注时间：${moment().format('YYYY-MM-DD hh:mm:ss')}`);
      const result = message.text(xml.FromUserName[0], xml.ToUserName[0], '');
      ctx.res.setHeader('Content-Type', 'application/xml');
      ctx.res.end(result);
      this.userHandler.saveWechatUser(userInfo);
    }
    // 取消关注事件
    if (event === UNSUBSCRIBE) {
      console.log(`${xml.FromUserName[0]}用户取消关注, 取消关注时间：${moment().format('YYYY-MM-DD hh:mm:ss')}`);
      this.userHandler.unsubscribe({
        openid: xml.FromUserName[0]
      });
    }
    // 扫描二维码事件
    if (event === SCAN) {
    }
    // 上报位置信息事件
    if (event === LOCATION) {
    }
    if (event === CLICK) {
    }
    if (event === VIEW) {

    }
    if (msgType === TEXT) {
      console.log(`${xml.FromUserName[0]}用户发送消息, 内容是${xml.Content[0]}, 发送时间是${new Date(parseInt(xml.CreateTime[0], 10) * 1000).toLocaleString()}`);
      // const result = message.text(xml.FromUserName[0], xml.ToUserName[0]);
      // ctx.res.end(result);
    }
  }
}
