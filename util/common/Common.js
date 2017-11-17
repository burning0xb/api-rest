import crypto from 'crypto';

export default class Common {

  constructor() {

  }

  getCookie(cookie, key) {
    const cookies = cookie.split(';');
    let cookie_value = '';
    cookies.map((_key) => {
      if (_key.includes(key)) {
        cookie_value = _key.replace(`${key}=`, '');
      }
    });
    return cookie_value;
  }

  ramdomStr() {
    const str = Date.now();
    const shasum = crypto.createHash('md5');
    shasum.update(str.toString());
    return shasum.digest('hex');
  }

  json2xml(alias, body, CDATA=[]) {
    let str = `<${alias}>`;
    for (let key in body) {
      str += CDATA.includes(key) ? `<${key}><![CDATA[${body[key]}]]></${key}>` : `<${key}>${body[key]}</${key}>`;
    }
    str += `</${alias}>`;
    return str;
  }

  sleep(time) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, time * 1000);
    });
  }

}
