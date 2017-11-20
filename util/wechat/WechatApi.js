import { get_user_info, get_ticket, access_token, get_user_list } from '../../wechatapi.json';
import { paramGet, jsonPost } from '../common/fetch';
import { apikey, appid, appsecret } from '../../security.json';
import crypto from 'crypto';
import moment from 'moment';

export default class WechatApi {

  constructor() {
  }

  /**
   * [getUserInfo 获取微信用户信息]
   * @method getUserInfo
   * @param  {[type]}    openid [description]
   * @return {Promise}          [description]
   */
  async getUserInfo(openid) {
    console.log(get_user_info);
    const requestUrl = get_user_info.replace('ACCESS_TOKEN', global.wechatToken).replace('OPENID', openid);
    console.log(`requestUrl is ${requestUrl}`);
    const info = await paramGet(requestUrl);
    return info;
  }

  /**
   * [getUserList 获取关注用户列表]
   * @return {Promise} [description]
   */
  async getUserList() {
    console.log(get_user_list);
    const requestUrl = get_user_list.replace('ACCESS_TOKEN', global.wechatToken);
    console.log(`requestUrl is ${requestUrl}`);
    const info = await paramGet(requestUrl);
    return info;
  }

  /**
   * [getTicket 获取票据]
   * @method getTicket
   * @return {Promise} [description]
   */
  async getTicket() {
    const requestUrl = get_ticket.replace('ACCESS_TOKEN', global.wechatToken)
    const info = await paramGet(requestUrl);
    console.log(info);
    return info.ticket;
  }

  /**
   * [signSHA1 SHA1签名]
   * @method signSHA1
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  signSHA1(params) {
    const key = [];
    let str = '';
    for (let prop in params) {
      if (prop !== '') {
        key.push(prop);
      }
    }
    key.sort();
    key.map((_k, _v) => {
      str += `${_k}=${params[_k]}${_v === key.length - 1 ? '' : '&'}`;
    });
    const shasum = crypto.createHash('sha1');
    shasum.update(str);
    const signature = shasum.digest('hex');
    return signature;
  }

  /**
   * [signMD5 MD5签名]
   * @method signMD5
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  signMD5(params) {
    const key = [];
    let str = '';
    for (let prop in params) {
      if (prop !== '') {
        key.push(prop);
      }
    }
    key.sort();
    key.map((_k, _v) => {
      str += `${_k}=${params[_k]}${_v === key.length - 1 ? '' : '&'}`;
    });
    str += `&key=${apikey}`;
    const shasum = crypto.createHash('md5');
    shasum.update(str);
    const signature = shasum.digest('hex').toUpperCase();
    console.log(str);
    return signature;
  }

  /**
   * [generateRandomStr 生成随机字符串]
   * @method generateRandomStr
   * @return {[type]}          [description]
   */
  generateRandomStr() {
    const str = Math.random().toString(36).substr(2);
    return str;
  }

  /**
   * [getAccessTokenByCode 根据code获取用户信息]
   * @method getAccessTokenByCode
   * @param  {[type]}             code [description]
   * @return {Promise}                 [description]
   */
  async getAccessTokenByCode(code) {
    const requestUrl = access_token.replace('APPID', appid).replace('SECRET', appsecret).replace('CODE', code);
    const info = await paramGet(requestUrl);
    return info.openid;
  }

}
