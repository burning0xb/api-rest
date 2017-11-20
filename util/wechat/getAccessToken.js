import { paramGet } from '../common/fetch';
import { get_access_token } from '../../wechatapi.json';
import { appid, appsecret } from '../../security.json';

/**
 * [getAccessToken 获取token]
 * @method getAccessToken
 * @return {[type]}       [description]
 */
function getAccessToken() {
  const jsonBody = {
    grant_type: 'client_credential',
    appid: appid,
    secret: appsecret
  };
  return paramGet(get_access_token, jsonBody);
}

export default getAccessToken;
