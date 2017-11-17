import config from '../config.json';
import crypto from 'crypto';
const token = config.token;
function wechatAuth(ctx) {
  const signature = ctx.query.signature;
  const timestamp = ctx.query.timestamp;
  const nonce = ctx.query.nonce;
  return checkSignature(signature, timestamp, nonce, token);
}

function checkSignature(signature,timestamp,nonce,token){
  const tmpArr = [token, timestamp, nonce];
  tmpArr.sort();
  const tmpStr = tmpArr.join('');
  const shasum = crypto.createHash('sha1');
  shasum.update(tmpStr);
  const shaResult = shasum.digest('hex');
  if(shaResult === signature){
  	return true;
  }
  return false;
}

export default wechatAuth;
