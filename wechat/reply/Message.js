export default class Message {

  constructor() {

  }

  text(openid, FromUserName, content) {
    const res = `<xml>
                  <ToUserName><![CDATA[${openid}]]></ToUserName>
                  <FromUserName><![CDATA[${FromUserName}]]></FromUserName>
                  <CreateTime>${Date.now()}</CreateTime>
                  <MsgType><![CDATA[text]]></MsgType>
                  <Content><![CDATA[${content}]]></Content>
                </xml>`;
    return res;
  }

}
