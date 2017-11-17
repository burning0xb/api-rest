import Koa from 'koa2';
import config from './config.json';
import router from './router';
import { RedisStore } from './src/session';
import session from 'koa-session2';
import Logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import { logger, logger_date } from './util/logger';
import BaseRouter from './src/routers/BaseRouter';
import convert from "koa-convert"
import cors from 'koa-cors';

global.msgQueue = [];
global.resolveRabbit = {};
global.sms = {};
global.mini_session = {};

logger.info('api server start');
logger.warn('do not kill this');

const app = new Koa();
const baseRouter = new BaseRouter();

app.use(session({
  key: 'burning:session',
  store: new RedisStore(),
  maxAge: config.maxAge
}));

app.use(bodyParser());
app.use(Logger());
app.use(convert(cors()));

// 中间件
app.use(async (ctx, next) => {
  if (baseRouter.requireLogin(ctx)) {
    await next();
  }
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(config.port, () => {
  logger.info(`server is running port ${config.port}`);
});
