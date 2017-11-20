import koaRouter from 'koa-router';
import multer from 'koa-multer';
import { Client } from '../rabbitMQ';
import { logger } from '../util/logger';
import { Common } from '../util/common';
import * as routers from '../src/routers';
import schedule from 'node-schedule';
import { UserHandler } from '../src/controller';
import { WechatApi } from '../util/wechat';

const wechatApi = new WechatApi();
const util = new Common();

let path = '';
if (process.env.NODE_ENV === 'development') {
  // 自己修改dev路径
  path = '/Users/burning/uploads/api-rest';
} else {
  // 服务器路径
  path = '/root/uploads/api-rest';
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
})

const upload = multer({ storage });

const router = koaRouter({
  prefix: '/api'
});

router.get('/', (ctx, next) => {
  ctx.body = "this is the home page, we only support api";
})

async function rollUserList(userHandler) {
  schedule.scheduleJob('0 0 1 * * *', async () => {
    const userList = await wechatApi.getUserList();
    if (userList.data) {
      console.log(`关注用户总数 ${userList.total} 人 开始更新用户信息`);
      userList.data.openid.map(async (openid) => {
        await util.sleep(1);
        const userInfo = await wechatApi.getUserInfo(openid);
        userHandler.saveWechatUser(userInfo);
      })
    }
  });
}

// 如果以搭建好rabbitmq 打开注释 否则用下面的
new Client().then((res) => {
  logger.info('rabbitMQ is ready');
  global.MQ = res.RabbitSend;
}).then(() => {
  for (let _router in routers) {
    if (_router !== '') {
      routers[_router](router, upload);
      console.log(`${_router} 加载成功 👌`);
    }
  }
  const userHandler = new UserHandler(global.MQ);
  rollUserList(userHandler);
});

// for (let _router in routers) {
//   if (_router !== '') {
//     routers[_router](router, upload);
//     console.log(`${_router} 加载成功 👌`);
//   }
// }

export default router;
